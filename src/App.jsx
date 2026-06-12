import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  // 1. DADOS: Logos com informações de aprendizado e aplicação
  const skillLogos = [
    { 
      name: 'React', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/react/react-original.svg',
      learned: 'SENAI / Projetos Pessoais',
      project: 'Interface do Caça Verbos',
      period: '2026'
    },
    { 
      name: 'Node.js', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/nodejs/nodejs-original.svg',
      learned: 'Estudos focados em Backend',
      project: 'Integração do motor de segurança Defend',
      period: '2026'
    },
    { 
      name: 'Rust', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/rust/rust-plain.svg',
      learned: 'Autodidata / Documentação',
      project: 'Motor de alta performance do Defend',
      period: '2026'
    },
    { 
      name: 'TypeScript', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/typescript/typescript-original.svg',
      learned: 'Estudos para tipagem segura',
      project: 'Projetos de Front-end',
      period: 'Atual'
    },
    { 
      name: 'JavaScript', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/javascript/javascript-original.svg',
      learned: 'Findes / SENAI',
      project: 'Reformulação do VixCursos',
      period: '2025'
    },
    { 
      name: 'PostgreSQL', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/postgresql/postgresql-original.svg',
      learned: 'Estácio (Análise e Desenvolvimento de Sistemas)',
      project: 'Banco de dados estruturado do Caça Verbos',
      period: '2026'
    },
    { 
      name: 'Linux', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/linux/linux-original.svg',
      learned: 'Migração de SO e Cibersegurança',
      project: 'Ambiente principal de desenvolvimento e testes de rede',
      period: 'Contínuo'
    },
    { 
      name: 'Git', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/git/git-original.svg',
      learned: 'Prática Diária / Versionamento',
      project: 'Todos os projetos no GitHub',
      period: 'Contínuo'
    },
    { 
      name: 'Docker', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/docker/docker-original.svg',
      learned: 'Estudos de Infraestrutura',
      project: 'Containerização de ambientes',
      period: 'Atual'
    },
    { 
      name: 'Python', 
      url: 'https://unpkg.com/devicon@2.14.0/icons/python/python-original.svg',
      learned: 'Conhecimentos básicos de automação',
      project: 'Scripts de teste simples',
      period: 'Ocasional'
    },
  ];

  const infiniteSkills = [...skillLogos, ...skillLogos];

  // 2. DADOS: Seus Serviços
  const services = [
    { title: 'Portfólio Profissional', price: 'R$ 450', description: 'Um site exclusivo, rápido e totalmente responsivo para destacar sua carreira.', icon: 'fa-solid fa-user-tie' },
    { title: 'Sites para Serviços', price: 'R$ 800', description: 'Landing pages de alta conversão e sites institucionais sob medida.', icon: 'fa-solid fa-laptop-code' },
    { title: 'Logomarcas', price: 'R$ 100', description: 'Criação de identidade visual moderna e profissional.', icon: 'fa-solid fa-pen-nib' }
  ];

  const [currentService, setCurrentService] = useState(0);
  
  // 3. ESTADO DO MODAL DE SKILLS
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Visitor name + modal/greeting state
  const [visitorName, setVisitorName] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showPreparing, setShowPreparing] = useState(false);
  const [showInitialSplash, setShowInitialSplash] = useState(true);

  const nextService = () => setCurrentService((prev) => (prev + 1) % services.length);
  const prevService = () => setCurrentService((prev) => (prev - 1 + services.length) % services.length);

  // On mount, check localStorage for visitor name
  useEffect(() => {
    try {
      const stored = localStorage.getItem('visitorName');
      if (stored) {
        // If we already know the name, skip name modal but show short greeting
        setVisitorName(stored);
        setShowInitialSplash(false);
        setShowGreeting(true);
        setTimeout(() => setShowGreeting(false), 2000);
      } else {
        // Show initial black splash first, then the name modal
        setShowInitialSplash(true);
        const t = setTimeout(() => {
          setShowInitialSplash(false);
          setShowNameModal(true);
        }, 1600);
        return () => clearTimeout(t);
      }
    } catch (e) {
      setShowInitialSplash(false);
      setShowNameModal(true);
    }
  }, []);

  return (
    <div className="app-container">
      {/* Initial black splash (shows 'Seja bem-vindo' first) */}
      {showInitialSplash && (
        <div className="initial-splash">
          <div className="initial-splash-box">
            <h1>Seja bem-vindo</h1>
          </div>
        </div>
      )}

      {/* Name input modal (first visit) */}
      {showNameModal && (
        <div className="name-modal-overlay">
          <form className="name-modal" onSubmit={(e) => {
            e.preventDefault();
            const val = nameInput.trim();
            if (!val) return;
            try { localStorage.setItem('visitorName', val); } catch (e) {}
            setVisitorName(val);
            setShowNameModal(false);
            // show preparing overlay briefly then greeting
            setShowPreparing(true);
            setTimeout(() => {
              setShowPreparing(false);
              setShowGreeting(true);
              setTimeout(() => setShowGreeting(false), 2200);
            }, 1400);
          }}>
            <h3>Olá! Qual é o seu nome?</h3>
            <input autoFocus type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Digite só o seu primeiro nome" />
            <div className="name-modal-actions">
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      )}

      {/* Greeting animation */}
      {showGreeting && visitorName && (
        <div className="greeting-overlay">
          <div className="greeting-box">
            <h2>Seja bem-vindo, {visitorName}!</h2>
          </div>
        </div>
      )}

      {showPreparing && (
        <div className="preparing-overlay">
          <div className="preparing-box">
            <h2>Estamos preparando o sistema para você...</h2>
          </div>
        </div>
      )}
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">GB.</h1>
        <ul className="nav-links">
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h2 className="greeting">Olá, eu sou</h2>
          {visitorName && <h4 className="welcome-small">Seja bem-vindo, {visitorName}!</h4>}
          <h1 className="name">Gustavo de Bruyn</h1>
          <h3 className="role">Desenvolvedor Full-Stack & Freelancer</h3>
          <p className="summary">
            Especialista em construir soluções completas, focando em arquiteturas seguras e de alta performance utilizando React, Node.js, SQL e Rust.
          </p>
          <a href="#servicos" className="btn-primary">Ver Serviços</a>
        </div>
      </header>

      {/* Sobre Mim */}
      <section id="sobre" className="section about">
        <h2 className="section-title">Sobre Mim</h2>
        <div className="about-content">
          <p>
            Sou estudante de Análise e Desenvolvimento de Sistemas e possuo formação técnica pelo SENAI. Iniciei minha trajetória como Jovem Aprendiz na Findes e desde então venho focando em criar soluções reais e eficientes.
          </p>
          <p>
            Sou da área de cibersegurança e ambientes Linux. Minha stack principal se baseia no ecossistema JavaScript/React/Node e em sistemas robustos com Rust.
          </p>
          
          <div className="skills-carousel">
            <div className="skills-track">
              {infiniteSkills.map((skill, index) => (
                <div 
                  className="skill-slide" 
                  key={index} 
                  onClick={() => setSelectedSkill(skill)} /* Abre o modal ao clicar */
                >
                  <img src={skill.url} alt={`Logo do ${skill.name}`} title={`Clique para ver detalhes de ${skill.name}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="section services-section">
        <h2 className="section-title">Serviços & Soluções</h2>
        <p className="section-subtitle">Invista no crescimento do seu negócio com soluções digitais profissionais.</p>
        
        <div className="services-carousel-container">
          <button className="carousel-btn prev" onClick={prevService} aria-label="Anterior">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="service-card-wrapper">
            <div className="service-card-premium">
              {visitorName && <p className="personal-note">Olá {visitorName}, veja abaixo como posso ajudar você.</p>}
              <div className="service-icon">
                <i className={services[currentService].icon}></i>
              </div>
              <h3>{services[currentService].title}</h3>
              <p className="service-desc">{services[currentService].description}</p>
              <div className="service-price-tag">
                <span className="price-label">A partir de</span>
                <span className="price-value">{services[currentService].price}</span>
              </div>
              <a href="#contato" className="btn-service-action">Solicitar Orçamento</a>
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextService} aria-label="Próximo">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="section projects">
        <h2 className="section-title">Projetos em Destaque</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-info">
              <h3>VixCursos</h3>
              <p>Reformulação do sistema para a Prefeitura de Vitória, visando otimizar a experiência do usuário e aumentar as inscrições em cursos gratuitos.</p>
              <div className="project-tech"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-info">
              <h3>Defend</h3>
              <p>Software de segurança de rede desenvolvido com um motor de alta performance para monitoramento seguro e interface em Node.</p>
              <div className="project-tech"><span>Rust</span><span>Node.js</span></div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-info">
              <h3>Caça Verbos</h3>
              <p>Software educacional interativo focado no aprendizado infantil, combinando banco de dados estruturado e interface dinâmica.</p>
              <div className="project-tech"><span>HTML</span><span>CSS</span><span>SQL</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer id="contato" className="footer">
        <div className="footer-content">
          <h2>Vamos Conversar?</h2>
          <p>Aberto a novas oportunidades e conexões profissionais em Serra e região.</p>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
          </div>
          <p className="copyright">© 2026 Gustavo de Bruyn. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* MODAL DE DETALHES DA SKILL */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedSkill(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="modal-header">
              <img src={selectedSkill.url} alt={selectedSkill.name} className="modal-skill-icon" />
              <h3>{selectedSkill.name}</h3>
            </div>
            <div className="modal-details">
              <p><strong><i className="fa-solid fa-graduation-cap"></i> Onde aprendi:</strong> {selectedSkill.learned}</p>
              <p><strong><i className="fa-solid fa-code"></i> Onde apliquei:</strong> {selectedSkill.project}</p>
              <p><strong><i className="fa-regular fa-calendar"></i> Quando:</strong> {selectedSkill.period}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}