import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ScrollToTop } from '../components/utils/ScrollToTop';
import { Home } from '../pages/Home';
import { Cars } from '../pages/Cars';
import { CarDetails } from '../pages/CarDetails';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
