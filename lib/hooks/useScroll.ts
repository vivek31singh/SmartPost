import { useState, useEffect } from 'react'

export const useScroll = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrolly = window.scrollY;
    const controllHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrolly && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrolly = currentScrollY;
    };
    window.addEventListener("scroll", controllHeader);
    return () => {
      window.removeEventListener("scroll", controllHeader);
    };
  }, []);

  return isVisible
}