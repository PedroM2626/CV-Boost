import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  supabase,
  Resume,
  saveResume,
  updateResume,
  getUserResumes,
  deleteResume,
} from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export function useResumes() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user's resumes
  useEffect(() => {
    if (user) {
      loadResumes();
    } else {
      setResumes([]);
      setLoading(false);
    }
  }, [user]);

  const loadResumes = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await getUserResumes(user.id);

    if (error) {
      toast({
        title: "Error loading resumes",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setResumes(data || []);
    }

    setLoading(false);
  };

  const createResume = async (resumeData: Partial<Resume>) => {
    if (!user) return { data: null, error: { message: "Not authenticated" } };

    setSaving(true);
    const { data, error } = await saveResume({
      ...resumeData,
      user_id: user.id,
    });

    if (error) {
      toast({
        title: "Error creating resume",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Resume created",
        description: "Your new resume has been created successfully.",
      });
      await loadResumes(); // Refresh the list
    }

    setSaving(false);
    return { data, error };
  };

  const updateResumeById = async (id: string, updates: Partial<Resume>) => {
    setSaving(true);
    const { data, error } = await updateResume(id, updates);

    if (error) {
      toast({
        title: "Error updating resume",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Resume updated",
        description: "Your resume has been saved successfully.",
      });
      await loadResumes(); // Refresh the list
    }

    setSaving(false);
    return { data, error };
  };

  const deleteResumeById = async (id: string) => {
    const { error } = await deleteResume(id);

    if (error) {
      toast({
        title: "Error deleting resume",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      });
      await loadResumes(); // Refresh the list
    }

    return { error };
  };

  const duplicateResume = async (resume: Resume) => {
    if (!user) return { data: null, error: { message: "Not authenticated" } };

    const { data, error } = await createResume({
      title: `${resume.title} (Copy)`,
      template_id: resume.template_id,
      content: resume.content,
      is_published: false,
    });

    return { data, error };
  };

  return {
    resumes,
    loading,
    saving,
    createResume,
    updateResumeById,
    deleteResumeById,
    duplicateResume,
    refreshResumes: loadResumes,
  };
}
