import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { BusinessButton } from "@/components/BusinessButton";
import { PageTransition } from "@/components/PageTransition";
import { setupPerformanceOptimizations } from "@/utils/performanceDetector";

import { Home } from "@/pages/Home";
import { Contact } from "@/pages/Contact";
import { Business } from "@/pages/Business";
import { Sponsors } from "@/pages/Sponsors";
import { Cek2026 } from "@/pages/Cek2026";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";
import { Dossier } from "@/pages/Dossier";
import { LiveTimingStreaming } from "@/pages/LiveTimingStreaming";
import { RDE } from "@/pages/RDE";
import { Auth } from "@/pages/Auth";
import { Booking } from "@/pages/Booking";


const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    setupPerformanceOptimizations();
  }, []);

  const hideBusinessButton =
    location.pathname.includes("/sponsors") ||
    location.pathname.includes("/patrocinadores") ||
    location.pathname.includes("/dossier") ||
    location.pathname.includes("/2026") ||
    location.pathname.includes("/cek2026") ||
    location.pathname.includes("live-timing-streaming");

  return (
    <>
      <SEO />
      <ScrollToTop />
      <CustomCursor />
      {!hideBusinessButton && <BusinessButton />}
      <div className="min-h-screen bg-background">
        <Toaster theme="dark" />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/inicio" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/contacto" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
            <Route path="/marketing" element={<PageTransition><Business /></PageTransition>} />
            <Route path="/sponsors" element={<PageTransition><Sponsors /></PageTransition>} />
            <Route path="/patrocinadores" element={<PageTransition><Sponsors /></PageTransition>} />
            <Route path="/2026" element={<PageTransition><Cek2026 /></PageTransition>} />
            <Route path="/cek2026" element={<PageTransition><Cek2026 /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/dossier" element={<PageTransition><Dossier /></PageTransition>} />
            <Route path="/live-timing-streaming" element={<PageTransition><LiveTimingStreaming /></PageTransition>} />
            <Route path="/rde" element={<PageTransition><RDE /></PageTransition>} />
            <Route path="/rdeoperators" element={<PageTransition><RDE /></PageTransition>} />
            <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
            <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
            
            <Route path="*" element={<PageTransition><Home /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
