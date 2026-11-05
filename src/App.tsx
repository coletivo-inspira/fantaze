import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout.tsx';
import ScrollRestoration from './components/layout/ScrollRestoration.tsx';

// --- Code splitting com React.lazy (uma página por rota) ---
const Home = lazy(() => import('./pages/Home.tsx'));
const MonthlyTheme = lazy(() => import('./pages/MonthlyTheme.tsx'));
const Menu = lazy(() => import('./pages/Menu.tsx'));
const NextThemes = lazy(() => import('./pages/NextThemes.tsx'));
const Reservations = lazy(() => import('./pages/Reservations.tsx'));
const Passport = lazy(() => import('./pages/Passport.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ScrollRestoration />
      <Suspense fallback={<div className="h-screen w-full bg-brand-paper" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tema-do-mes" element={<MonthlyTheme />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/proximos-temas" element={<NextThemes />} />
            <Route path="/reservas" element={<Reservations />} />
            <Route path="/passaporte" element={<Passport />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
