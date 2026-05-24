import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import logoImg from './assets/logo-ee.png';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  
  // État pour la fenêtre modale
  const [modalType, setModalType] = useState(null); // 'legal' ou 'privacy' ou null

  const [formData, setFormData] = useState({
    nom: '', email: '', sujet: '', message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then((result) => {
          console.log('Succès:', result.text);
          alert('Message envoyé avec succès !');
          setFormData({ nom: '', email: '', sujet: '', message: '' }); 
      }, (error) => {
          console.log('Erreur:', error.text);
          alert('Une erreur est survenue. Veuillez réessayer.');
      });
  };

  const changeLanguage = () => {
    const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const competences = [
    { title: t('skills.design'), desc: t('skills.designDesc') },
    { title: t('skills.responsive'), desc: t('skills.responsiveDesc') },
    { title: t('skills.seo'), desc: t('skills.seoDesc') }
  ];

  const realisations = [
    { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', title: 'Plateforme E-commerce', desc: 'Boutique en ligne complète avec système de paiement sécurisé.', tags: ['React', 'Node.js', 'Stripe', 'MongoDB'] },
    { image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', title: 'Application SaaS', desc: 'Solution cloud pour la gestion de projets avec collaboration en temps réel.', tags: ['Vue.js', 'Firebase', 'TailwindCSS', 'WebSocket'] }
  ];

  const heroBg = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80';
  return (
    <div className={`app-container ${modalType ? 'modal-active' : ''}`}>
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logoImg} alt="Logo Agence Edson" className="navbar-logo" />
            Agence Edson
          </div>
          <nav className="nav-links">
            <a href="#accueil">{t('nav.home')}</a>
            <a href="#competences">{t('nav.skills')}</a>
            <a href="#about">{t('about.title')}</a> {/* AJOUT NAVBAR */}
            <a href="#portfolio">{t('nav.demos')}</a>
            <a href="#contact">{t('nav.contact')}</a>
            <button onClick={changeLanguage} className={`lang-btn ${i18n.language.startsWith('fr') ? 'fr-flag' : 'en-flag'}`}>
              {i18n.language.startsWith('fr') ? 'FR' : 'EN'}
            </button>
          </nav>
        </div>
      </header>

      <section id="accueil" className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.desc')}</p>
          <a href="#portfolio" className="btn-primary">{t('hero.btn')}</a>
        </div>
      </section>

      <section id="competences" className="competences-section">
        <div className="container">
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-subtitle">{t('skills.subtitle')}</p>
          <div className="competences-grid">
            {competences.map((comp, index) => (
              <div key={index} className="competence-card">
                <h3>{comp.title}</h3>
                <p>{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="approche" className="approche-section">
        <div className="container">
          <h2 className="section-title">{t('approche.title')}</h2>
          <p className="section-subtitle">{t('approche.subtitle')}</p>
          <div className="approche-grid">
            <div className="approche-card">
              <h3>{t('approche.val1Title')}</h3>
              <p>{t('approche.val1Desc')}</p>
            </div>
            <div className="approche-card">
              <h3>{t('approche.val2Title')}</h3>
              <p>{t('approche.val2Desc')}</p>
            </div>
            <div className="approche-card">
              <h3>{t('approche.val3Title')}</h3>
              <p>{t('approche.val3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION À PROPOS ICI */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
          <div className="about-content">
            <p className="about-text">{t('about.desc')}</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2 className="section-title">{t('nav.demos')}</h2>
          <div className="portfolio-grid">
            {realisations.map((proj, index) => (
              <div key={index} className="project-card">
                <img src={proj.image} alt={proj.title} className="project-image" />
                <div className="project-details">
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <div className="tech-tags">{proj.tags.map((tag, i) => <span key={i} className="tech-tag">{tag}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t('contact.name')}</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} placeholder={t('contact.namePlaceholder')} required />
              </div>
              <div className="form-group">
                <label>{t('contact.email')}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('contact.emailPlaceholder')} required />
              </div>
              <div className="form-group">
                <label>{t('contact.message')}</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact.messagePlaceholder')} rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-submit">{t('contact.send')}</button>
            </form>
            <div className="contact-info">
              <h3>{t('contact.info')}</h3>
              <p>agenceedson@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-left">
            <div className="logo">
              <img src={logoImg} alt="Logo Agence Edson" className="navbar-logo"/>
              Agence Edson
            </div>
            <p>{t('footer.desc')}</p>
          </div>
          <div className="footer-right">
            <div>
              <h4>{t('footer.nav')}</h4>
              <a href="#accueil">{t('nav.home')}</a>
              <a href="#competences">{t('nav.skills')}</a>
              <a href="#about">{t('about.title')}</a> {/* AJOUT FOOTER */}
            </div>
            <div>
              <h4>{t('footer.legal')}</h4>
              <button onClick={() => setModalType('legal')} className="footer-link-btn">{t('footer.mentions')}</button>
              <button onClick={() => setModalType('privacy')} className="footer-link-btn">{t('footer.privacy')}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* LA FENÊTRE MODALE */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalType(null)}>&times;</button>
            
            {modalType === 'legal' ? (
              <div className="modal-body">
                <h2>{t('legalNotice.title')}</h2>
                <p>{t('legalNotice.editor')}</p>
                <p>{t('legalNotice.email')}</p>
                <p>{t('legalNotice.host')}</p>
                <p>{t('legalNotice.copyright')}</p>
              </div>
            ) : (
              <div className="modal-body">
                <h2>{t('privacy.title')}</h2>
                <p>{t('privacy.dataCollected')}</p>
                <p>{t('privacy.purpose')}</p>
                <p>{t('privacy.rights')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;