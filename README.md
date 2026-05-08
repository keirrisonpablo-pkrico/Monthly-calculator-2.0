# 💰 FinWise - Controle de Despesas Inteligente

Uma aplicação web moderna e profissional para controlar suas despesas mensais com autenticação de usuário, categorização automática e análise visual dos gastos.

![FinWise](https://img.shields.io/badge/Status-Ativo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## ✨ Características

✅ **Autenticação de Usuário**
- Criar conta com email e senha
- Login seguro
- Dados persistentes por usuário

✅ **Gestão de Despesas**
- Adicionar despesas com descrição, valor, categoria e data
- Deletar despesas
- Filtrar por mês
- Registro completo de transações

✅ **Categorias Pré-definidas**
- 🍔 Alimentação
- 🚗 Transporte
- ⚕️ Saúde
- 📚 Educação
- 🎮 Lazer
- 🏠 Moradia
- 💡 Utilidades
- 📦 Outros

✅ **Dashboard Analítico**
- Gasto total do mês
- Quantidade de categorias
- Total de transações
- Resumo de gastos por categoria com porcentagens
- Gráficos visuais em barras

✅ **Design Profissional**
- Interface responsiva (mobile, tablet, desktop)
- Gradientes modernos
- Animações suaves
- Ícones Font Awesome
- Tema roxo/violeta elegante

✅ **Armazenamento Local**
- Todos os dados salvos no localStorage
- Sem necessidade de servidor
- Dados persistem entre sessões

## 🚀 Como Usar

### Opção 1: Usar Direto no Navegador (Mais Fácil)

1. Abra o arquivo `index.html` diretamente no seu navegador
2. Ou acesse a versão hospedada (se publicada em GitHub Pages)

### Opção 2: Usando Nativefier (Criar App Desktop)

```bash
# 1. Instale o Nativefier globalmente
npm install -g nativefier

# 2. Clone ou baixe este repositório
git clone https://github.com/keirrisonpablo-pkrico/Monthly-calculator-2.0.git
cd Monthly-calculator-2.0

# 3. Crie um app desktop (substitua pelo caminho local)
nativefier file:///caminho/para/index.html "FinWise"
```

**Resultado:** Uma aplicação desktop profissional pronta para usar!

### Opção 3: Hospedar Online (GitHub Pages)

1. Vá para as **Settings** do seu repositório
2. Em **Pages**, selecione `main` como branch
3. Acesse sua aplicação em: `https://keirrisonpablo-pkrico.github.io/Monthly-calculator-2.0/`

## 📋 Primeiros Passos

### 1. Criar uma Conta
- Clique em "Criar Nova Conta"
- Preencha Nome, Email e Senha (mínimo 6 caracteres)
- Clique em "Criar Conta"

### 2. Fazer Login
- Use suas credenciais (email e senha)
- Clique em "Entrar"

### 3. Adicionar Despesas
- Preencha a descrição (ex: "Supermercado")
- Digite o valor em reais
- Selecione a categoria
- Escolha a data
- Clique em "Adicionar Despesa"

### 4. Analisar Gastos
- Veja o resumo no dashboard
- Filtre despesas por mês
- Analise gastos por categoria
- Delete despesas se necessário

## 🏗️ Estrutura do Projeto

```
Monthly-calculator-2.0/
├── index.html          # Página principal (estrutura HTML + estilos CSS)
├── script.js           # Lógica completa da aplicação (JavaScript)
├── README.md           # Este arquivo
└── LICENSE             # Licença do projeto
```

## 💾 Armazenamento de Dados

A aplicação usa **localStorage** do navegador:

```javascript
// Dados salvos automaticamente em:
localStorage.finwiseUsers      // Usuários registrados
localStorage.finwiseExpenses   // Despesas de todos os usuários
localStorage.finwiseCurrentUser // Usuário logado atualmente
```

**Importante:**
- Dados salvos localmente (não enviados para servidor)
- Se limpar cache/cookies do navegador, dados serão deletados
- Cada navegador tem seu próprio armazenamento isolado

## 🎨 Design & Tecnologias

- **HTML5**: Estrutura semântica
- **Tailwind CSS**: Framework CSS utilitário via CDN
- **JavaScript Vanilla**: Sem dependências externas
- **Font Awesome**: Ícones profissionais
- **LocalStorage API**: Persistência de dados

## 🔐 Segurança

⚠️ **Aviso de Segurança:**
- Senhas são armazenadas em texto simples no localStorage
- Não use senhas sensíveis reais
- Para produção, implemente backend com criptografia
- Não compartilhe seu localStorage/cache do navegador

## 📱 Compatibilidade

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Navegadores móveis

## 🔧 Funcionalidades Técnicas

### Classes e Métodos Principais

```javascript
class FinWiseApp {
    // Autenticação
    handleLogin(e)
    handleRegister(e)
    handleLogout()
    
    // Despesas
    handleAddExpense(e)
    deleteExpense(id)
    getUserExpenses()
    renderExpenses()
    updateStats()
    
    // Utilitários
    showAlert(message, type)
    formatDate(dateString)
    getCategoryEmoji(category)
}
```

## 🚦 Próximas Melhorias Sugeridas

- [ ] Adicionar exportação de dados (CSV/PDF)
- [ ] Gráficos mais avançados (Chart.js)
- [ ] Backend com Node.js + MongoDB
- [ ] Sincronização entre dispositivos
- [ ] Relatórios mensais/anuais
- [ ] Metas de gastos por categoria
- [ ] Tema escuro/claro
- [ ] Suporte a múltiplas moedas
- [ ] Notificações de limites de gastos

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

## 👨‍💻 Autor

Criado por **keirrisonpablo-pkrico**

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Faça um fork, crie uma branch e envie um Pull Request.

## 📞 Suporte

Encontrou um bug? Abra uma Issue no GitHub!

---

**Divirta-se controlando suas despesas! 💰✨**
