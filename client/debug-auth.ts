// Debug test for Supabase authentication issues
import { supabase } from './lib/supabase';

export const debugAuth = async () => {
  console.log('🔍 Starting auth debug test...');
  
  try {
    // Test 1: Basic connection
    console.log('Test 1: Basic database connection...');
    const { data: templates, error: dbError } = await supabase
      .from('resume_templates')
      .select('count', { count: 'exact', head: true });
    
    if (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return;
    }
    console.log('✅ Database connection successful');
    
    // Test 2: Auth service health
    console.log('Test 2: Auth service health...');
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Auth service error:', sessionError);
      return;
    }
    console.log('✅ Auth service is accessible');
    console.log('Current session:', session);
    
    // Test 3: Try to sign up with a test user
    console.log('Test 3: Testing signup functionality...');
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: 'TestPassword123!',
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    });
    
    if (signupError) {
      console.error('❌ Signup failed:', signupError);
      console.error('Error details:', {
        message: signupError.message,
        status: (signupError as any).status,
        statusText: (signupError as any).statusText
      });
      return;
    }
    
    console.log('✅ Signup test successful!');
    console.log('Signup result:', signupData);
    
  } catch (error) {
    console.error('❌ Debug test failed with exception:', error);
  }
};

// Export for use in components
export default debugAuth;
