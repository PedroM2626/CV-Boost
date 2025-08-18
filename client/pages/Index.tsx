import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Upload, 
  Users, 
  Zap, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Download,
  Shield,
  Clock
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: FileText,
      title: "Professional Resume Builder",
      description: "Create stunning resumes from scratch with our clean, ATS-friendly templates",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "AI-Powered Improvements",
      description: "Upload your existing resume and get instant suggestions for better impact",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Recruiter Tools",
      description: "Parse and analyze resumes efficiently with structured data extraction",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Download your resumes as PDF or DOCX files, ready for any application",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Interview Chances",
      description: "Get 3x more interviews with optimized, keyword-rich resumes"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Build professional resumes in minutes, not hours"
    },
    {
      icon: Shield,
      title: "ATS-Friendly",
      description: "All templates pass through Applicant Tracking Systems"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 resume",
        "Basic templates",
        "Basic suggestions",
        "PDF export"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$2",
      period: "month",
      description: "For job seekers and professionals",
      features: [
        "Unlimited resumes",
        "Advanced templates",
        "AI-powered improvements",
        "PDF & DOCX export",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Ultimate",
      price: "$5",
      period: "month",
      description: "For recruiters and teams",
      features: [
        "Everything in Pro",
        "Recruiter tools",
        "Bulk resume parsing",
        "Advanced analytics",
        "Custom branding",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🚀 Build Your Career-Winning Resume
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Resume,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transform Your Career
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create professional resumes, get AI-powered improvements, and land more interviews. 
              Join thousands of professionals who've boosted their careers with CV Boost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/builder">
                  <FileText className="mr-2 h-5 w-5" />
                  Start Building Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/improve">
                  <Upload className="mr-2 h-5 w-5" />
                  Improve Existing Resume
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                4.9/5 from 10,000+ users
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From building resumes from scratch to improving existing ones, 
              CV Boost has all the tools you need to stand out.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CV Boost?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/signup">
                      {plan.name === 'Free' ? 'Get Started Free' : `Choose ${plan.name}`}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Boost Your Career?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with CV Boost. 
            Start building your winning resume today.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
            <Link to="/builder">
              <FileText className="mr-2 h-5 w-5" />
              Start Your Free Resume
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
