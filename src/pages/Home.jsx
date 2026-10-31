
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/common/BackToTop";

import HeroSection from "../sections/HeroSection";
import CategoriesSection from "../sections/CategoriesSection";
import FeaturedArticle from "../sections/FeaturedArticle";
import LatestInsights from "../sections/LatestInsights";
import HowItWorks from "../sections/HowItWorks";
import Testimonials from "../sections/Testimonials";
import AppPromotion from "../sections/AppPromotion";
import Newsletter from "../sections/Newsletter";

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        {/* Hero */}
        <HeroSection />

        {/* Categories */}
        <CategoriesSection />

        {/* Featured Article */}
        <FeaturedArticle />

        {/* Latest Insights */}
        <LatestInsights />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* Mobile App Promotion */}
        <AppPromotion />

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />

      <BackToTop />
    </>
  );
}
