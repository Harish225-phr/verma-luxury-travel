import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-semibold gradient-text-gold">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

const stats = [
  { n: 10000, suffix: "+", label: "Happy Customers" },
  { n: 500, suffix: "+", label: "Tours Completed" },
  { n: 24, suffix: "/7", label: "Customer Support" },
  { n: 100, suffix: "%", label: "Safe Travel" },
];

export function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl rounded-3xl glass-strong luxury-border p-10 md:p-14 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-luxury)" }} />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter to={s.n} suffix={s.suffix} />
              <div className="mt-2 text-sm text-muted-foreground uppercase tracking-[0.15em]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}