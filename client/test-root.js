// Simple test to verify React createRoot is working properly
// This file can be deleted after testing

console.log('Testing React createRoot fix...');

// Check if the root element exists
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('✅ Root element found');
  
  // Check if our custom property exists (development only)
  if (import.meta.env?.DEV) {
    if (rootElement.__reactRoot) {
      console.log('✅ React root properly cached for development');
    } else {
      console.log('ℹ️ React root not yet cached (first run)');
    }
  }
} else {
  console.error('❌ Root element not found');
}

export {};
