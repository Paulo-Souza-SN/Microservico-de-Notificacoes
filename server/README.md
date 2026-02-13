# ⚙️ Koda API (Backend)

O **Koda API** é o motor de processamento do ecossistema Koda. Desenvolvido em Node.js com TypeScript, ele é responsável por receber, validar e despachar notificações para serviços de terceiros (Discord) de forma segura.

## 🎯 Objetivo
Atuar como uma camada intermediária (Middleware) que garante a integridade dos dados e protege as credenciais sensíveis (Webhooks), expondo apenas endpoints necessários para o frontend.

## 🛠️ Stack Técnica
- **Node.js & Express:** Base para a construção da API Rest.
- **TypeScript:** Tipagem estrita para segurança em tempo de desenvolvimento.
- **Zod:** Biblioteca de primeira linha para validação de esquemas e contratos de dados.
- **Dotenv:** Gerenciamento de variáveis de ambiente.
- **CORS:** Configuração de política de segurança para acesso entre domínios.

## 🚀 Principais Funcionalidades
- **Validação de Payload:** Utiliza o Zod para garantir que nenhuma mensagem seja processada sem conter os campos obrigatórios (`title`, `message`, `level`).
- **Níveis de Severidade:** Mapeamento inteligente de níveis de erro (`INFO`, `WARNING`, `CRITICAL`) para códigos de cores hexadecimais do Discord.
- **Tratamento de Exceções:** Captura de erros de validação e erros internos, retornando status codes HTTP apropriados (400, 500).
- **Segurança Cibernética:** Abstração de URLs sensíveis, impedindo que Webhooks fiquem expostos no código client-side.



## 🏗️ Como Rodar Localmente

1. Acesse a pasta: ``` cd server ```
2. Instale as dependências: ```npm install```
3. Configure o arquivo ```.env```:

   - Copie o ```.env.example``` para ```.env.```
   
   - Preencha com sua DISCORD_WEBHOOK_URL.

4. Inicie o servidor: ```npm run dev```

## 🔐 Contrato de Dados (Schema)
O backend espera um objeto JSON no seguinte formato:
```
// TypeScript
{
  "title": string (min 3 chars),
  "message": string (min 5 chars),
  "level": "INFO" | "WARNING" | "CRITICAL"
}
```

## 🧠 Conceitos de Engenharia Aplicados
### Schema-first Validation:
A validação acontece na porta de entrada da aplicação.

### Fail-fast:
O sistema interrompe o processamento imediatamente se um dado inválido é detectado, economizando recursos.

### Segurança de Variáveis:
Prática rigorosa de não versionar arquivos .env.