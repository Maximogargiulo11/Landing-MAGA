import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <BackgroundVideo />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}
