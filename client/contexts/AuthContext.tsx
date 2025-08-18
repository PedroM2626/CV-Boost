import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: {
    full_name?: string;
    avatar_url?: string;
  }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide more specific error messages
        let errorMessage = error.message;
        if (error.message.includes('Invalid API key') || error.message.includes('API key')) {
          errorMessage = "There's an issue with the application configuration. Please contact support.";
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Please check your email and click the verification link before signing in.";
        }

        toast({
          title: "Error signing in",
          description: errorMessage,
          variant: "destructive",
        });
      }

      return { error };
    } catch (networkError: any) {
      const errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
      toast({
        title: "Connection error",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: { message: errorMessage } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: undefined, // Disable email confirmation for now
        },
      });

      if (error) {
        // Provide more specific error messages
        let errorMessage = error.message;

        if (error.message.includes('Invalid API key') || error.message.includes('API key')) {
          errorMessage = "🔧 Supabase Configuration Required: Please go to your Supabase dashboard > Authentication > Settings and either disable 'Enable email confirmations' or configure an email provider.";
        } else if (error.message.includes('User already registered')) {
          errorMessage = "An account with this email already exists. Try signing in instead.";
        } else if (error.message.includes('signup_disabled')) {
          errorMessage = "Account creation is currently disabled. Please contact support.";
        } else if (error.message.includes('email')) {
          errorMessage = "Email configuration issue. Please check Supabase Auth settings.";
        }

        toast({
          title: "Error creating account",
          description: errorMessage,
          variant: "destructive",
        });

        // For API key errors, also log the solution URL
        if (error.message.includes('Invalid API key')) {
          console.log('��� Quick fix: Go to https://app.supabase.com/project/wmkqurcudreptjrqpqpf/auth/users and disable email confirmations');
        }

        // Log detailed error for debugging
        console.error('Signup error details:');
        console.error('- Message:', error.message);
        console.error('- Status:', (error as any).status);
        console.error('- Status Code:', (error as any).statusCode);
        console.error('- Full error object:', JSON.stringify(error, null, 2));
        console.error('- Error keys:', Object.keys(error));
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }

      return { error };
    } catch (networkError: any) {
      console.error('Network/Exception error during signup:');
      console.error('- Error message:', networkError?.message || 'Unknown error');
      console.error('- Error type:', typeof networkError);
      console.error('- Full error:', JSON.stringify(networkError, Object.getOwnPropertyNames(networkError), 2));

      const errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
      toast({
        title: "Connection error",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: {
    full_name?: string;
    avatar_url?: string;
  }) => {
    const { error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
