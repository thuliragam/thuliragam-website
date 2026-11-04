
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Benefits from "./components/Benefits";
import WhyChoose from "./components/WhyChoose";
import Process from "./components/Process";
import FeaturedProducts from "./components/FeaturedProducts";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Trust from "./components/Trust";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroGate from "./components/IntroGate";

export default function Home() {
  return (
    <IntroGate>
      <main className="min-h-screen overflow-x-clip bg-[#faf9f4] text-[#183b29]">
        <Header />

        <Hero />

        <Features />

        <About />

        <Benefits />

        <WhyChoose />

        <Process />

        <section
          id="grow-your-own"
          className="scroll-mt-24 bg-[#F0FDF4] px-6 py-20 text-center sm:py-28"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#00A844]">
            From Seed to Harvest
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-[#064E3B] sm:text-5xl">
            Every Little Seed Has a Story
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#52665A]">
            Discover how your favourite microgreens grow, from carefully
            selected seeds to fresh harvest.
          </p>
        </section>

        <FeaturedProducts />

        <Gallery />

        <Testimonials />

        <FAQ />

        <Trust />

        <Contact />

        <Footer />
      </main>
    </IntroGate>
  );
}
