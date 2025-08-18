import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_plan: 'free' | 'pro' | 'ultimate'
  created_at: string
  updated_at: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  template_id: string
  content: any // JSON content
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ResumeAnalysis {
  id: string
  user_id: string
  resume_id?: string
  original_file_name: string
  file_url: string
  analysis_results: any // JSON results
  score: number
  suggestions: any[] // JSON array
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro' | 'ultimate'
  status: 'active' | 'cancelled' | 'past_due'
  stripe_subscription_id?: string
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Resume helpers
export const saveResume = async (resume: Partial<Resume>) => {
  const { data, error } = await supabase
    .from('resumes')
    .insert(resume)
    .select()
    .single()
  return { data, error }
}

export const updateResume = async (id: string, updates: Partial<Resume>) => {
  const { data, error } = await supabase
    .from('resumes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export const getUserResumes = async (userId: string) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  return { data, error }
}

export const deleteResume = async (id: string) => {
  const { data, error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)
  return { data, error }
}

// Resume Analysis helpers
export const saveResumeAnalysis = async (analysis: Partial<ResumeAnalysis>) => {
  const { data, error } = await supabase
    .from('resume_analyses')
    .insert(analysis)
    .select()
    .single()
  return { data, error }
}

export const getUserAnalyses = async (userId: string) => {
  const { data, error } = await supabase
    .from('resume_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// File upload helpers
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)
  return { data, error }
}

export const getFileUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

export const deleteFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path])
  return { data, error }
}
