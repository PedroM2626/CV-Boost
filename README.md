# CV-Boost

CV-Boost é uma plataforma web para criação, melhoria e gerenciamento de currículos, focada em impulsionar a carreira dos usuários com recursos modernos e integração com serviços externos.

## Sumário
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

## Visão Geral
CV-Boost permite que usuários criem currículos personalizados, melhorem seus documentos com sugestões inteligentes e gerenciem múltiplos templates. O sistema oferece autenticação, integração com Supabase, deploy via Netlify e interface responsiva.

## Funcionalidades
- Criação e edição de currículos
- Melhoria automática de currículos
- Autenticação de usuários
- Gerenciamento de múltiplos templates
- Interface responsiva e moderna
- Deploy automatizado via Netlify
- Integração com Supabase para backend

## Tecnologias Utilizadas
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Supabase
- **Deploy:** Netlify
- **Testes:** (Adicionar detalhes se houver)

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/PedroM2626/CV-Boost.git
   cd CV-Boost
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente conforme necessário (ver seção [Configuração](#configuração)).
4. Inicie o projeto:
   ```bash
   pnpm dev
   ```

## Configuração
- **Supabase:**
  - Crie um projeto no [Supabase](https://supabase.com/).
  - Configure as chaves de acesso em `client/lib/supabase.ts`.
- **Netlify:**
  - Configure o deploy automático via Netlify usando o arquivo `netlify.toml`.
- **Banco de Dados:**
  - O arquivo `database.sql` contém o modelo inicial do banco de dados.

## Scripts Disponíveis
- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Gera a versão de produção
- `pnpm preview`: Visualiza o build localmente

## Estrutura de Pastas
```
CV-Boost/
├── client/           # Frontend React
│   ├── components/   # Componentes reutilizáveis
│   ├── contexts/     # Contextos globais (ex: Auth)
│   ├── hooks/        # Hooks customizados
│   ├── lib/          # Integrações e utilitários
│   ├── pages/        # Páginas principais
│   └── global.css    # Estilos globais
├── server/           # Backend (rotas, index)
├── shared/           # Código compartilhado
├── public/           # Arquivos estáticos
├── netlify/          # Funções serverless
├── database.sql      # Modelo do banco de dados
├── package.json      # Dependências e scripts
├── tailwind.config.ts# Configuração do Tailwind
├── vite.config.ts    # Configuração do Vite
└── ...
```

## Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha feature'`
4. Faça push para o fork: `git push origin minha-feature`
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT.

---

> Para dúvidas, sugestões ou problemas, abra uma issue ou entre em contato com o mantenedor.
