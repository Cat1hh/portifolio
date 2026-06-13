import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const contactEmail = 'd3bruyn@gmail.com';
  const whatsappNumber = '5527998281915';

  // 1. DADOS: Logos
  const skillLogos = [
    { name: 'React', url: 'https://unpkg.com/devicon@2.14.0/icons/react/react-original.svg', learned: 'Projetos Pessoais', project: 'Interface do Caça Verbos', period: '2026' },
    { name: 'Node.js', url: 'https://unpkg.com/devicon@2.14.0/icons/nodejs/nodejs-original.svg', learned: 'Estudos focados em Backend', project: 'Integração do motor de segurança Defend', period: '2026' },
    { name: 'Rust', url: 'https://unpkg.com/devicon@2.14.0/icons/rust/rust-plain.svg', learned: 'Autodidata / Documentação', project: 'Motor de alta performance do DefendES', period: '2026' },
    { name: 'TypeScript', url: 'https://unpkg.com/devicon@2.14.0/icons/typescript/typescript-original.svg', learned: 'Estudos para tipagem segura', project: 'Projetos de Front-end', period: 'Atual' },
    { name: 'JavaScript', url: 'https://unpkg.com/devicon@2.14.0/icons/javascript/javascript-original.svg', learned: 'Experiência Prática', project: 'Reformulação do VixCursos', period: '2025' },
    { name: 'PostgreSQL', url: 'https://unpkg.com/devicon@2.14.0/icons/postgresql/postgresql-original.svg', learned: 'Estácio (ADS)', project: 'Banco de dados estruturado do Caça Verbos', period: '2026' },
    { name: 'Linux', url: 'https://unpkg.com/devicon@2.14.0/icons/linux/linux-original.svg', learned: 'Migração de SO e Cibersegurança', project: 'Ambiente principal de desenvolvimento e testes', period: 'Contínuo' },
    { name: 'Git', url: 'https://unpkg.com/devicon@2.14.0/icons/git/git-original.svg', learned: 'Prática Diária / Versionamento', project: 'Todos os projetos no GitHub', period: 'Contínuo' },
    { name: 'Docker', url: 'https://unpkg.com/devicon@2.14.0/icons/docker/docker-original.svg', learned: 'Estudos de Infraestrutura', project: 'Containerização de ambientes', period: 'Atual' },
    { name: 'Python', url: 'https://unpkg.com/devicon@2.14.0/icons/python/python-original.svg', learned: 'Automação', project: 'Scripts de teste simples', period: 'Ocasional' },
  ];

  const infiniteSkills = [...skillLogos, ...skillLogos];

  // 2. DADOS: Serviços e Projetos
  const services = [
    { title: 'Portfólio Profissional', price: 'R$ 450', description: 'Um site exclusivo, rápido e totalmente responsivo para destacar sua carreira.', icon: 'fa-solid fa-user-tie' },
    { title: 'Sites para Serviços', price: 'R$ 800', description: 'Landing pages de alta conversão e sites institucionais sob medida.', icon: 'fa-solid fa-laptop-code' },
    { title: 'Logomarcas', price: 'R$ 100', description: 'Criação de identidade visual moderna e profissional.', icon: 'fa-solid fa-pen-nib' }
  ];

  const projects = [
    { title: 'VixCursos', description: 'Reformulação do sistema para a Prefeitura de Vitória, visando otimizar a experiência do usuário e aumentar inscrições.', tech: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'DefendES', description: 'Software de segurança de rede desenvolvido com um motor de alta performance para monitoramento seguro.', tech: ['Rust', 'Node.js', 'Linux'] },
    { title: 'Caça Verbos', description: 'Software educacional interativo focado no aprendizado infantil, combinando banco de dados estruturado e interface dinâmica.', tech: ['React', 'CSS', 'SQL'] }
  ];

  const [currentService, setCurrentService] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // Controle de Telas Iniciais Pretas
  // 0 = App Principal, 1 = "Bem vindo", 2 = "Qual é seu nome", 3 = "Preparando tudo"
  const [introStage, setIntroStage] = useState(1);
  const [visitorName, setVisitorName] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Controle de Certificados
  const [showCertModal, setShowCertModal] = useState(false);

  // Controle do Chatbot DD7
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'DD7', text: 'Woof! Au au! 🐾 Sou o DD7, o mascote e assistente virtual do Gustavo!' },
    { sender: 'DD7', text: 'Digite um número para saber mais:\n\n1 - Tempo na área do Gustavo\n2 - Ver Certificados\n3 - Linguagens de Programação' }
  ]);

  const nextService = () => setCurrentService((prev) => (prev + 1) % services.length);
  const prevService = () => setCurrentService((prev) => (prev - 1 + services.length) % services.length);
  
  const handleBudgetClick = (service) => {
    const clientName = visitorName || 'Visitante';
    const whatsappMessage = `Olá! Me chamo ${clientName} e gostaria de um orçamento para: ${service.title}.`;
    const emailSubject = `Novo clique em Orçamento - ${service.title}`;
    const emailBody = `Serviço: ${service.title}\nNome: ${clientName}\nPreço base: ${service.price}\n\nMensagem: ${whatsappMessage}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
    window.open(`mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const input = chatInput.trim();
    if (!input) return;
    
    const newMessages = [...chatMessages, { sender: 'user', text: input }];
    setChatMessages(newMessages);
    setChatInput('');

    setTimeout(() => {
      let botResponse = '';

      if (input === '1') {
        botResponse = 'Au au! 🐾 O Gustavo atua como desenvolvedor Junior e freelancer, criando soluções eficientes e com código de qualidade!';
      } else if (input === '2') {
        botResponse = 'Buscando arquivos... 🏆 Pronto! Acabei de abrir a galeria de certificados na sua tela!';
        setShowCertModal(true);
      } else if (input === '3') {
        botResponse = 'O Gustavo manda muito bem em: React, Node.js, JavaScript, Rust, SQL e domina o Linux! 💻\n\n(E um segredo: ele passa longe de C# e Next.js, mas curte um pouco de Python!)';
      } else {
        botResponse = '*Inclina a cabeça* 🐶 Desculpe, não entendi! Digite apenas 1, 2 ou 3 para escolher uma das opções.';
      }

      setChatMessages((prev) => [...prev, { sender: 'DD7', text: botResponse }]);
    }, 800);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const val = nameInput.trim();
    if (!val) return;
    try { localStorage.setItem('visitorName', val); } catch (e) {}
    setVisitorName(val);
    setIntroStage(3); // Vai para tela de "Preparando"
    setTimeout(() => {
      setIntroStage(0); // Abre o App
    }, 3000); // 3 segundos carregando
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('visitorName');
      if (stored) {
        setVisitorName(stored);
        setIntroStage(3);
        setTimeout(() => setIntroStage(0), 2500);
      } else {
        setIntroStage(1);
        setTimeout(() => setIntroStage(2), 2000); // Fica 2s na tela de "Bem vindo"
      }
    } catch (e) {
      setIntroStage(1);
      setTimeout(() => setIntroStage(2), 2000);
    }
  }, []);

  return (
    <div className="app-container">
      {/* =========================================
          TELAS INICIAIS PRETAS
          ========================================= */}
      {introStage === 1 && (
        <div className="black-intro-screen">
          <h1 className="intro-title">Bem vindo</h1>
        </div>
      )}

      {introStage === 2 && (
        <div className="black-intro-screen">
          <form className="intro-form" onSubmit={handleNameSubmit}>
            <h2 className="intro-subtitle">Qual é o seu nome?</h2>
            <input 
              autoFocus 
              type="text" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)} 
              placeholder="Digite seu nome..." 
            />
          </form>
        </div>
      )}

      {introStage === 3 && (
        <div className="black-intro-screen">
          <h2 className="intro-subtitle">Seja bem vindo, <span className="highlight-name">{visitorName}</span></h2>
          <p className="intro-text">Estamos preparando tudo para você, aguarde...</p>
          <div className="loader-ring small intro-loader"></div>
        </div>
      )}

      {/* Conteúdo Principal (Só aparece quando introStage é 0) */}
      {introStage === 0 && (
        <>
          {/* Navbar */}
          <nav className="navbar">
            <h1 className="logo">GB<span className="dot">.</span></h1>
            <ul className="nav-links">
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#contato" className="nav-cta">Contato</a></li>
            </ul>
          </nav>

          {/* Hero Section */}
          <header className="hero">
            <div className="hero-content">
              <div className="hero-text-area">
                <span className="badge">Disponível para novos projetos</span>
                <h2 className="greeting">Olá, eu sou</h2>
                <h1 className="name">Gustavo <span>de Bruyn</span></h1>
                <h3 className="role">Desenvolvedor Full-Stack & Seg. da Informação</h3>
                <p className="summary">
                  Especialista em construir soluções completas, focando em arquiteturas seguras e de alta performance utilizando <strong>React, Node.js, SQL e Rust</strong>.
                </p>
                <div className="hero-buttons">
                  <a href="#projetos" className="btn-primary">Ver Projetos</a>
                  <a href="#contato" className="btn-secondary">Falar no WhatsApp</a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="glow-circle"></div>
                <div className="profile-placeholder">
                  <i className="fa-solid fa-user-astronaut"></i>
                </div>
              </div>
            </div>
          </header>

          {/* Sobre Mim */}
          <section id="sobre" className="section about">
            <div className="section-header">
              <h2 className="section-title">Sobre Mim</h2>
              <div className="divider"></div>
            </div>
            <div className="about-content glass-panel">
              <p>
                Sou um Profissional de Análise e Desenvolvimento de Sistemas. Iniciei minha trajetória de forma prática e desde então venho focando em criar soluções reais e eficientes.
              </p>
              <p>
                Tenho forte atuação na área de <strong>cibersegurança e ambientes Linux</strong>. Minha stack principal se baseia no ecossistema JavaScript/React/Node e na criação de sistemas robustos com Rust.
              </p>
            </div>
            
            <div className="skills-carousel">
              <div className="skills-track">
                {infiniteSkills.map((skill, index) => (
                  <div className="skill-slide" key={index} onClick={() => setSelectedSkill(skill)}>
                    <div className="skill-icon-wrapper">
                      <img src={skill.url} alt={skill.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Serviços */}
          <section id="servicos" className="section services-section">
            <div className="section-header center">
              <h2 className="section-title">Serviços & Soluções</h2>
              <p className="section-subtitle">Soluções digitais profissionais sob medida para o seu objetivo.</p>
            </div>
            
            <div className="services-carousel-container">
              <button className="carousel-btn" onClick={prevService} aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>

              <div className="service-card-wrapper">
                <div className="service-card-premium glass-panel" key={currentService}>
                  <div className="service-card-header">
                    <span className="service-badge">Pacote {String(currentService + 1).padStart(2, '0')}</span>
                    <div className="service-icon"><i className={services[currentService].icon}></i></div>
                  </div>
                  <div className="service-card-body">
                    {visitorName && <p className="personal-note">Olá <strong>{visitorName}</strong>, veja como posso ajudar:</p>}
                    <h3>{services[currentService].title}</h3>
                    <p className="service-desc">{services[currentService].description}</p>
                  </div>
                  <div className="service-card-footer">
                    <div className="service-price-tag">
                      <span className="price-label">A partir de</span>
                      <span className="price-value">{services[currentService].price}</span>
                    </div>
                    <button type="button" className="btn-primary" onClick={() => handleBudgetClick(services[currentService])}>
                      <i className="fa-brands fa-whatsapp"></i> Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>

              <button className="carousel-btn" onClick={nextService} aria-label="Próximo"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </section>

          {/* Projetos */}
          <section id="projetos" className="section projects">
            <div className="section-header">
              <h2 className="section-title">Projetos em Destaque</h2>
              <div className="divider"></div>
            </div>
            <div className="projects-grid">
              {projects.map((proj, idx) => (
                <div className="project-card glass-panel" key={idx}>
                  <div className="project-content">
                    <h3><i className="fa-solid fa-folder-open folder-icon"></i> {proj.title}</h3>
                    <p>{proj.description}</p>
                    <div className="project-tech">
                      {proj.tech.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
                    </div>
                  </div>
                  <div className="project-overlay-btn">
                    <button className="btn-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Rodapé */}
          <footer id="contato" className="footer">
            <div className="footer-content glass-panel">
              <h2>Vamos construir algo juntos?</h2>
              <p>Disponível de Segunda a Sexta para novos desafios em Serra e região.</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/gustavo-de-bruyn-73155330a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/Cat1hh" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.instagram.com/d3_bruyn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              </div>
              <p className="copyright">© 2026 Gustavo de Bruyn. Todos os direitos reservados.</p>
            </div>
          </footer>

          {/* Modais */}
          {selectedSkill && (
            <div className="modal-overlay blur-bg" onClick={() => setSelectedSkill(null)}>
              <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setSelectedSkill(null)}><i className="fa-solid fa-xmark"></i></button>
                <div className="modal-header">
                  <div className="modal-skill-icon"><img src={selectedSkill.url} alt={selectedSkill.name} /></div>
                  <h3>{selectedSkill.name}</h3>
                </div>
                <div className="modal-details">
                  <div className="detail-item">
                    <div className="detail-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                    <div><span className="detail-label">Onde aprendi</span><p>{selectedSkill.learned}</p></div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon"><i className="fa-solid fa-code"></i></div>
                    <div><span className="detail-label">Onde apliquei</span><p>{selectedSkill.project}</p></div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon"><i className="fa-regular fa-calendar"></i></div>
                    <div><span className="detail-label">Período</span><p>{selectedSkill.period}</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCertModal && (
            <div className="modal-overlay blur-bg" onClick={() => setShowCertModal(false)}>
              <div className="modal-content glass-panel certificates-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setShowCertModal(false)}><i className="fa-solid fa-xmark"></i></button>
                <div className="modal-header">
                  <div className="modal-skill-icon" style={{background: 'var(--primary)', color: '#000'}}>
                    <i className="fa-solid fa-award"></i>
                  </div>
                  <h3>Meus Certificados</h3>
                </div>
                <div className="certificates-grid">
                  <div className="cert-card">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <h4>Formação Técnica</h4>
                    <p>Concluída</p>
                  </div>
                  <div className="cert-card">
                    <i className="fa-solid fa-laptop-code"></i>
                    <h4>Análise e Dev. de Sistemas</h4>
                    <p>Estácio</p>
                  </div>
                  <div className="cert-card">
                    <i className="fa-solid fa-shield-halved"></i>
                    <h4>Cibersegurança e Redes</h4>
                    <p>Cursos Livres</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chatbot DD7 */}
          <div className="dd7-chatbot-container">
            {isChatOpen && (
              <div className="dd7-chat-window glass-panel">
                <div className="dd7-chat-header">
                  <div className="dd7-avatar"><i className="fa-solid fa-dog"></i></div>
                  <div className="dd7-header-info">
                    <h4>DD7</h4>
                    <span>Assistente Virtual</span>
                  </div>
                  <button className="dd7-close-btn" onClick={() => setIsChatOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="dd7-chat-body">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`dd7-message ${msg.sender}`}><p>{msg.text}</p></div>
                  ))}
                </div>
                <form className="dd7-chat-footer" onSubmit={handleSendMessage}>
                  <input type="text" placeholder="Digite 1, 2 ou 3..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                  <button type="submit" aria-label="Enviar mensagem"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
              </div>
            )}
            <button className={`dd7-floating-btn ${isChatOpen ? 'active' : ''}`} onClick={() => setIsChatOpen(!isChatOpen)} aria-label="Abrir chat do DD7">
              <i className="fa-solid fa-dog"></i>
              {!isChatOpen && <span className="dd7-tooltip">Au au! Fale comigo!</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}