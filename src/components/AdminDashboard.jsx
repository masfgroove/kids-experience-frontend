import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://produtos-api-lagc.onrender.com/inscricoes';

export default function AdminDashboard() {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null);

  // Buscar todas as inscrições do Render/Supabase
  const carregarInscricoes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setInscricoes(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar a lista de inscrições da nuvem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarInscricoes();
  }, []);

  // Deletar inscrição
  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta inscrição?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setInscricoes(inscricoes.filter((item) => (item.id || item.codigo) !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir a inscrição.');
    }
  };

  // Abrir modal de edição
  const handleIniciarEdicao = (item) => {
    setEditando({ ...item });
  };

  const handleEditChange = (e) => {
    setEditando({ ...editando, [e.target.name]: e.target.value });
  };

  // Salvar alterações (PUT)
  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    const itemId = editando.id || editando.codigo;
    try {
      const response = await axios.put(`${API_URL}/${itemId}`, editando);
      setInscricoes(
        inscricoes.map((item) => ((item.id || item.codigo) === itemId ? response.data : item))
      );
      setEditando(null);
      alert('Inscrição atualizada com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar a inscrição.');
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              PAINEL ADMINISTRATIVO
            </h1>
            <p className="text-sm text-slate-400 mt-1">Gerencie as inscrições em tempo real na nuvem</p>
          </div>
          <button
            onClick={carregarInscricoes}
            className="mt-4 md:mt-0 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-sm font-semibold transition"
          >
            🔄 Atualizar Lista
          </button>
        </div>

        {error && <div className="p-4 mb-4 bg-rose-950 text-rose-300 border border-rose-500 rounded-xl">{error}</div>}

        {/* MODAL DE EDIÇÃO */}
        {editando && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
              <h2 className="text-xl font-bold text-pink-400">Editar Inscrição #{editando.id || editando.codigo}</h2>
              <form onSubmit={handleSalvarEdicao} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Nome Completo</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={editando.nomeCompleto || ''}
                    onChange={handleEditChange}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold">Idade</label>
                    <input
                      type="number"
                      name="idade"
                      value={editando.idade || ''}
                      onChange={handleEditChange}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold">Telefone</label>
                    <input
                      type="text"
                      name="telefone"
                      value={editando.telefone || ''}
                      onChange={handleEditChange}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Responsável</label>
                  <input
                    type="text"
                    name="nomeResponsavel"
                    value={editando.nomeResponsavel || ''}
                    onChange={handleEditChange}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={editando.email || ''}
                    onChange={handleEditChange}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Loja Indicação</label>
                  <input
                    type="text"
                    name="lojaIndicacao"
                    value={editando.lojaIndicacao || ''}
                    onChange={handleEditChange}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-pink-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditando(null)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl font-semibold transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 font-bold text-white rounded-xl shadow-lg hover:opacity-95 transition"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TABELA */}
        {loading ? (
          <p className="text-center py-12 text-slate-400">Carregando inscrições...</p>
        ) : (
          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Modelo</th>
                  <th className="p-4">Idade</th>
                  <th className="p-4">Responsável</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Loja</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {inscricoes.map((item) => {
                  const itemId = item.id || item.codigo;
                  return (
                    <tr key={itemId} className="hover:bg-slate-800/30 transition">
                      <td className="p-4 font-mono text-pink-400">#{itemId}</td>
                      <td className="p-4 font-semibold">{item.nomeCompleto}</td>
                      <td className="p-4">{item.idade} anos</td>
                      <td className="p-4 text-slate-300">{item.nomeResponsavel || '-'}</td>
                      <td className="p-4 text-slate-300">{item.telefone}</td>
                      <td className="p-4 text-slate-300">{item.lojaIndicacao || '-'}</td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => handleIniciarEdicao(item)}
                          className="px-3 py-1.5 bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-semibold transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeletar(itemId)}
                          className="px-3 py-1.5 bg-rose-600/30 border border-rose-500/50 text-rose-300 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-semibold transition"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {inscricoes.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      Nenhuma inscrição cadastrada até o momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}