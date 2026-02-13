import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod'; // Biblioteca de validação

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Criamos o "Contrato" (Schema) dos dados que aceitamos
const notificationSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  message: z.string().min(5, "A mensagem deve ser mais detalhada"),
  level: z.enum(['ℹ️ Info', '⚠️ WARNING', '🚨CRITICAL'])
});

app.post('/notifications', async (req, res) => {
  try {
    // 2. Valida se o que veio no body segue o contrato
    const { title, message, level } = notificationSchema.parse(req.body);

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ error: "Configuração de Webhook ausente" });
    }

    // 3. Define o estilo da mensagem no Discord
    const colors: Record<string, number> = {
      INFO: 3447003,    // Azul
      WARNING: 16776960, // Amarelo
      CRITICAL: 15158332 // Vermelho
    };

    // 4. Envia para o Discord usando a Fetch API (nativa do Node 18+)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: `[${level}] ${title}`,
          description: message,
          color: colors[level],
          timestamp: new Date().toISOString()
        }]
      })
    });

    if (!response.ok) throw new Error("Falha ao enviar para o Discord");

    return res.status(201).json({ message: "Notificação enviada com sucesso!" });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error });
    }
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(3000, () => {
  console.log("🔥 Backend rodando em http://localhost:3000");
});