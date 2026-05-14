import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full blur-3xl opacity-30 animate-float-slow" style={{ background: "var(--gradient-luxury)" }} />
        <div className="absolute bottom-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full blur-3xl opacity-25 animate-float-slow" style={{ background: "radial-gradient(circle, oklch(0.72 0.2 165), transparent 70%)", animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full blur-3xl opacity-15" style={{ background: "var(--gradient-glow)" }} />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}