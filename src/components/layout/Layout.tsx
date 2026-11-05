import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Splash from './Splash';
import ScrollToTopButton from './ScrollToTopButton';

/** Estrutura comum de todas as páginas. */
export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-paper font-sans text-brand-ink">
      <Splash />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
