# ADP Brazil Labs - QA Technical Interview Assignment

Projeto de automação de testes utilizando Playwright com TypeScript para o sistema OrangeHRM.

## 📋 Casos de Teste

- Test Case 1: Login
- Test Case 2: Recruitment - Create Candidate
- Test Case 3: Recruitment - Edit Candidate

## 🚀 Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/GustavoPTeixeira/adp-br-labs-challenge.git
cd adp-br-labs-challenge
```

### 2. Instalar dependências

```bash
npm install
npx playwright install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
LOGIN_USERNAME=Admin
LOGIN_PASSWORD=admin123
```

### 4. Executar os testes

**Modo headless (sem interface gráfica):**
```bash
npx playwright test
```

**Modo headed (com interface gráfica interativa):**
```bash
npx playwright test --ui
```

### 5. Visualizar relatório

```bash
npx playwright show-report
```

## 🛠️ Tecnologias

- Playwright v1.56.1
- TypeScript
- Node.js 22.17.0
- FakerJs 10.1.0
## 📁 Estrutura do Projeto

```
├── src/pages/          # Page Objects
├── tests/              # Arquivos de teste
├── fixtures/           # Arquivos de suporte
└── playwright.config.ts
```