import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (coarse) return;

    document.documentElement.classList.add("custom-cursor-active");
    setVisible(true);

    const interactive =
      'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const h = !!el?.closest(interactive);
      if (h !== hoveringRef.current) {
        hoveringRef.current = h;
        setHovering(h);
      }
    };

    const loop = () => {
      const ring = ringPos.current;
      const target = pos.current;
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (dotRef.current) {
        const sc = hoveringRef.current ? 0.45 : 1;
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${sc})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${hovering ? "is-hover" : ""}`}
        aria-hidden
      />
    </>
  );
}
