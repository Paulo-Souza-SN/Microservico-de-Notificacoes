# 🛰️ Viggy

**Koda** é um ecossistema de microserviços focado em centralização e despacho de notificações críticas. Ele atua como uma ponte inteligente entre eventos do sistema e canais de comunicação (nesta versão, integrada ao Discord).

---

## ❓ O que é?
O Koda não é apenas um formulário de contato; é uma infraestrutura de alertas projetada para ser escalável. Ele separa a interface de captura de dados da lógica de processamento e entrega, permitindo que notificações de diferentes fontes sejam padronizadas e enviadas em tempo real.

## 🎯 O que ele resolve?
Em sistemas complexos, logs de erro muitas vezes ficam "escondidos" em arquivos de texto no servidor. O Viggy resolve os seguintes problemas:
- **Silenciamento de Erros:** Transforma erros silenciosos em alertas visuais imediatos para a equipe.
- **Falta de Padronização:** Garante que toda notificação tenha um título, uma mensagem e um nível de severidade (`INFO`, `WARNING`, `CRITICAL`).
- **Acoplamento:** Permite que o frontend não precise conhecer as regras de negócio ou URLs secretas das APIs de destino (como Webhooks do Discord).

## 🛠️ O que foi preciso para desenvolver?
A construção do Koda exigiu a integração de diversas camadas técnicas e conceitos de engenharia de software:

### 1. Engenharia de Back-end (Node.js & TypeScript)
- **Desenvolvimento de API REST:** Criação de endpoints robustos para recebimento de payloads.
- **Contratos de Dados (Zod):** Implementação de validação de esquemas para garantir que o sistema seja "à prova de falhas" contra dados malformatados.
- **Segurança de Ambiente:** Gerenciamento de segredos e credenciais sensíveis através de variáveis de ambiente (`dotenv`).

### 2. Engenharia de Front-end (React & TypeScript)
- **Gerenciamento de Estado:** Controle de ciclos de vida de requisições (loading, success, error).
- **Consumo de APIs:** Integração assíncrona entre cliente e servidor.
- **Arquitetura de Componentes:** Interface modular e responsiva para operação do sistema.

### 3. Integrações e DevOps
- **Webhooks:** Consumo da API do Discord para entrega de mensagens via Embeds.
- **Git Flow:** Versionamento semântico e organização de repositório profissional.
- **Resiliência de Sistemas:** Planejamento de arquitetura assíncrona para suporte a alta carga (Próxima fase: Mensageria).

---

## 🏗️ Estrutura do Repositório

- `/server`: API Rest construída com Express e TypeScript.
- `/web`: Dashboard administrativa construída com React e Vite.

---

## 🚀 Como iniciar o projeto
*(Consulte os READMEs específicos de cada pasta para detalhes de configuração)*

1. Clone o projeto.
2. Configure o seu `.env` na pasta `/server` com sua `DISCORD_WEBHOOK_URL`.
3. Instale as dependências com `npm install` em ambas as pastas.
4. Execute `npm run dev`.

<br>


