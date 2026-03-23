import { motion } from "framer-motion";
import { Shield, Clock, Award, Zap, ThumbsUp, Wrench } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Гарантия 5 лет", desc: "Официальная гарантия на плёнку и работу" },
  { icon: Clock, title: "От 1 дня", desc: "Быстрая оклейка без потери качества" },
  { icon: Award, title: "Премиальные материалы", desc: "Используем SunTek, STEK, Hexis" },
  { icon: Zap, title: "Самовосстановление", desc: "Плёнка затягивает мелкие царапины" },
  { icon: ThumbsUp, title: "500+ автомобилей", desc: "Опыт работы с любыми марками" },
  { icon: Wrench, title: "Подготовка кузова", desc: "Полировка и детейлинг перед оклейкой" },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-4"
        >
          Почему <span className="text-gradient-gold">SunMaxKzn</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-14 max-w-lg mx-auto"
        >
          Доверьте защиту вашего автомобиля профессионалам
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
