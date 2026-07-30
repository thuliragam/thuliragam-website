import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import WhyChoose from "./components/WhyChoose";
import Process from "./components/Process";
import FeaturedProducts from "./components/FeaturedProducts";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Trust from "./components/Trust";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Benefits from "./components/Benefits";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <About />
      <Benefits />
      <WhyChoose />
<Process />
<FeaturedProducts />
<Gallery />
<Testimonials />
<FAQ />
<Trust />
<Contact />
<Footer />
    </main>
  );
}