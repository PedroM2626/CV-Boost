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
import PlaceholderPage from "./components/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/improve" element={<ResumeImprovement />} />
            <Route
              path="/recruiters"
              element={
                <PlaceholderPage
                  title="Recruiter Dashboard"
                  description="Upload and analyze multiple resumes with our advanced parsing tools. Extract structured data and find the best candidates faster."
                />
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
            <Route
              path="/login"
              element={
                <PlaceholderPage
                  title="Sign In"
                  description="Welcome back! Sign in to access your resumes and continue building your career."
                />
              }
            />
            <Route
              path="/signup"
              element={
                <PlaceholderPage
                  title="Get Started"
                  description="Join thousands of professionals who've transformed their careers with CV Boost. Create your account to get started."
                />
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

createRoot(document.getElementById("root")!).render(<App />);
