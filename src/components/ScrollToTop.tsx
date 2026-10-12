import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }, [pathname]);

  return null;
}
