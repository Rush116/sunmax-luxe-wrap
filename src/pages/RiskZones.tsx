import { ShieldCheck, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RiskZones = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад на главную
        </Link>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Оклейка <span className="text-gradient-gold">зон риска автомобиля</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Защищаем наиболее уязвимые элементы кузова: передний бампер, капот, крылья, стойки, зеркала, пороги и зоны под ручками.
          </p>

          <ul className="space-y-3 text-muted-foreground">
            <li>• Точный раскрой под ваш кузов</li>
            <li>• Премиальные полиуретановые материалы</li>
            <li>• Самовосстановление мелких царапин</li>
            <li>• Гарантия на материалы и установку</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default RiskZones;
