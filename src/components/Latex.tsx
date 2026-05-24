import React, { useEffect, useRef } from "react";
import katex from "katex";

interface LatexProps {
  math: string;
  block?: boolean;
  className?: string;
  forceMath?: boolean;
}

export const Latex: React.FC<LatexProps> = ({ math, block = false, className = "", forceMath = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      
      if (forceMath) {
        const span = document.createElement("span");
        katex.render(math, span, {
          displayMode: block,
          throwOnError: false,
          trust: true
        });
        containerRef.current.appendChild(span);
        return;
      }

      const regex = /(\$\$.*?\$\$|\$.*?\$)/g;
      const parts = math.split(regex);

      parts.forEach(part => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const formula = part.slice(2, -2);
          const span = document.createElement("span");
          span.className = "katex-display-wrapper";
          katex.render(formula, span, { displayMode: true, throwOnError: false });
          containerRef.current?.appendChild(span);
        } else if (part.startsWith("$") && part.endsWith("$")) {
          const formula = part.slice(1, -1);
          const span = document.createElement("span");
          katex.render(formula, span, { displayMode: false, throwOnError: false });
          containerRef.current?.appendChild(span);
        } else if (part) {
          const span = document.createElement("span");
          span.innerHTML = part;
          containerRef.current?.appendChild(span);
        }
      });
    }
  }, [math, block, forceMath]);

  return <span ref={containerRef} className={className} />;
};
