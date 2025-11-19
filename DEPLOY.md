# 🚀 GUIA DE DEPLOY - FORA DO RADAR

Este guia mostra como colocar o site FORA DO RADAR no ar.

## ⚡ OPÇÃO 1: VERCEL (MAIS FÁCIL - RECOMENDADO)

### Passo a Passo:

1. **Acesse**: https://vercel.com
2. **Crie uma conta** (gratuito)
3. **Clique em "Add New Project"**
4. **Opções de upload**:
   - **A) Via GitHub (Recomendado)**:
     - Conecte sua conta GitHub
     - Crie um repositório e faça push do código
     - Importe o repositório na Vercel
   
   - **B) Via Upload Direto**:
     - Arraste a pasta do projeto
     - Ou use Vercel CLI

5. **Configurações**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Clique em "Deploy"**

7. **Pronto!** Seu site estará em: `seu-projeto.vercel.app`

### Comandos via Terminal (Opcional):

```bash
# Instalar Vercel CLI
npm install -g vercel

# No diretório do projeto
vercel

# Siga as instruções na tela
```

---

## 🌐 OPÇÃO 2: NETLIFY

### Método 1: Drag & Drop (Mais Fácil)

1. **Acesse**: https://app.netlify.com/drop
2. **Primeiro, gere o build**:
   ```bash
   npm install
   npm run build
   ```
3. **Arraste a pasta `dist`** para a área de drop
4. **Pronto!** Site no ar em: `random-name.netlify.app`

### Método 2: Via Git

1. **Acesse**: https://netlify.com
2. **Crie conta e clique em "Add new site"**
3. **Conecte ao GitHub**
4. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy!**

---

## 📁 OPÇÃO 3: GITHUB PAGES

### Passo a Passo:

1. **Crie repositório no GitHub**

2. **Adicione ao `vite.config.ts`**:
   ```typescript
   base: '/nome-do-repositorio/'
   ```

3. **Instale gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Adicione ao `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

5. **Faça deploy**:
   ```bash
   npm run deploy
   ```

6. **Ative no GitHub**:
   - Vá em Settings > Pages
   - Source: gh-pages branch
   - Pronto! `seu-usuario.github.io/nome-repositorio`

---

## 💻 OPÇÃO 4: HOSPEDAGEM TRADICIONAL (Hostinger, etc)

### Se você comprou hospedagem:

1. **Gere o build**:
   ```bash
   npm install
   npm run build
   ```

2. **Upload via FTP**:
   - Conecte via FileZilla ou cPanel
   - Faça upload da pasta `dist` para `public_html`

3. **Configure domínio** no painel da hospedagem

---

## 🔧 PREPARAÇÃO ANTES DO DEPLOY

### 1. Instale as dependências:
```bash
npm install
```

### 2. Teste localmente:
```bash
npm run dev
```

### 3. Crie o build de produção:
```bash
npm run build
```

### 4. Teste o build:
```bash
npm run preview
```

---

## 🌍 DOMÍNIO PRÓPRIO

### Para usar domínio personalizado (foradoradar.com):

#### Na Vercel:
1. Vá em Project Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

#### Na Netlify:
1. Domain Settings > Add custom domain
2. Siga instruções de DNS

#### Onde comprar domínio:
- **Registro.br** (Brasil - .com.br)
- **Namecheap** (Internacional)
- **GoDaddy**
- **Hostinger** (domínio + hospedagem)

---

## 📊 MONITORAMENTO

Após o deploy, você terá acesso a:
- **Analytics**: Visitantes, pageviews
- **Logs**: Erros e problemas
- **Performance**: Velocidade do site

---

## ⚙️ VARIÁVEIS DE AMBIENTE

Para produção, você pode adicionar:

1. **Crie arquivo `.env`**:
```env
VITE_API_URL=https://api.seusite.com
VITE_STRIPE_KEY=sua_chave_aqui
```

2. **Configure na Vercel/Netlify**:
   - Project Settings > Environment Variables
   - Adicione as mesmas variáveis

---

## 🔐 PRÓXIMOS PASSOS (Para site real)

Para transformar em marketplace real, você precisará:

1. **Backend** (Node.js, Python, PHP):
   - API para produtos
   - Sistema de autenticação
   - Processamento de pagamentos

2. **Banco de Dados**:
   - PostgreSQL, MySQL ou MongoDB
   - Para armazenar produtos, usuários, vendas

3. **Armazenamento**:
   - AWS S3, Cloudinary
   - Para arquivos de drum kits/beats

4. **Pagamentos**:
   - Stripe, PayPal, PagSeguro
   - Sistema de payout para vendedores

---

## 🆘 SUPORTE

Se tiver problemas:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

---

## 📝 CHECKLIST FINAL

Antes de fazer deploy:
- [ ] Testou todas as páginas
- [ ] Verificou responsividade mobile
- [ ] Tema claro/escuro funcionando
- [ ] Imagens carregando
- [ ] Sem erros no console
- [ ] Build gerado com sucesso

---

**Boa sorte com o deploy! 🚀**

Em caso de dúvidas, consulte a documentação da plataforma escolhida.
