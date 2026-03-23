import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Car, Shield, Sparkles, Wrench, CalendarDays, Send } from "lucide-react";

type QuizAnswers = {
  carType: string;
  coverage: string;
  condition: string;
  extras: string[];
  timing: string;
  name: string;
  phone: string;
};

const steps = [
  {
    id: "carType",
    question: "Какой у вас автомобиль?",
    icon: Car,
    options: [
      { value: "sedan", label: "Седан" },
      { value: "liftback", label: "Лифтбек" },
      { value: "crossover", label: "Кроссовер" },
      { value: "suv", label: "SUV" },
      { value: "coupe", label: "Купе" },
      { value: "wagon", label: "Универсал" },
      { value: "other", label: "Другое" },
    ],
    multi: false,
  },
  {
    id: "coverage",
    question: "Что хотите защитить?",
    icon: Shield,
    options: [
      { value: "impact", label: "Ударные зоны" },
      { value: "front", label: "Передняя часть" },
      { value: "full", label: "Полный кузов" },
      { value: "custom", label: "Индивидуальный набор" },
    ],
    multi: false,
  },
  {
    id: "condition",
    question: "Состояние автомобиля",
    icon: Sparkles,
    options: [
      { value: "new", label: "Новый" },
      { value: "good", label: "С пробегом, хорошее" },
      { value: "scratches", label: "Есть царапины, нужна подготовка" },
    ],
    multi: false,
  },
  {
    id: "extras",
    question: "Дополнительные услуги?",
    icon: Wrench,
    options: [
      { value: "antichrome", label: "Антихром" },
      { value: "headlights", label: "Бронь фар" },
      { value: "interior", label: "Защита глянца салона" },
      { value: "ceramic", label: "Керамика" },
      { value: "none", label: "Ничего не нужно" },
    ],
    multi: true,
  },
  {
    id: "timing",
    question: "Когда хотите записаться?",
    icon: CalendarDays,
    options: [
      { value: "asap", label: "Как можно скорее" },
      { value: "week", label: "На этой неделе" },
      { value: "month", label: "В течение месяца" },
      { value: "price", label: "Пока хочу узнать цену" },
    ],
    multi: false,
  },
];

// Mock pricing
const calcPrice = (answers: QuizAnswers) => {
  const carPrices: Record<string, number> = {
    sedan: 1, liftback: 1, crossover: 1.2, suv: 1.4, coupe: 0.9, wagon: 1.15, other: 1.1,
  };
  const coveragePrices: Record<string, number> = {
    impact: 25000, front: 45000, full: 120000, custom: 65000,
  };
  const conditionExtra: Record<string, number> = {
    new: 0, good: 3000, scratches: 8000,
  };
  const extraPrices: Record<string, number> = {
    antichrome: 15000, headlights: 8000, interior: 12000, ceramic: 18000, none: 0,
  };

  const base = (coveragePrices[answers.coverage] || 60000) * (carPrices[answers.carType] || 1);
  const cond = conditionExtra[answers.condition] || 0;
  const extras = answers.extras.reduce((s, e) => s + (extraPrices[e] || 0), 0);
  return Math.round(base + cond + extras);
};

const QuizSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    carType: "", coverage: "", condition: "", extras: [], timing: "", name: "", phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = steps.length + 1; // +1 for form
  const showResult = step === steps.length;

  const handleSelect = (stepId: string, value: string, multi: boolean) => {
    setAnswers((prev) => {
      if (multi) {
        if (value === "none") return { ...prev, [stepId]: ["none"] };
        const arr = (prev[stepId as keyof QuizAnswers] as string[]).filter((v) => v !== "none");
        return {
          ...prev,
          [stepId]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      }
      return { ...prev, [stepId]: value };
    });
  };

  const canNext = () => {
    if (step >= steps.length) return answers.name && answers.phone;
    const s = steps[step];
    if (s.multi) return (answers[s.id as keyof QuizAnswers] as string[]).length > 0;
    return !!(answers[s.id as keyof QuizAnswers] as string);
  };

  const next = () => { if (canNext() && step < totalSteps) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const price = calcPrice(answers);

  const handleSubmit = () => {
    if (answers.name && answers.phone) setSubmitted(true);
  };

  return (
    <section ref={ref} id="quiz" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-2"
        >
          Рассчитайте <span className="text-gradient-gold">стоимость</span>
        </motion.h2>
        <p className="text-muted-foreground text-center mb-10">5 простых вопросов — и вы узнаете цену</p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Шаг {Math.min(step + 1, totalSteps)} из {totalSteps}</span>
            <span>{Math.round(((step) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold rounded-full"
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-6 md:p-10 min-h-[380px] flex flex-col">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold">Заявка отправлена!</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
                <div className="mt-4 text-3xl font-display font-bold text-gradient-gold">
                  ≈ {price.toLocaleString("ru-RU")} ₽
                </div>
              </motion.div>
            ) : showResult ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex-1 flex flex-col"
              >
                <div className="text-center mb-8">
                  <p className="text-muted-foreground text-sm mb-2">Предварительная стоимость</p>
                  <div className="text-4xl md:text-5xl font-display font-900 text-gradient-gold">
                    {price.toLocaleString("ru-RU")} ₽
                  </div>
                  <p className="text-muted-foreground text-xs mt-2">*Окончательная цена после осмотра автомобиля</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Ваше имя</label>
                    <input
                      type="text"
                      value={answers.name}
                      onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                      placeholder="Иван"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Телефон</label>
                    <input
                      type="tel"
                      value={answers.phone}
                      onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                      placeholder="+7 (900) 123-45-67"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={prev} className="px-5 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-graphite transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!answers.name || !answers.phone}
                    className="flex-1 bg-gradient-gold text-primary-foreground font-display font-bold py-3 rounded-lg glow-gold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                  >
                    <Send className="w-5 h-5" /> Отправить заявку
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {(() => {
                  const s = steps[step];
                  const Icon = s.icon;
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-display font-bold">{s.question}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        {s.options.map((opt) => {
                          const selected = s.multi
                            ? (answers[s.id as keyof QuizAnswers] as string[]).includes(opt.value)
                            : answers[s.id as keyof QuizAnswers] === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleSelect(s.id, opt.value, s.multi)}
                              className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                                selected
                                  ? "border-primary bg-primary/10 text-foreground"
                                  : "border-border bg-secondary/50 text-muted-foreground hover:border-graphite-light hover:bg-secondary"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-3 mt-6">
                        {step > 0 && (
                          <button onClick={prev} className="px-5 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-graphite transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={next}
                          disabled={!canNext()}
                          className="flex-1 bg-gradient-gold text-primary-foreground font-display font-bold py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                        >
                          Далее <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

QuizSection.displayName = "QuizSection";

export default QuizSection;
