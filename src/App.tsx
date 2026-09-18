import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { setupPerformanceOptimizations } from "@/utils/performanceDetector";

import { Home } from "@/pages/Home";

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
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/inicio" element={<Navigate to="/" replace />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/contacto" element={<Navigate to="/#contact" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="/business" element={<Navigate to="/#business" replace />} />
              <Route path="/marketing" element={<Navigate to="/#services" replace />} />
              <Route path="/booking" element={<Navigate to="/#booking" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
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
