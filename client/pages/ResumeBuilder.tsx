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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTemplates } from "@/hooks/useTemplates";
import { useResumes } from "@/hooks/useResumes";
import {
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Star,
  Crown,
  Loader2,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface ResumeSection {
  id: string;
  type:
    | "personal"
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "certifications";
  title: string;
  content: any;
}

export default function ResumeBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { templates, loading: templatesLoading } = useTemplates();
  const { createResume, updateResumeById, resumes } = useResumes();

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentResume, setCurrentResume] = useState<any>(null);
  const [resumeData, setResumeData] = useState({
    title: '',
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  // Check if editing existing resume
  useEffect(() => {
    const resumeId = searchParams.get('id');
    if (resumeId && resumes.length > 0) {
      const resume = resumes.find(r => r.id === resumeId);
      if (resume) {
        setCurrentResume(resume);
        setSelectedTemplate(resume.template_id);
        setResumeData({
          title: resume.title,
          ...resume.content,
        });
      }
    }
  }, [searchParams, resumes]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSaveResume = async () => {
    if (!selectedTemplate || !user) return;

    const resumeTitle = resumeData.title || `Resume - ${new Date().toLocaleDateString()}`;

    if (currentResume) {
      // Update existing resume
      await updateResumeById(currentResume.id, {
        title: resumeTitle,
        template_id: selectedTemplate,
        content: resumeData,
      });
    } else {
      // Create new resume
      const { data } = await createResume({
        title: resumeTitle,
        template_id: selectedTemplate,
        content: resumeData,
      });
      if (data) {
        navigate(`/builder?id=${data.id}`);
      }
    }
  };

  if (!selectedTemplate) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Resume Template
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with a professional template designed to pass ATS systems
              and impress recruiters. All templates are fully customizable.
            </p>
          </div>

          {/* Template Grid */}
          {templatesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] bg-gray-200 rounded-t-lg"></div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="relative cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  {template.is_premium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900 z-10">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                  <CardHeader className="p-0">
                    <div className="aspect-[3/4] bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <div className="w-3/4 h-5/6 bg-white shadow-md rounded border-l-4 border-primary">
                        <div className="p-4 space-y-2">
                          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                          <div className="h-2 bg-gray-200 rounded w-full"></div>
                          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          <div className="mt-4 space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                    <Button
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors"
                      variant="outline"
                    >
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-600 mt-1">
              Template: {templates.find((t) => t.id === selectedTemplate)?.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleSaveResume}>
              💾 Save
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="resumeTitle">Resume Title</Label>
                      <Input
                        id="resumeTitle"
                        placeholder="My Resume"
                        value={resumeData.title}
                        onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={resumeData.personal.firstName}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personal: {...resumeData.personal, firstName: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={resumeData.personal.lastName}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personal: {...resumeData.personal, lastName: e.target.value}
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        placeholder="Software Engineer"
                        value={resumeData.personal.title}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personal: {...resumeData.personal, title: e.target.value}
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={resumeData.personal.email}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personal: {...resumeData.personal, email: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={resumeData.personal.phone}
                          onChange={(e) => setResumeData({
                            ...resumeData,
                            personal: {...resumeData.personal, phone: e.target.value}
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="New York, NY"
                        value={resumeData.personal.location}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personal: {...resumeData.personal, location: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        placeholder="Write a brief summary of your professional background..."
                        rows={4}
                        value={resumeData.personal.summary}
                        onChange={(e) => setResumeData({
                          ...resumeData,
                          personal: {...resumeData.personal, summary: e.target.value}
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">Current Position</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="Tech Corp" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" type="month" />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="month"
                            placeholder="Current"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">Degree</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="degree">Degree</Label>
                          <Input
                            id="degree"
                            placeholder="Bachelor of Science"
                          />
                        </div>
                        <div>
                          <Label htmlFor="major">Major/Field</Label>
                          <Input id="major" placeholder="Computer Science" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="school">School</Label>
                          <Input id="school" placeholder="University Name" />
                        </div>
                        <div>
                          <Label htmlFor="graduationYear">
                            Graduation Year
                          </Label>
                          <Input
                            id="graduationYear"
                            type="number"
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="h-[800px]">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <div className="bg-white shadow-lg w-[80%] h-[90%] rounded p-6 overflow-auto">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center border-b pb-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                          John Doe
                        </h1>
                        <p className="text-lg text-gray-600">
                          Software Engineer
                        </p>
                        <div className="flex justify-center gap-4 text-sm text-gray-500 mt-2">
                          <span>john@example.com</span>
                          <span>•</span>
                          <span>+1 (555) 123-4567</span>
                          <span>•</span>
                          <span>New York, NY</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          Professional Summary
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Experienced software engineer with 5+ years developing
                          scalable web applications...
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          Experience
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900">
                                Senior Software Engineer
                              </h3>
                              <span className="text-sm text-gray-500">
                                2020 - Present
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Tech Corp, San Francisco, CA
                            </p>
                            <p className="text-sm text-gray-700">
                              Led development of microservices architecture
                              serving 1M+ users...
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                          Education
                        </h2>
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900">
                              Bachelor of Science in Computer Science
                            </h3>
                            <span className="text-sm text-gray-500">2020</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            University of Technology
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
