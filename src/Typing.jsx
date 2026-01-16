import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Typing() {
  const typingRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typingRef.current, {
      strings: [
        "Frontend Developer",
        "MERN Developer",
        "UI Designer",
        "Web Developer",
        "React Developer",
        "Mobile App Developer",
        "Backend Developer",
        "JavaScript Developer",
        "Tech Enthusiast",
        "Youtuber",
        "Python Developer",

      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={typingRef} className="typing"></span>;
}
