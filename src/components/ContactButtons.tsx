import { Phone, MessageCircle } from "lucide-react";

const ContactButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/79001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </a>
      <a
        href="tel:+79001234567"
        className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Позвонить"
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </a>
    </div>
  );
};

export default ContactButtons;
