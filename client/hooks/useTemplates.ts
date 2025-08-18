import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview_url?: string;
  is_premium: boolean;
  category: string;
  template_data: any;
  created_at: string;
}

export function useTemplates() {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resume_templates")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          title: "Error loading templates",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setTemplates(data || []);
      }
    } catch (err) {
      toast({
        title: "Error loading templates",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTemplate = (id: string) => {
    return templates.find((template) => template.id === id);
  };

  const getFreeTemplates = () => {
    return templates.filter((template) => !template.is_premium);
  };

  const getPremiumTemplates = () => {
    return templates.filter((template) => template.is_premium);
  };

  return {
    templates,
    loading,
    getTemplate,
    getFreeTemplates,
    getPremiumTemplates,
    refreshTemplates: loadTemplates,
  };
}
