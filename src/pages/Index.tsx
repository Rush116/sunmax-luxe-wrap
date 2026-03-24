import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import QuizSection from "@/components/QuizSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContactButtons from "@/components/ContactButtons";

const Index = () => {
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStart={scrollToQuiz} />
      <BenefitsSection />
      <QuizSection ref={quizRef} />
      <ContactButtons />

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SunMaxKzn. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
