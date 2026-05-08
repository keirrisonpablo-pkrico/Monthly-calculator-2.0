// ============================================
// FINWISE - Controle de Despesas Inteligente
// ============================================

class FinWiseApp {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.expenses = this.loadExpenses();
        this.init();
    }

    // ============ INICIALIZAÇÃO ============
    init() {
        this.checkUserLogin();
        this.attachEventListeners();
        this.setTodayDate();
    }

    checkUserLogin() {
        const storedUser = localStorage.getItem('finwiseCurrentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.showAppScreen();
        } else {
            this.showLoginScreen();
        }
    }

    attachEventListeners() {
        // Login
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('showRegisterBtn').addEventListener('click', () => this.toggleScreen('register'));
        
        // Register
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('showLoginBtn').addEventListener('click', () => this.toggleScreen('login'));
        
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        
        // Expenses
        document.getElementById('expenseForm').addEventListener('submit', (e) => this.handleAddExpense(e));
        document.getElementById('monthFilter').addEventListener('change', () => this.renderExpenses());
    }

    // ============ AUTENTICAÇÃO ============
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('finwiseCurrentUser', JSON.stringify(user));
            this.showAlert('Login realizado com sucesso!', 'success');
            setTimeout(() => this.showAppScreen(), 500);
        } else {
            this.showAlert('Email ou senha incorretos!', 'error');
        }

        this.resetForm('loginForm');
    }

    handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerPasswordConfirm').value;

        // Validações
        if (password.length < 6) {
            this.showAlert('A senha deve ter pelo menos 6 caracteres!', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('As senhas não coincidem!', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showAlert('Este email já está registrado!', 'error');
            return;
        }

        // Criar novo usuário
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();

        this.showAlert('Conta criada com sucesso! Faça login agora.', 'success');
        this.resetForm('registerForm');
        setTimeout(() => this.toggleScreen('login'), 500);
    }

    handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('finwiseCurrentUser');
            this.currentUser = null;
            this.showLoginScreen();
        }
    }

    // ============ DESPESAS ============
    handleAddExpense(e) {
        e.preventDefault();

        const description = document.getElementById('expenseDescription').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;

        if (!description || !amount || !category || !date) {
            this.showAlert('Preencha todos os campos!', 'error');
            return;
        }

        if (amount <= 0) {
            this.showAlert('O valor deve ser maior que zero!', 'error');
            return;
        }

        const newExpense = {
            id: Date.now(),
            userId: this.currentUser.id,
            description: description,
            amount: amount,
            category: category,
            date: date,
            createdAt: new Date().toISOString()
        };

        this.expenses.push(newExpense);
        this.saveExpenses();

        this.showAlert('Despesa adicionada com sucesso!', 'success');
        this.resetForm('expenseForm');
        this.renderExpenses();
        this.updateStats();
    }

    getUserExpenses() {
        return this.expenses.filter(exp => exp.userId === this.currentUser.id);
    }

    getFilteredExpenses() {
        const monthFilter = document.getElementById('monthFilter').value;
        const userExpenses = this.getUserExpenses();

        if (!monthFilter) return userExpenses;

        return userExpenses.filter(exp => {
            const expenseMonth = exp.date.substring(0, 7);
            return expenseMonth === monthFilter;
        });
    }

    renderExpenses() {
        const expensesList = document.getElementById('expensesList');
        const filteredExpenses = this.getFilteredExpenses();

        if (filteredExpenses.length === 0) {
            expensesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>Nenhuma despesa registrada</p>
                </div>
            `;
            return;
        }

        // Ordenar por data (mais recente primeiro)
        const sorted = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

        expensesList.innerHTML = sorted.map(expense => `
            <div class="expense-item bg-gray-50 rounded-12 p-4 border-l-4 border-purple-600">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="category-badge bg-purple-100 text-purple-700">
                                ${this.getCategoryEmoji(expense.category)} ${expense.category}
                            </span>
                            <span class="text-xs text-gray-500">${this.formatDate(expense.date)}</span>
                        </div>
                        <p class="font-semibold text-gray-800">${expense.description}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-red-600">R$ ${expense.amount.toFixed(2)}</p>
                        <button class="text-red-500 hover:text-red-700 text-xs mt-2" onclick="app.deleteExpense(${expense.id})">
                            <i class="fas fa-trash"></i> Deletar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateCategorySummary();
    }

    deleteExpense(id) {
        if (confirm('Tem certeza que deseja deletar esta despesa?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.saveExpenses();
            this.showAlert('Despesa deletada com sucesso!', 'success');
            this.renderExpenses();
            this.updateStats();
        }
    }

    updateCategorySummary() {
        const filteredExpenses = this.getFilteredExpenses();
        const categorySummary = document.getElementById('categorySummary');

        if (filteredExpenses.length === 0) {
            categorySummary.innerHTML = `
                <div class="empty-state">
                    <p>Sem dados para exibir</p>
                </div>
            `;
            return;
        }

        const categories = {};
        filteredExpenses.forEach(exp => {
            if (!categories[exp.category]) {
                categories[exp.category] = 0;
            }
            categories[exp.category] += exp.amount;
        });

        const totalExpense = Object.values(categories).reduce((a, b) => a + b, 0);

        categorySummary.innerHTML = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => {
                const percentage = ((amount / totalExpense) * 100).toFixed(1);
                return `
                    <div class="bg-gray-50 rounded-12 p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold text-gray-800">
                                ${this.getCategoryEmoji(category)} ${category}
                            </span>
                            <span class="font-bold text-purple-600">R$ ${amount.toFixed(2)}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                                 style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">${percentage}% do total</p>
                    </div>
                `;
            })
            .join('');
    }

    updateStats() {
        const filteredExpenses = this.getFilteredExpenses();
        const totalExpense = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const categories = new Set(filteredExpenses.map(exp => exp.category));

        document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
        document.getElementById('categoryCount').textContent = categories.size;
        document.getElementById('transactionCount').textContent = filteredExpenses.length;
    }

    populateMonthFilter() {
        const monthFilter = document.getElementById('monthFilter');
        const userExpenses = this.getUserExpenses();

        const months = new Set();
        userExpenses.forEach(exp => {
            months.add(exp.date.substring(0, 7));
        });

        const sortedMonths = Array.from(months).sort().reverse();

        const currentOptions = `<option value="">Todos os meses</option>`;
        const monthOptions = sortedMonths.map(month => {
            const [year, monthNum] = month.split('-');
            const monthName = new Date(year, monthNum - 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
            return `<option value="${month}">${monthName}</option>`;
        }).join('');

        monthFilter.innerHTML = currentOptions + monthOptions;
    }

    // ============ UTILITÁRIOS ============
    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('registerScreen').classList.add('hidden');
        document.getElementById('appScreen').classList.add('hidden');
    }

    showRegisterScreen() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('registerScreen').classList.remove('hidden');
        document.getElementById('appScreen').classList.add('hidden');
    }

    showAppScreen() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('registerScreen').classList.add('hidden');
        document.getElementById('appScreen').classList.remove('hidden');

        document.getElementById('userName').textContent = this.currentUser.name;
        this.populateMonthFilter();
        this.renderExpenses();
        this.updateStats();
    }

    toggleScreen(screen) {
        if (screen === 'register') {
            this.showRegisterScreen();
        } else if (screen === 'login') {
            this.showLoginScreen();
        }
    }

    resetForm(formId) {
        document.getElementById(formId).reset();
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('expenseDate');
        if (dateInput) {
            dateInput.value = today;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    getCategoryEmoji(category) {
        const emojis = {
            'Alimentação': '🍔',
            'Transporte': '🚗',
            'Saúde': '⚕️',
            'Educação': '📚',
            'Lazer': '🎮',
            'Moradia': '🏠',
            'Utilidades': '💡',
            'Outros': '📦'
        };
        return emojis[category] || '📌';
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 animate-bounce ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // ============ ARMAZENAMENTO LOCAL ============
    loadUsers() {
        const stored = localStorage.getItem('finwiseUsers');
        return stored ? JSON.parse(stored) : [];
    }

    saveUsers() {
        localStorage.setItem('finwiseUsers', JSON.stringify(this.users));
    }

    loadExpenses() {
        const stored = localStorage.getItem('finwiseExpenses');
        return stored ? JSON.parse(stored) : [];
    }

    saveExpenses() {
        localStorage.setItem('finwiseExpenses', JSON.stringify(this.expenses));
    }
}

// Inicializar a aplicação quando o documento carregar
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new FinWiseApp();
});
