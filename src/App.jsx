import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import logoImg from './assets/logo-ee.png';
import './App.css';

// ----------------------------------------------------------------------
// Composant pour le carrousel de chaque projet (Album Photo)
// ----------------------------------------------------------------------
function ProjectCard({ proj, onZoom, t }) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="demo-item-detailed reveal">
      {/* Conteneur d'image cliquable (passe les infos au zoom) */}
      <div 
        className="carousel-container" 
        onClick={() => onZoom({ images: proj.images, currentIndex: imgIndex })}
        title={t('demos.zoom_hint')}
      >
        <img 
          src={proj.images[imgIndex]} 
          alt={t(`demos.${proj.key}_title`)}
          className="carousel-image" 
        />
        
        <span className="demo-image-label">
          {imgIndex === 0 ? t('demos.tab_home') : t('demos.tab_prices')}
        </span>
        
        <div 
          className="carousel-dots" 
          onClick={(e) => e.stopPropagation()} 
        >
          {proj.images.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === imgIndex ? 'active' : ''}`}
              onClick={() => setImgIndex(idx)}
              aria-label={`Voir l'image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="demo-text-content">
        <span className="demo-tagline">{t(`demos.${proj.key}_tagline`)}</span>
        <h3>{t(`demos.${proj.key}_title`)}</h3>
        <p>{t(`demos.${proj.key}_desc`)}</p>
        <p className="zoom-hint-text">{t('demos.zoom_hint')}</p>

        <div className="demo-info-section">
          <div className="info-row">
            <span className="info-label">{t('demos.info_type_label')}</span>
            <span className="info-value">{t(`demos.${proj.key}_info_type`)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('demos.info_goal_label')}</span>
            <span className="info-value">{t(`demos.${proj.key}_info_goal`)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ----------------------------------------------------------------------
// Application Principale
// ----------------------------------------------------------------------
function App() {
  const { t, i18n } = useTranslation();
  
  const [modalType, setModalType] = useState(null);
  const [zoomedData, setZoomedData] = useState(null); // Gère l'image et la galerie en plein écran

  // Bloque le scroll d'arrière-plan quand une modale est ouverte
  useEffect(() => {
    if (modalType || zoomedData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalType, zoomedData]);

  // NOUVEAU : Observer pour les animations au défilement (Scroll Reveal)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.15 }); // Déclenche quand 15% de l'élément est visible

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  const [formData, setFormData] = useState({
    nom: '', email: '', message: ''
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
          alert(t('contact.alert_success'));
          setFormData({ nom: '', email: '', message: '' }); 
      }, (error) => {
          console.log('Erreur:', error.text);
          alert(t('contact.alert_error'));
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
    { 
      key: 'item1',
      images: [
        '/images/coiffeur/Accueil-barber.png',
        '/images/coiffeur/prix-barber.png'   
      ]
    },
    { 
      key: 'item2',
      images: [
        '/images/resto/accueil-resto.png',
        '/images/resto/prix-resto.png'         
      ]
    },
    { 
      key: 'item3',
      images: [
        '/images/Pattes & Co/accueil-chien.png',
        '/images/Pattes & Co/prix-chien.png'     
      ]
    }
  ];

  const heroBg = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80';
  
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logoImg} alt="Logo Agence Edson" className="navbar-logo" />
            Agence Edson
          </div>
          {/* NOUVEAU MENU COMPLET ET ALIGNÉ */}
          <nav className="nav-links">
            <a href="#accueil">{t('nav.home')}</a>
            <a href="#competences">{t('nav.skills')}</a>
            <a href="#approche">{t('approche.title')}</a> 
            <a href="#about">{t('nav.about')}</a> 
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
          <h1 className="reveal">{t('hero.title')}</h1>
          <p className="reveal">{t('hero.desc')}</p>
          <a href="#portfolio" className="btn-primary reveal">{t('hero.btn')}</a>
        </div>
      </section>

      <section id="competences" className="competences-section">
        <div className="container">
          <h2 className="section-title reveal">{t('skills.title')}</h2>
          <p className="section-subtitle reveal">{t('skills.subtitle')}</p>
          <div className="competences-grid">
            {competences.map((comp, index) => (
              <div key={index} className="competence-card reveal">
                <h3>{comp.title}</h3>
                <p>{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="approche" className="approche-section">
        <div className="container">
          <h2 className="section-title reveal">{t('approche.title')}</h2>
          <p className="section-subtitle reveal">{t('approche.subtitle')}</p>
          <div className="approche-grid">
            <div className="approche-card reveal">
              <h3>{t('approche.val1Title')}</h3>
              <p>{t('approche.val1Desc')}</p>
            </div>
            <div className="approche-card reveal">
              <h3>{t('approche.val2Title')}</h3>
              <p>{t('approche.val2Desc')}</p>
            </div>
            <div className="approche-card reveal">
              <h3>{t('approche.val3Title')}</h3>
              <p>{t('approche.val3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title reveal">{t('about.title')}</h2>
          <p className="section-subtitle reveal">{t('about.subtitle')}</p>
          <div className="about-content reveal">
            <p className="about-text">{t('about.desc')}</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2 className="section-title reveal">{t('nav.demos')}</h2> 
          <p className="section-subtitle reveal">Découvrez comment nous transformons des concepts en outils business concrets.</p>
          
          <div className="demos-detailed-list">
            {realisations.map((proj, index) => (
              <ProjectCard 
                key={index} 
                proj={proj} 
                onZoom={setZoomedData}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title reveal">{t('contact.title')}</h2>
          <div className="contact-content reveal">
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
              <a href="#approche">{t('approche.title')}</a> 
              <a href="#about">{t('nav.about')}</a> 
            </div>
            <div>
              <h4>{t('footer.legal')}</h4>
              <button onClick={() => setModalType('legal')} className="footer-link-btn">{t('footer.mentions')}</button>
              <button onClick={() => setModalType('privacy')} className="footer-link-btn">{t('footer.privacy')}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* LA FENÊTRE MODALE LÉGALE / CONFIDENTIALITÉ */}
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

      {/* NOUVELLE MODALE POUR LE ZOOM D'IMAGE (AVEC FLÈCHES) */}
      {zoomedData && (
        <div className="modal-overlay" onClick={() => setZoomedData(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setZoomedData(null)}>&times;</button>
            
            {/* Flèche Précédent */}
            <button 
              className="modal-slider-btn prev"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = zoomedData.currentIndex === 0 ? zoomedData.images.length - 1 : zoomedData.currentIndex - 1;
                setZoomedData({ ...zoomedData, currentIndex: newIndex });
              }}
            >
              &#10094;
            </button>

            <img src={zoomedData.images[zoomedData.currentIndex]} alt="Aperçu du projet zoomé" className="zoomed-image-full" />
            
            {/* Flèche Suivant */}
            <button 
              className="modal-slider-btn next"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = zoomedData.currentIndex === zoomedData.images.length - 1 ? 0 : zoomedData.currentIndex + 1;
                setZoomedData({ ...zoomedData, currentIndex: newIndex });
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;