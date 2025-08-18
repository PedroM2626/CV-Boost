import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeImprovement from "./pages/ResumeImprovement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PlaceholderPage from "./components/PlaceholderPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/improve"
                element={
                  <ProtectedRoute>
                    <ResumeImprovement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiters"
                element={
                  <ProtectedRoute>
                    <PlaceholderPage
                      title="Recruiter Dashboard"
                      description="Upload and analyze multiple resumes with our advanced parsing tools. Extract structured data and find the best candidates faster."
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pricing"
                element={
                  <PlaceholderPage
                    title="Pricing Plans"
                    description="Choose the perfect plan for your needs. Start free and upgrade as you grow your career or business."
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/help"
                element={
                  <PlaceholderPage
                    title="Help Center"
                    description="Find answers to common questions and learn how to make the most of CV Boost's features."
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <PlaceholderPage
                    title="Contact Us"
                    description="Have questions or need support? We're here to help you succeed in your career journey."
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <PlaceholderPage
                    title="Privacy Policy"
                    description="Learn how we protect your personal information and resume data with industry-leading security."
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <PlaceholderPage
                    title="Terms of Service"
                    description="Review our terms and conditions for using CV Boost's resume building and improvement services."
                  />
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

// Handle React 18 createRoot properly for development and production
const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "Root element not found. Make sure there's a div with id='root' in your HTML.",
  );
}

// In development, prevent multiple createRoot calls during HMR
try {
  if (import.meta.env.DEV) {
    const existingRoot = (container as any).__reactRoot;
    if (existingRoot) {
      existingRoot.render(<App />);
    } else {
      const root = createRoot(container);
      (container as any).__reactRoot = root;
      root.render(<App />);
    }
  } else {
    // In production, create the root normally
    createRoot(container).render(<App />);
  }
} catch (error) {
  console.error("Failed to render React app:", error);
  // Fallback error display
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1 style="color: #dc3545;">Application Error</h1>
      <p>Sorry, there was an error loading the application. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
