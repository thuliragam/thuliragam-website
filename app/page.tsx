
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

export default function Home() {
  return (
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
  className="relative isolate flex min-h-[calc(100svh-122px)] scroll-mt-24 items-center overflow-hidden bg-[#063D20] px-6 py-12 text-white sm:px-10 lg:px-16"
>
  {/* BOTANICAL BACKGROUND EFFECTS */}
  <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-[#B9E65A]/10" />
  <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border border-[#B9E65A]/10" />
  <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#00A844]/15 blur-[100px]" />

  <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

    {/* LEFT DECORATIVE VISUAL */}
    <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[430px]">

      <div className="relative flex h-[270px] w-[270px] items-center justify-center rounded-full border border-[#B9E65A]/20 sm:h-[350px] sm:w-[350px]">

        <div className="absolute inset-5 rounded-full border border-[#B9E65A]/15" />

        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#B9E65A]/10 to-[#00A844]/10 blur-xl" />

        <div className="relative flex h-36 w-36 rotate-[-12deg] items-center justify-center rounded-[45%_55%_48%_52%] border border-[#B9E65A]/30 bg-gradient-to-br from-[#B9E65A]/20 to-[#00A844]/10 shadow-[0_0_70px_rgba(185,230,90,0.12)] sm:h-44 sm:w-44">
          <span className="text-7xl text-[#B9E65A] sm:text-8xl">
            ❧
          </span>
        </div>

        <div className="absolute right-4 top-10 h-4 w-4 rounded-full bg-[#B9E65A] shadow-[0_0_20px_#B9E65A]" />
        <div className="absolute bottom-12 left-3 h-3 w-3 rounded-full bg-[#00A844]" />
      </div>

      <div className="absolute bottom-2 right-0 rounded-2xl border border-[#B9E65A]/20 bg-[#075B25] px-5 py-4 shadow-xl sm:right-8">
        <p className="text-[9px] font-bold tracking-[0.25em] text-[#B9E65A]">
          THE THULIRAGAM WAY
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          Nature, nurtured with care.
        </p>
      </div>
    </div>

    {/* RIGHT CONTENT */}
    <div className="max-w-2xl">

      <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#B9E65A]/25 bg-[#B9E65A]/10 px-5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#B9E65A]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B9E65A]">
          From Seed to Harvest
        </span>
      </div>

      <h2 className="text-4xl font-extrabold leading-[1.13] tracking-[-0.04em] sm:text-5xl lg:text-6xl xl:text-7xl">
        Every Little
        <span className="block text-[#B9E65A]">
          Seed Has
        </span>
        <span className="block">
          a Story.
        </span>
      </h2>

      <p className="mt-7 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
        Discover how your favourite microgreens grow, from carefully
        selected seeds to fresh harvest.
      </p>

      <div className="mt-9 flex items-center gap-4">
        <span className="h-[3px] w-14 rounded-full bg-[#B9E65A]" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9E65A]">
          Discover the Thuliragam journey
        </span>
      </div>

    </div>
  </div>
</section>


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
