import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useResumes } from "@/hooks/useResumes";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  Edit, 
  Trash2, 
  Download, 
  Eye,
  Calendar,
  MoreVertical,
  Copy
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { user } = useAuth();
  const { resumes, loading, deleteResumeById, duplicateResume } = useResumes();

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDeleteResume = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      await deleteResumeById(id);
    }
  };

  const handleDuplicateResume = async (resume: any) => {
    await duplicateResume(resume);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.user_metadata?.full_name || 'User'}!
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your resumes and boost your career
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/improve">
                <FileText className="h-4 w-4 mr-2" />
                Improve Resume
              </Link>
            </Button>
            <Button asChild>
              <Link to="/builder">
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
              <p className="text-xs text-muted-foreground">
                {resumes.filter(r => r.is_published).length} published
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan</CardTitle>
              <Badge variant="secondary">Free</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free</div>
              <p className="text-xs text-muted-foreground">
                Upgrade for unlimited resumes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumes.length > 0 ? formatDistanceToNow(new Date(resumes[0].updated_at), { addSuffix: true }) : 'Never'}
              </div>
              <p className="text-xs text-muted-foreground">
                Resume updated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">No resumes yet</CardTitle>
                <CardDescription className="mb-6">
                  Create your first resume to get started with CV Boost
                </CardDescription>
                <div className="flex justify-center gap-4">
                  <Button asChild>
                    <Link to="/builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Resume
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/improve">
                      <FileText className="h-4 w-4 mr-2" />
                      Improve Existing
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
                        <CardDescription className="text-sm">
                          Template: {resume.template_id}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/builder?id=${resume.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDuplicateResume(resume)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteResume(resume.id, resume.title)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={resume.is_published ? "default" : "secondary"}>
                        {resume.is_published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Updated {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[3/4] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Resume Preview</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/builder?id=${resume.id}`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these popular features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                <Link to="/builder">
                  <Plus className="h-8 w-8 text-primary" />
                  <span className="font-medium">Create New Resume</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Start from scratch with our templates
                  </span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                <Link to="/improve">
                  <FileText className="h-8 w-8 text-primary" />
                  <span className="font-medium">Improve Existing</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Upload and enhance your current resume
                  </span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2" asChild>
                <Link to="/pricing">
                  <Badge className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent text-white border-0 flex items-center justify-center p-0">
                    ✨
                  </Badge>
                  <span className="font-medium">Upgrade Plan</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Unlock unlimited resumes and features
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
