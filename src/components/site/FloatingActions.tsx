import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-12 w-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href="https://wa.me/919816492182"
        target="_blank"
        rel="noreferrer"
        className="h-14 w-14 rounded-full flex items-center justify-center text-white animate-pulse-glow transition hover:scale-110"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href="tel:9816492182"
        className="h-14 w-14 rounded-full flex items-center justify-center text-white transition hover:scale-110"
        style={{ background: "var(--gradient-luxury)", boxShadow: "var(--shadow-glow)" }}
        aria-label="Call now"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}