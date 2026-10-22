import React, { useState } from 'react';
import axios from 'axios';
import { 
  Menu, X, Sparkles, Camera, Tv, Award, Star, 
  Store, UserCheck, Calendar, MapPin, CheckCircle2, ChevronRight, ShieldCheck 
} from 'lucide-react';
import Navbar from './components/navbar';
import InscricaoForm from './components/inscricaoForm';
import AdminDashboard from './components/AdminDashboard'; // <-- Adicionado

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewAdmin, setViewAdmin] = useState(false); // <-- Adicionado para alternar entre o site e o painel admin
  
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    idade: '',
    nomeResponsavel: '',
    telefone: '',
    email: '',
    lojaIndicacao: '',
    fotoUrl: ''
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      await axios.post('https://produtos-api-lagc.onrender.com/inscricoes/cadastrar', {
        ...formData,
        idade: Number(formData.idade)
      });
      setStatus({ loading: false, error: '', success: 'Inscrição realizada com sucesso! Seja bem-vindo(a) ao Mundo Kids Fashion Experience 2026!' });
      setFormData({ nomeCompleto: '', idade: '', nomeResponsavel: '', telefone: '', email: '', lojaIndicacao: '', fotoUrl: '' });
    } catch (err) {
      setStatus({ loading: false, error: 'Erro ao realizar inscrição. Verifique os campos e tente novamente.', success: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
      
      {/* BOTÃO DISCRETO PARA ACESSAR O PAINEL ADMIN */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex justify-end items-center text-xs">
        <button 
          onClick={() => setViewAdmin(!viewAdmin)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-pink-600/20 border border-pink-500/40 text-pink-300 hover:bg-pink-600 hover:text-white rounded-lg font-semibold transition cursor-pointer"
        >
          <ShieldCheck size={14} />
          <span>{viewAdmin ? '← Voltar para o Site' : 'Painel Admin (Restrito)'}</span>
        </button>
      </div>

      {/* SE ESTIVER NO ADMIN, MOSTRA O PAINEL. SENÃO, MOSTRA O SITE COMPLETO */}
      {viewAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          {/* NAVBAR FIXA */}
          <Navbar/>

          {/* HEADER / HERO SECTION */}
          <header id="inicio" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-pink-950/60 border border-pink-500/30 px-4 py-1.5 rounded-full text-pink-300 text-xs font-semibold tracking-wider uppercase">
                  <Sparkles size={14} />
                  <span>Para Crianças e Adolescentes de 06 a 15 Anos</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                  MUNDO <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400 bg-clip-text text-transparent">KIDS</span>
                  <span className="block text-2xl sm:text-3xl font-bold tracking-widest text-slate-300 mt-2">FASHION EXPERIENCE</span>
                </h1>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl inline-block">
                  <p className="text-lg md:text-xl font-bold text-yellow-400 tracking-wide">
                    TALENTO, EXPERIÊNCIA, VISIBILIDADE E VENDAS.
                  </p>
                  <p className="text-slate-300 text-sm mt-1">
                    Um projeto inovador unindo formação, experiência, marketing e geração de vendas para lojas participantes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
                  <a 
                    href="#inscricao" 
                    className="w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 font-bold rounded-xl shadow-lg hover:opacity-95 transition"
                  >
                    Garantir Minha Vaga
                  </a>
                  <a 
                    href="https://instagram.com/kids_fashion_experience" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold rounded-xl transition text-pink-400"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>@kids_fashion_experience</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/30 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 p-2 flex items-center justify-center">
                  <img 
                    src="/image1.jpg" 
                    alt="Modelos Kids Experience" 
                    className="rounded-2xl object-contain w-full h-[400px]"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
                    <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Edição Oficial</p>
                    <p className="text-lg font-extrabold text-white">Temporada 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* PILE DE PILARES / DESTAQUES */}
          <section id="sobre" className="py-16 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight">O que fazemos do projeto um sucesso?</h2>
                <p className="text-slate-400 text-sm mt-2">Pilares fundamentais que entregam valor real para modelos e lojistas.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center hover:border-pink-500/50 transition">
                  <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={24} />
                  </div>
                  <h3 className="font-bold text-sm">NOVOS TALENTOS</h3>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center hover:border-purple-500/50 transition">
                  <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={24} />
                  </div>
                  <h3 className="font-bold text-sm">EXPERIÊNCIA PROFISSIONAL</h3>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center hover:border-blue-500/50 transition">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tv size={24} />
                  </div>
                  <h3 className="font-bold text-sm">POSSIBILIDADES NA TV</h3>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center hover:border-yellow-500/50 transition">
                  <div className="w-12 h-12 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-bold text-sm">MUNDO DA MODA</h3>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center col-span-2 md:col-span-1 hover:border-green-500/50 transition">
                  <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="font-bold text-sm">CERTIFICADO E MUITO MAIS!</h3>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO PARA LOJAS E MODELOS */}
          <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Para Lojas */}
              <div id="lojas" className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-pink-500">
                  <Store size={120} />
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
                    <Store size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-pink-400">PARA AS LOJAS</h3>
                </div>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-1" size={18} />
                    <span>Participação 100% gratuita no projeto</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-1" size={18} />
                    <span>Indicação de 30 modelos clientes exclusivas para sua marca</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-1" size={18} />
                    <span>Divulgação intensa da marca durante todo o projeto</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-1" size={18} />
                    <span>Possibilidade de uso das fotos dos modelos nas redes sociais da loja</span>
                  </li>
                </ul>
              </div>

              {/* Para Modelos */}
              <div id="modelos" className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-purple-500">
                  <UserCheck size={120} />
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <UserCheck size={28} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-purple-400">PARA OS MODELOS</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">Cada participante deverá cumprir os seguintes passos:</p>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                    <span>Adquirir 01 look da loja participante parceira</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                    <span>Vender 06 convites para o grande evento final</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <ChevronRight className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                    <span>Garantir vivência real de passarela, ensaios fotográficos e desenvolvimento pessoal</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* BENEFÍCIOS E CRONOGRAMA */}
          <section id="beneficios" className="py-16 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Benefícios */}
              <div>
                <h3 className="text-2xl font-black mb-6 flex items-center space-x-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span>O QUE ESTÁ INCLUSO (BENEFÍCIOS)</span>
                </h3>
                <div className="space-y-3">
                  {[
                    "Workshop completo (05 aulas preparatórias)",
                    "Participação oficial no desfile de encerramento",
                    "Certificado oficial de participação",
                    "08 fotos profissionais em alta resolução",
                    "Imersão completa no universo fashion e artístico"
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
                      <CheckCircle2 className="text-yellow-400 flex-shrink-0" size={20} />
                      <span className="font-medium text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cronograma */}
              <div id="cronograma">
                <h3 className="text-2xl font-black mb-6 flex items-center space-x-3">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  <span>CRONOGRAMA OFICIAL 2026</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-4">
                    <div className="p-3 bg-pink-500/10 text-pink-400 rounded-lg">
                      <Calendar size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-pink-400">INSCRIÇÕES</h4>
                      <p className="text-sm text-slate-300">Julho de 2026</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-4">
                    <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
                      <Star size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-400">WORKSHOP</h4>
                      <p className="text-sm text-slate-300">Agosto de 2026</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-4">
                    <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded-lg">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-400">DESFILE E FORMATURA</h4>
                      <p className="text-sm text-slate-300">Setembro de 2026</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* LOCAL DO WORKSHOP */}
          <section id="local" className="py-16 px-4 max-w-7xl mx-auto text-center">
            <div className="inline-block p-4 bg-purple-950/60 border border-purple-500/30 rounded-2xl max-w-xl w-full shadow-lg">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={26} />
              </div>
              <h4 className="text-xs uppercase tracking-widest text-pink-400 font-bold">Local do Workshop</h4>
              <p className="text-xl font-black text-white mt-1">Rytmos Academia Feminina – Vila Bocaina</p>
            </div>
          </section>

          {/* FORMULÁRIO DE INSCRIÇÃO */}
          <InscricaoForm />

          {/* FOOTER */}
          <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 text-center text-slate-500 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
              <p className="text-lg font-bold text-slate-300">Mundo Kids Fashion Experience 2026</p>
              <div className="flex items-center space-x-2 text-pink-400 font-semibold">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a href="https://instagram.com/kids_fashion_experience" target="_blank" rel="noreferrer" className="hover:underline">
                  @kids_fashion_experience
                </a>
              </div>
              <p className="text-xs text-slate-600 pt-4">Todos os direitos reservados.</p>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}