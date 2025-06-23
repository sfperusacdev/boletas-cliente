import { CardsBenefits } from "./components/CardsBenefits";
import { CardsSolution } from "./components/CardsSolution";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Prices } from "./components/Prices";

export const LandingPage = () => {
  return (
    <>
      <div className="w-full h-full font-sans scroll-smooth light">
        <Header />
        <Hero />
        <main>
          <CardsSolution />
          <CardsBenefits />
          <Prices />
        </main>
        <Footer />
      </div>
    </>
  );
};
