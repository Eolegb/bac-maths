import React, { useEffect, useRef } from "react";
import katex from "katex";

interface LatexProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const Latex: React.FC<LatexProps> = ({ math, block = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        // Strip out enclosing single or double dollar signs for manual renderings if needed
        let cleanMath = math;
        if (cleanMath.startsWith("$$") && cleanMath.endsWith("$$")) {
          cleanMath = cleanMath.slice(2, -2);
        } else if (cleanMath.startsWith("$") && cleanMath.endsWith("$")) {
          cleanMath = cleanMath.slice(1, -1);
        }

        // Replace literal line breaks with appropriate latex formatting or split
        // For simple equations, just render
        katex.render(cleanMath, containerRef.current, {
          displayMode: block,
          throwOnError: false,
          trust: true
        });
      } catch (err) {
        console.error("KaTeX error:", err);
        containerRef.current.textContent = math;
      }
    }
  }, [math, block]);

  return <span ref={containerRef} className={className} />;
};
