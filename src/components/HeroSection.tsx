import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Оклейка автомобиля плёнкой" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative container mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Shield className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-7 flex flex-col items-center gap-2"
        >
          <span className="font-display text-3xl md:text-4xl font-black tracking-[0.12em] text-gradient-gold drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
            SunMaxKzn
          </span>
          <span className="font-display text-muted-foreground/95 text-sm md:text-base tracking-[0.28em] uppercase">
            Студия защиты автомобилей в Казани
          </span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-900 leading-tight mb-6 max-w-4xl mx-auto"
        >
          Защитите свой автомобиль{" "}
          <span className="text-gradient-gold">навсегда</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          SunMaxKzn — премиальная оклейка полиуретановой плёнкой. Рассчитайте стоимость за 1 минуту.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="bg-gradient-gold text-red-500 font-display font-bold text-lg px-10 py-4 rounded-lg glow-gold transition-all"
        >
          Рассчитать стоимость
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
