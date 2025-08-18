# Como Corrigir o Erro "Invalid API key" no Supabase

O erro "Invalid API key" que aparece durante o signup não é necessariamente um problema com a API key, mas sim com a configuração de autenticação do Supabase.

## ✅ Solução 1: Desabilitar Confirmação de Email (Recomendado para desenvolvimento)

1. **Acesse o painel do Supabase**: https://app.supabase.com/project/wmkqurcudreptjrqpqpf
2. **Vá para Authentication > Settings**
3. **Na seção "User Signups"**:
   - Desmarque "Enable email confirmations"
   - Clique em "Save"

## ✅ Solução 2: Configurar Provedor de Email (Para produção)

Se você quiser manter a confirmação de email:

1. **No painel do Supabase > Authentication > Settings**
2. **Na seção "SMTP Settings"**:
   - Configure um provedor de email (Gmail, SendGrid, etc.)
   - Ou use o provedor built-in do Supabase

## ✅ Solução 3: Configurar Email Templates

1. **Authentication > Email Templates**
2. **Configure os templates de:**
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

## 🔧 Para Testar

Depois de aplicar qualquer uma das soluções acima:

1. Clique no botão "🔧 Debug Auth" na página de signup
2. Verifique o console do navegador
3. Tente criar uma conta novamente

## 📝 Nota Importante

O erro "Invalid API key" no contexto de autenticação geralmente significa que o Supabase está tentando enviar um email de confirmação, mas não consegue devido à falta de configuração de email.
