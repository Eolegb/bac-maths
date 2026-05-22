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
      containerRef.current.innerHTML = "";
      
      // Split the string by $$...$$ or $...$
      // We use a regex with capturing groups to keep the delimiters in the parts array
      const regex = /(\$\$.*?\$\$|\$.*?\$)/g;
      const parts = math.split(regex);

      if (parts.length === 1 && !math.includes("$")) {
        // Fallback for strings that are pure math without $ delimiters
        const span = document.createElement("span");
        katex.render(math, span, {
          displayMode: block,
          throwOnError: false,
          trust: true
        });
        containerRef.current.appendChild(span);
        return;
      }

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
          const textNode = document.createTextNode(part);
          containerRef.current?.appendChild(textNode);
        }
      });
    }
  }, [math, block]);

  return <span ref={containerRef} className={className} />;
};
