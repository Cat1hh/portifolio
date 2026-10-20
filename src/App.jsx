import './App.css';

const contactEmail = 'd3bruyn@gmail.com';
const whatsappNumber = '5527998281915';
const icon = (path) => `https://unpkg.com/devicon@2.14.0/icons/${path}.svg`;

const languages = [
  { name: 'JavaScript', logo: icon('javascript/javascript-original'), use: 'Reformulação do VixCursos', status: 'Experiência prática' },
  { name: 'TypeScript', logo: icon('typescript/typescript-original'), use: 'Projetos de front-end', status: 'Em estudo' },
  { name: 'Rust', logo: icon('rust/rust-plain'), use: 'Motor de alta performance do DefendES', status: 'Autodidata' },
  { name: 'SQL', logo: icon('postgresql/postgresql-original'), use: 'Banco de dados do Caça Verbos (PostgreSQL)', status: 'Formação na Estácio' },
  { name: 'Python', logo: icon('python/python-original'), use: 'Scripts de automação e testes', status: 'Uso ocasional' },
];

const services = [
  { title: 'Portfólio profissional', price: 'R$ 450', description: 'Site rápido e responsivo para destacar sua carreira.' },
  { title: 'Sites para serviços', price: 'R$ 800', description: 'Landing pages e sites institucionais sob medida.' },
  { title: 'Logomarcas', price: 'R$ 100', description: 'Identidade visual moderna e profissional.' },
];

const projects = [
  { title: 'VixCursos', description: 'Reformulação do sistema de cursos da Prefeitura de Vitória, para melhorar a experiência do usuário e aumentar as inscrições.', tech: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'DefendES', description: 'Software de segurança de rede com motor de alta performance para monitoramento.', tech: ['Rust', 'Node.js', 'Linux'] },
  { title: 'Caça Verbos', description: 'Software educacional interativo para o aprendizado infantil, com banco de dados estruturado e interface dinâmica.', tech: ['React', 'CSS', 'SQL'] },
];

const budgetLink = (title) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento para: ${title}.`)}`;

export default function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top">Gustavo de Bruyn</a>
        <nav aria-label="Principal">
          <a href="#linguagens">Linguagens</a>
          <a href="#projetos">Projetos</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="status">Disponível para novos projetos</p>
          <h1>Gustavo de Bruyn</h1>
          <p className="role">Desenvolvedor full-stack e segurança da informação</p>
          <p className="summary">
            Analista e desenvolvedor de sistemas. Construo soluções completas com foco em segurança e performance,
            usando React, Node.js, SQL e Rust. Atuo em ambientes Linux e em cibersegurança.
          </p>
          <div className="actions">
            <a className="btn primary" href="#projetos">Ver projetos</a>
            <a className="btn" href={budgetLink('um projeto')} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
          </div>
        </section>

        <section id="linguagens" className="section">
          <h2>Linguagens que uso</h2>
          <ul className="lang-list">
            {languages.map((l) => (
              <li key={l.name} className="lang-row">
                <span className="lang-logo"><img src={l.logo} alt="" width="28" height="28" /></span>
                <strong className="lang-name">{l.name}</strong>
                <span className="lang-use">{l.use}</span>
                <span className="lang-status">{l.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="projetos" className="section">
          <h2>Projetos</h2>
          <div className="grid">
            {projects.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul className="tags">
                  {p.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="servicos" className="section">
          <h2>Serviços</h2>
          <div className="grid">
            {services.map((s) => (
              <article key={s.title} className="card">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p className="price">A partir de <strong>{s.price}</strong></p>
                <a className="btn primary" href={budgetLink(s.title)} target="_blank" rel="noopener noreferrer">Pedir orçamento</a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contato" className="footer">
        <h2>Vamos construir algo juntos?</h2>
        <p>Disponível de segunda a sexta, em Serra e região ou remoto.</p>
        <div className="links">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href="https://www.linkedin.com/in/gustavo-de-bruyn-73155330a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Cat1hh" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.instagram.com/d3_bruyn/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <small>© 2026 Gustavo de Bruyn</small>
      </footer>
    </>
  );
}
