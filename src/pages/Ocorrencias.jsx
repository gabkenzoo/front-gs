import { useState } from 'react'
import ReportForm from '../components/reports/ReportForm'

function Ocorrencias() {
  const [mensagem, setMensagem] = useState('')

  function salvar(dados) {
    console.log('Relato enviado:', dados)
    setMensagem('Relato validado. Ainda não está sendo salvo na API.')
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Ocorrências</h1>

      {mensagem && (
        <p className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {mensagem}
        </p>
      )}

      <ReportForm onSalvar={salvar} />
    </main>
  )
}

export default Ocorrencias