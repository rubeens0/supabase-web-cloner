import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
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

// Lazy load non-critical routes
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const Business = lazy(() => import("@/pages/Business").then(m => ({ default: m.Business })));
const Sponsors = lazy(() => import("@/pages/Sponsors").then(m => ({ default: m.Sponsors })));
const Cek2026 = lazy(() => import("@/pages/Cek2026").then(m => ({ default: m.Cek2026 })));
const Blog = lazy(() => import("@/pages/Blog").then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import("@/pages/BlogPost").then(m => ({ default: m.BlogPost })));
const Dossier = lazy(() => import("@/pages/Dossier").then(m => ({ default: m.Dossier })));
const LiveTimingStreaming = lazy(() => import("@/pages/LiveTimingStreaming").then(m => ({ default: m.LiveTimingStreaming })));
const RDE = lazy(() => import("@/pages/RDE").then(m => ({ default: m.RDE })));
const Auth = lazy(() => import("@/pages/Auth").then(m => ({ default: m.Auth })));
const Booking = lazy(() => import("@/pages/Booking").then(m => ({ default: m.Booking })));
const X = lazy(() => import("@/pages/X").then(m => ({ default: m.X })));


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
    location.pathname.includes("live-timing-streaming") ||
    location.pathname.includes("/booking");

  return (
    <>
      <SEO />
      <ScrollToTop />
      <CustomCursor />
      {!hideBusinessButton && <BusinessButton />}
      <div className="min-h-screen bg-background">
        <Toaster theme="dark" />
        <Navigation />
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
              <Route path="/x" element={<PageTransition><X /></PageTransition>} />
              
              <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
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
