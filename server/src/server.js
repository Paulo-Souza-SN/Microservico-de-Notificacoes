"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var zod_1 = require("zod");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var notificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    message: zod_1.z.string().min(5, "A mensagem deve ser mais detalhada"),
    level: zod_1.z.enum(['INFO', 'WARNING', 'CRITICAL'])
});
// Tipagem das cores para evitar o uso de 'any'
var COLORS = {
    INFO: 3447003,
    WARNING: 16776960,
    CRITICAL: 15158332
};
app.post('/notifications', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, message, level, webhookUrl, response, errorText, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = notificationSchema.parse(req.body), title = _a.title, message = _a.message, level = _a.level;
                webhookUrl = process.env.DISCORD_WEBHOOK_URL;
                if (!webhookUrl) {
                    console.error("[Config Erro]: DISCORD_WEBHOOK_URL não definida.");
                    return [2 /*return*/, res.status(500).json({ error: "Erro de configuração no servidor." })];
                }
                return [4 /*yield*/, fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            embeds: [{
                                    title: "[".concat(level, "] ").concat(title),
                                    description: message,
                                    color: COLORS[level],
                                    timestamp: new Date().toISOString()
                                }]
                        })
                    })];
            case 1:
                response = _b.sent();
                if (!!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.text()];
            case 2:
                errorText = _b.sent();
                throw new Error("Discord API Error: ".concat(response.status, " - ").concat(errorText));
            case 3: return [2 /*return*/, res.status(201).json({ message: "Notificação enviada com sucesso!" })];
            case 4:
                error_1 = _b.sent();
                // Tratamento de erro de validação (Zod)
                if (error_1 instanceof zod_1.z.ZodError) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Falha na validação dos dados",
                            issues: error_1.format() // Formato mais legível para o front-end
                        })];
                }
                // Erros inesperados ou de rede
                console.error("[Server Error]:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Erro interno ao processar notificação" })];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () { return console.log("\uD83D\uDE80 Servidor ativo em http://localhost:".concat(PORT)); });
