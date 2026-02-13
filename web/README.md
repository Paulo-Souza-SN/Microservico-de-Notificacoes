# 💻 Koda Dashboard (Frontend)

Esta é a interface de controle do **Koda**. Um dashboard moderno e minimalista desenvolvido para permitir que operadores enviem alertas manuais e monitorem o status do sistema de notificações.

## 🎯 Objetivo
Prover uma interface intuitiva onde o usuário possa redigir notificações, escolher o nível de criticidade e enviá-las para a API de processamento sem precisar lidar com código ou terminais.

## 🛠️ Stack Técnica
- **React.js + Vite:** Ambiente de desenvolvimento ultra-rápido.
- **TypeScript:** Tipagem estrita para garantir que os dados enviados ao servidor estejam sempre no formato correto.
- **CSS Modules/Puro:** Estilização customizada focada em Dark Mode e legibilidade.
- **Fetch API:** Comunicação assíncrona com o backend.

## 🚀 Principais Funcionalidades
- **Formulário Reativo:** Validação visual antes mesmo do envio.
- **Níveis de Alerta:** Seleção dinâmica entre `INFO`, `WARNING` e `CRITICAL`, cada um com seu peso visual.
- **Feedback de Status:** Notificações de sucesso e erro que informam o usuário exatamente o que aconteceu com sua requisição.
- **Design Responsivo:** Pronto para ser acessado de qualquer dispositivo.



## 🏗️ Como Rodar Localmente

1. Certifique-se de que o **Koda API** (Backend) está rodando na porta 3000.
2. Acesse a pasta: ``` cd web```
3. Instale as dependências: ```npm install```
4. Inicie o servidor de desenvolvimento: ```npm run dev```

## 🧠 Aprendizados Relevantes
Durante o desenvolvimento desta camada, foi necessário aprofundar conhecimentos em:

### Ciclo de Vida de Requisições:
Gerenciamento de estados de espera (loading) para evitar cliques duplos.

### Segurança de Tipos:
Sincronização de interfaces TypeScript entre o que o formulário captura e o que a API espera.