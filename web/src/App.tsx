import { useState } from 'react'
import './App.css' // Importando o CSS que acabamos de criar

function App() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('INFO')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('Enviando para o servidor...')

    try {
      // Ajuste o endereço se o seu backend estiver em outra porta
      const response = await fetch('http://localhost:3000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, level })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar')
      }

      setStatus('✅ Notificação enviada ao Discord!')
      setTitle('') 
      setMessage('')
    } catch (err: any) {
      setStatus(`❌ Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="card">
        <h1>Koda</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título do Alerta</label>
            <input 
              type="text"
              placeholder="Ex: Servidor fora do ar"
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Mensagem Detalhada</label>
            <textarea 
              placeholder="Descreva o que aconteceu..."
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Nível de Urgência</label>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="INFO">ℹ️ Info</option>
              <option value="WARNING">⚠️ Warning</option>
              <option value="CRITICAL">🚨 Critical</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Disparar Notificação'}
          </button>

          {status && <div className="status-msg">{status}</div>}
        </form>
      </div>
  )
}

export default App