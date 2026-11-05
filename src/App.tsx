import { useEffect } from 'react';
import Standalone3DShowcase from './components/Standalone3DShowcase';

export default function App() {
  useEffect(() => {
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
  }, []);

  return <Standalone3DShowcase />;
}
