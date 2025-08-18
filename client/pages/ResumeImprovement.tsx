import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  Eye,
} from "lucide-react";

interface ImprovementSuggestion {
  type: "error" | "warning" | "suggestion";
  category: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export default function ResumeImprovement() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const mockSuggestions: ImprovementSuggestion[] = [
    {
      type: "error",
      category: "Contact Information",
      title: "Missing Phone Number",
      description:
        "Your resume should include a phone number for easy contact.",
      impact: "high",
    },
    {
      type: "warning",
      category: "Professional Summary",
      title: "Weak Action Words",
      description:
        'Replace passive language with strong action verbs like "Led", "Developed", "Implemented".',
      impact: "medium",
    },
    {
      type: "suggestion",
      category: "Work Experience",
      title: "Add Quantifiable Achievements",
      description:
        'Include specific numbers and metrics to demonstrate your impact (e.g., "Increased sales by 25%").',
      impact: "high",
    },
    {
      type: "suggestion",
      category: "Skills Section",
      title: "Missing Industry Keywords",
      description:
        'Add relevant keywords like "Agile", "Scrum", "CI/CD" to improve ATS compatibility.',
      impact: "medium",
    },
    {
      type: "warning",
      category: "Formatting",
      title: "Inconsistent Date Format",
      description:
        'Use consistent date formatting throughout your resume (e.g., "Jan 2020 - Dec 2022").',
      impact: "low",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAnalysisProgress(0);

      // Simulate analysis progress
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "suggestion":
        return <Zap className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const errorCount = mockSuggestions.filter((s) => s.type === "error").length;
  const warningCount = mockSuggestions.filter(
    (s) => s.type === "warning",
  ).length;
  const suggestionCount = mockSuggestions.filter(
    (s) => s.type === "suggestion",
  ).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Improvement
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and get AI-powered suggestions to improve your
            chances of landing interviews. Supports PDF and DOCX formats.
          </p>
        </div>

        {!uploadedFile ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
              <CardContent className="p-12 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600">
                    Drag and drop your resume here, or click to browse
                  </p>
                </div>

                <div className="space-y-4">
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button size="lg" className="pointer-events-none">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </label>

                  <p className="text-sm text-gray-500">
                    Supports PDF, DOCX, and DOC files up to 10MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ATS Optimization
                </h3>
                <p className="text-sm text-gray-600">
                  Ensure your resume passes Applicant Tracking Systems
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Impact Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Get suggestions to quantify your achievements
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Instant Feedback
                </h3>
                <p className="text-sm text-gray-600">
                  Receive immediate, actionable improvement suggestions
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Section */
          <div className="space-y-8">
            {isAnalyzing && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Your Resume
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our AI is reviewing your resume for improvements...
                  </p>
                  <div className="max-w-md mx-auto">
                    <Progress value={analysisProgress} className="mb-2" />
                    <p className="text-sm text-gray-500">
                      {analysisProgress}% complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {analysisComplete && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Summary */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Analysis Complete
                      </CardTitle>
                      <CardDescription>
                        Found {mockSuggestions.length} suggestions to improve
                        your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {errorCount}
                          </div>
                          <div className="text-sm text-red-600">
                            Critical Issues
                          </div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {warningCount}
                          </div>
                          <div className="text-sm text-yellow-600">
                            Warnings
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {suggestionCount}
                          </div>
                          <div className="text-sm text-blue-600">
                            Suggestions
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download Improved Resume
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                      <CardDescription>
                        Review and apply these suggestions to enhance your
                        resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockSuggestions.map((suggestion, index) => (
                        <Alert
                          key={index}
                          className={getImpactColor(suggestion.impact)}
                        >
                          <div className="flex items-start gap-3">
                            {getTypeIcon(suggestion.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">
                                  {suggestion.title}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {suggestion.category}
                                </Badge>
                                <Badge
                                  variant={
                                    suggestion.impact === "high"
                                      ? "destructive"
                                      : suggestion.impact === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {suggestion.impact} impact
                                </Badge>
                              </div>
                              <AlertDescription className="text-sm">
                                {suggestion.description}
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Resume Preview */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Resume</CardTitle>
                      <CardDescription>{uploadedFile?.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Resume Preview</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-primary mb-1">
                          78
                        </div>
                        <div className="text-sm text-gray-600">out of 100</div>
                      </div>
                      <Progress value={78} className="mb-4" />
                      <p className="text-sm text-gray-600 text-center">
                        Your resume is good! Apply our suggestions to reach 95+
                      </p>
                    </CardContent>
                  </Card>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setUploadedFile(null);
                      setAnalysisComplete(false);
                      setAnalysisProgress(0);
                    }}
                  >
                    Upload Different Resume
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
