import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { PageTransition } from "@/components/PageTransition";
import { setupPerformanceOptimizations } from "@/utils/performanceDetector";

import { Home } from "@/pages/Home";

// Lazy load non-critical routes
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const Business = lazy(() => import("@/pages/Business").then(m => ({ default: m.Business })));
const Booking = lazy(() => import("@/pages/Booking").then(m => ({ default: m.Booking })));



const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    setupPerformanceOptimizations();
  }, []);

  return (
    <>
      <SEO />
      <ScrollToTop />
      <CustomCursor />
      <div className="min-h-screen bg-background">
        <Toaster theme="dark" />
        <Navigation />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/inicio" element={<Navigate to="/" replace />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/contacto" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/contact" element={<Navigate to="/contacto" replace />} />
              <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
              <Route path="/marketing" element={<Navigate to="/business" replace />} />
              <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
              <Route path="*" element={<Navigate to="/" replace />} />
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
