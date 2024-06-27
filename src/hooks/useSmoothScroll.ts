import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const useSmoothScroll = (targetIdOrClass: string) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const scrollToSection = () => {
    if (targetRef.current) {
      const headerHeight = document.querySelector('homePageSearchWrapper')?.clientHeight || 0;
      const elementPosition = targetRef.current.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (router.query.section === targetIdOrClass) {
      scrollToSection();
    }
  }, [router.query.section]);

  return targetRef;
};

export default useSmoothScroll;
