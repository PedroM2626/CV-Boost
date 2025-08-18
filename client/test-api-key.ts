// Simple test to validate the API key is working
import { supabase } from './lib/supabase';

export const testApiKey = async () => {
  try {
    console.log('🔍 Testing Supabase API key...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('resume_templates')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ API key test failed:', error.message);
      return false;
    }
    
    console.log('✅ API key is working correctly!');
    return true;
  } catch (err) {
    console.error('❌ Connection failed:', err);
    return false;
  }
};

// Auto-run test in development
if (import.meta.env.DEV) {
  testApiKey();
}
