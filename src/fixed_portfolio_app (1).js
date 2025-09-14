import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const navigateTo = (section) => {
    setCurrentSection(section);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'work': return <WorkSection navigateTo={navigateTo} />;
      case 'about': return <AboutSection />;
      case 'contact': return <ContactSection />;
      default: return <HomeSection navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
        
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-brand" onClick={() => navigateTo('home')}>
              <span className="brand-text">Tanuja</span>
              <span className="brand-dot"></span>
            </div>
            
            <div className="nav-menu">
              {['home', 'work', 'about', 'contact'].map((item, index) => (
                <button 
                  key={item}
                  className={`nav-link ${currentSection === item ? 'active' : ''}`}
                  onClick={() => navigateTo(item)}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <span className="nav-number">0{index + 1}</span>
                  <span className="nav-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                </button>
              ))}
            </div>

            <div className="nav-mobile">
              <button className="mobile-toggle" onClick={toggleMenu}>
                <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Floating Menu Button */}
        <div className={`floating-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="floating-btn" onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d={isMenuOpen ? "M6 6L18 18M6 18L18 6" : "M3 12H21M3 6H21M3 18H21"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu Overlay */}
        <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h2>Navigation</h2>
              <span className="menu-subtitle">Where would you like to go?</span>
            </div>
            <div className="menu-items">
              {['home', 'work', 'about', 'contact'].map((item, index) => (
                <button 
                  key={item}
                  className="menu-item"
                  onClick={() => navigateTo(item)}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <span className="item-number">0{index + 1}</span>
                  <span className="item-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  <svg className="item-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-brand">
                <span>Tanuja</span>
                <span className="footer-year">© 2025</span>
              </div>
              <div className="footer-links">
                <button onClick={() => navigateTo('about')}>Privacy</button>
                <button onClick={() => navigateTo('contact')}>Terms</button>
                <a href="mailto:tanuja.dev@example.com">Email</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const HomeSection = ({ navigateTo }) => (
  <section className="hero">
    <div className="hero-background">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
    </div>
    <div className="container">
      <div className="hero-content">
        <div className="hero-badge" data-aos="fade-up">
          <span className="badge-dot"></span>
          Available for new projects
        </div>
        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
          <span className="title-line">Full Stack</span>
          <span className="title-line highlight">Developer</span>
          <span className="title-line">& Problem Solver</span>
        </h1>
        <div className="hero-meta" data-aos="fade-up" data-aos-delay="200">
          <span className="meta-name">Tanuja</span>
          <span className="meta-divider"></span>
          <span className="meta-location">Based in India</span>
        </div>
        <p className="hero-description" data-aos="fade-up" data-aos-delay="300">
          I craft scalable web applications using modern technologies. 
          Passionate about creating efficient solutions that bridge the gap 
          between frontend aesthetics and backend functionality.
        </p>
        <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-primary" onClick={() => navigateTo('work')}>
            <span>View My Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo('contact')}>
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
      <div className="hero-scroll" data-aos="fade-up" data-aos-delay="500">
        <span>Scroll to explore</span>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      </div>
    </div>
  </section>
);

const WorkSection = ({ navigateTo }) => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Full Stack Development",
      year: "2024",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      description: "Complete online store with payment integration, inventory management, and admin dashboard",
      image: "01"
    },
    {
      title: "Task Management App",
      category: "MERN Stack",
      year: "2024", 
      tech: ["React", "Express", "MongoDB", "Socket.io"],
      description: "Collaborative project management tool with real-time updates and team collaboration features",
      image: "02"
    },
    {
      title: "Social Media Dashboard",
      category: "Frontend + API",
      year: "2024",
      tech: ["Next.js", "REST APIs", "Chart.js"],
      description: "Analytics dashboard for social media management with data visualization and reporting",
      image: "03"
    },
    {
      title: "Weather Application",
      category: "React Application",
      year: "2023",
      tech: ["React", "Weather API", "PWA"],
      description: "Real-time weather forecasting with location services and offline capabilities",
      image: "04"
    },
    {
      title: "Portfolio Website",
      category: "Frontend Development", 
      year: "2023",
      tech: ["React", "CSS3", "Responsive"],
      description: "Modern portfolio showcasing responsive design principles and smooth animations",
      image: "05"
    },
    {
      title: "Blog CMS Platform",
      category: "Full Stack",
      year: "2023",
      tech: ["Node.js", "MySQL", "React", "AWS"],
      description: "Content management system with user authentication, rich text editor, and cloud storage",
      image: "06"
    }
  ];

  return (
    <section className="work">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-number">02</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of full-stack applications built with modern technologies and best practices
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="project-image">
                <div className="project-number">{project.image}</div>
                <div className="project-overlay">
                  <button className="project-link">
                    <span>View Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="work-cta" data-aos="fade-up">
          <button className="btn btn-outline" onClick={() => navigateTo('contact')}>
            <span>Interested in working together?</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const skills = {
    Frontend: ["React", "JavaScript", "TypeScript", "Next.js", "CSS3", "HTML5"],
    Backend: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"],
    Database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    Tools: ["Git", "Docker", "AWS", "Figma", "Postman"]
  };

  return (
    <section className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-header" data-aos="fade-up">
              <span className="section-number">03</span>
              <h2 className="section-title">About Me</h2>
            </div>
            
            <div className="about-text" data-aos="fade-up" data-aos-delay="100">
              <p>
                Hi, I'm Tanuja! I'm a passionate Full Stack Web Developer with a love for 
                creating digital solutions that make a difference. With expertise in both 
                frontend and backend technologies, I enjoy the entire development lifecycle.
              </p>
              <p>
                My journey in web development started with curiosity about how websites work, 
                and it has evolved into a career focused on building scalable, user-centric 
                applications. I believe in writing clean, maintainable code and staying 
                updated with the latest technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new frameworks, contributing 
                to open source projects, or mentoring aspiring developers in my community.
              </p>
            </div>
            
            <div className="experience" data-aos="fade-up" data-aos-delay="200">
              <h3>Experience</h3>
              <div className="experience-timeline">
                <div className="experience-item">
                  <div className="experience-dot"></div>
                  <div className="experience-content">
                    <h4>Full Stack Developer</h4>
                    <span className="experience-period">2022 - Present</span>
                    <p>Building modern web applications and leading development teams</p>
                  </div>
                </div>
                <div className="experience-item">
                  <div className="experience-dot"></div>
                  <div className="experience-content">
                    <h4>Frontend Developer</h4>
                    <span className="experience-period">2021 - 2022</span>
                    <p>Specialized in React development and UI/UX implementation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-sidebar">
            <div className="about-image" data-aos="fade-up" data-aos-delay="300">
              <div className="image-container">
                <div className="image-placeholder">
                  <span>Tanuja's Photo</span>
                </div>
                <div className="image-decoration"></div>
              </div>
            </div>
            
            <div className="skills-section" data-aos="fade-up" data-aos-delay="400">
              <h3>Technical Skills</h3>
              <div className="skills-grid">
                {Object.entries(skills).map(([category, techs]) => (
                  <div key={category} className="skill-category">
                    <h4>{category}</h4>
                    <div className="skill-tags">
                      {techs.map((tech, index) => (
                        <span 
                          key={tech} 
                          className="skill-tag"
                          style={{ '--delay': `${index * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="contact">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-number">04</span>
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="section-subtitle">
          Ready to turn your ideas into reality? I'm always excited to work on 
          challenging projects and collaborate with innovative teams.
        </p>
      </div>
      
      <div className="contact-grid">
        <div className="contact-form-section" data-aos="fade-up" data-aos-delay="100">
          <h3>Send me a message</h3>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="your.email@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="project">Project Type</label>
              <select id="project">
                <option>Select project type</option>
                <option>Full Stack Web Application</option>
                <option>Frontend Development</option>
                <option>Backend API Development</option>
                <option>Website Redesign</option>
                <option>E-commerce Solution</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell me about your project..." rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <span>Send Message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="contact-info-section" data-aos="fade-up" data-aos-delay="200">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <a href="mailto:tanuja.dev@example.com">tanuja.dev@example.com</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.52 21.39 21 20.77 21C9.39 21 2 13.61 2 2.23C2 1.61 2.48 1 3.08 1H6.08C6.68 1 7.18 1.44 7.25 2.04C7.37 3.24 7.58 4.42 7.88 5.56C8.03 6.05 7.88 6.58 7.5 6.95L5.79 8.66C7.24 11.42 9.58 13.76 12.34 15.21L14.05 13.5C14.42 13.12 14.95 12.97 15.44 13.12C16.58 13.42 17.76 13.63 18.96 13.75C19.56 13.82 20 14.32 20 14.92V17.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17L12 23L3 17C3 10 12 2 12 2S21 3 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <span>Bangalore, India</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="contact-details">
                <h4>Response Time</h4>
                <span>Usually within 24 hours</span>
              </div>
            </div>
          </div>
          
          <div className="social-section">
            <h4>Connect with me</h4>
            <div className="social-links">
              {[
                { name: "LinkedIn", icon: "linkedin" },
                { name: "GitHub", icon: "github" },
                { name: "Twitter", icon: "twitter" },
                { name: "Dev.to", icon: "dev" }
              ].map((social, index) => (
                <a key={social.name} href="#" className="social-link">
                  <span className="social-number">0{index + 1}</span>
                  <span className="social-name">{social.name}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div className="availability">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>Available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const styles = `
  /* Reset and Base Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #0066cc;
    --primary-dark: #0052a3;
    --primary-light: #66ccff;
    --white: #ffffff;
    --black: #0a0a0a;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-400: #ced4da;
    --gray-500: #adb5bd;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
    
    --font-primary: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    font-family: var(--font-primary);
    line-height: 1.6;
    color: var(--white);
    background: var(--black);
    overflow-x: hidden;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Portfolio Container */
  .portfolio {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: var(--transition-slow);
  }

  .portfolio.loaded {
    opacity: 1;
    transform: translateY(0);
  }

  /* Container */
  .container {
    width: 100%;
    max-width: min(1400px, calc(100vw - 4rem));
    margin: 0 auto;
    padding: 0 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: var(--transition);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .nav-brand:hover {
    opacity: 0.8;
  }

  .brand-text {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .brand-dot {
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .nav-menu {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--white);
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    animation: slideDown 0.6s ease forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(-20px);
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .nav-link.active {
    background: var(--primary);
    color: var(--white);
  }

  .nav-link.active:hover {
    background: var(--primary-dark);
  }

  .nav-number {
    font-size: 0.75rem;
    opacity: 0.6;
    font-family: var(--font-mono);
  }

  .nav-text {
    font-weight: 500;
  }

  .nav-mobile {
    display: none;
  }

  .mobile-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    width: 24px;
    height: 18px;
    position: relative;
  }

  .hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    background: var(--white);
    margin: 3px 0;
    transition: var(--transition);
    transform-origin: center;
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* Floating Menu */
  .floating-menu {
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 10000;
    transition: var(--transition);
  }

  .floating-btn {
    width: 60px;
    height: 60px;
    background: var(--black);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(20px);
  }

  .floating-btn:hover {
    background: var(--primary);
    border-color: var(--primary);
    transform: scale(1.05);
    box-shadow: var(--shadow-xl);
  }

  .floating-menu.active .floating-btn {
    background: var(--white);
    color: var(--black);
    transform: rotate(180deg);
  }

  /* Menu Overlay */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(30px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-slow);
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .menu-content {
    text-align: center;
    max-width: 600px;
    width: 90%;
  }

  .menu-header {
    margin-bottom: 3rem;
  }

  .menu-header h2 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease 0.2s forwards;
  }

  .menu-subtitle {
    color: var(--gray-400);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease 0.3s forwards;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--white);
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 300;
    padding: 1.5rem 2rem;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: calc(0.4s + var(--delay));
  }

  .menu-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--primary);
    transform: translateX(10px) translateY(0);
  }

  .item-number {
    font-family: var(--font-mono);
    font-size: 1rem;
    opacity: 0.5;
  }

  .item-text {
    flex: 1;
    text-align: left;
    margin-left: 2rem;
  }

  .item-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: var(--transition);
  }

  .menu-item:hover .item-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Main Content */
  .main-content {
    width: 100%;
    overflow-x: hidden;
  }

  /* Section Styles */
  section {
    width: 100%;
    padding: 6rem 0 4rem;
    overflow: hidden;
    position: relative;
  }

  .section-header {
    margin-bottom: 6rem;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .section-number {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--primary);
    margin-bottom: 1rem;
    display: block;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: var(--gray-400);
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: var(--black);
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--primary), var(--primary-light));
    filter: blur(60px);
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }

  .orb-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }

  .orb-3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 60%;
    animation-delay: 4s;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(0, 102, 204, 0.1);
    border: 1px solid rgba(0, 102, 204, 0.3);
    border-radius: 50px;
    color: var(--primary-light);
    font-size: 0.9rem;
    margin-bottom: 3rem;
    backdrop-filter: blur(10px);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 300;
    line-height: 0.9;
    margin-bottom: 3rem;
    letter-spacing: -0.03em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .title-line {
    display: block;
    overflow: hidden;
  }

  .title-line.highlight {
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .meta-name {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .meta-divider {
    width: 40px;
    height: 1px;
    background: var(--gray-600);
  }

  .meta-location {
    color: var(--gray-400);
  }

  .hero-description {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--gray-300);
    margin-bottom: 3rem;
    max-width: 600px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .hero-scroll {
    position: absolute;
    right: 2rem;
    bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--gray-500);
    font-size: 0.9rem;
  }

  .scroll-indicator {
    width: 1px;
    height: 60px;
    background: var(--gray-700);
    position: relative;
    overflow: hidden;
  }

  .scroll-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: var(--primary);
    animation: scroll-move 2s ease-in-out infinite;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border: 2px solid transparent;
    border-radius: var(--radius-lg);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
  }

  .btn:hover::before {
    left: 100%;
  }

  .btn-primary {
    background: var(--primary);
    color: var(--white);
    border-color: var(--primary);
  }

  .btn-primary:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: transparent;
    color: var(--white);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .btn-secondary:hover {
    background: var(--white);
    color: var(--black);
    border-color: var(--white);
  }

  .btn-outline {
    background: transparent;
    color: var(--white);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary);
    color: var(--primary-light);
  }

  /* Work Section */
  .work {
    background: var(--black);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
    gap: 3rem;
    margin-bottom: 6rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: var(--transition);
    cursor: pointer;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary);
  }

  .project-image {
    position: relative;
    height: 250px;
    background: linear-gradient(135deg, var(--gray-800) 0%, var(--gray-700) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .project-number {
    font-size: 4rem;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.1);
    font-family: var(--font-mono);
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 102, 204, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    color: var(--black);
    border: none;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }

  .project-link:hover {
    transform: scale(1.05);
  }

  .project-info {
    padding: 2rem;
  }

  .project-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-category {
    color: var(--primary-light);
    font-weight: 500;
  }

  .project-year {
    color: var(--gray-500);
    font-family: var(--font-mono);
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .project-description {
    color: var(--gray-400);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    background: rgba(0, 102, 204, 0.1);
    color: var(--primary-light);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .work-cta {
    text-align: center;
  }

  /* About Section */
  .about {
    background: var(--black);
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    align-items: start;
  }

  .about-content .section-header {
    text-align: left;
    margin-bottom: 3rem;
  }

  .about-text p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--gray-300);
    margin-bottom: 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .experience h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--white);
  }

  .experience-timeline {
    position: relative;
    padding-left: 2rem;
  }

  .experience-timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gray-800);
  }

  .experience-item {
    position: relative;
    margin-bottom: 3rem;
  }

  .experience-dot {
    position: absolute;
    left: -2rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    border: 3px solid var(--black);
  }

  .experience-content h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .experience-period {
    color: var(--primary-light);
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }

  .experience-content p {
    color: var(--gray-400);
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .about-sidebar {
    position: sticky;
    top: 8rem;
  }

  .about-image {
    margin-bottom: 3rem;
  }

  .image-container {
    position: relative;
  }

  .image-placeholder {
    width: 100%;
    height: 400px;
    background: var(--gray-800);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-500);
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;
  }

  .image-decoration {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, var(--primary), var(--primary-light));
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
  }

  .skills-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--white);
  }

  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .skill-category h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-light);
    margin-bottom: 1rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: rgba(255, 255, 255, 0.05);
    color: var(--gray-300);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-lg);
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    transition: var(--transition);
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(20px);
  }

  .skill-tag:hover {
    background: rgba(0, 102, 204, 0.1);
    color: var(--primary-light);
    transform: translateY(-2px);
  }

  /* Contact Section */
  .contact {
    background: var(--black);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
  }

  .contact-form-section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--white);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--gray-400);
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    color: var(--white);
    font-family: inherit;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    transition: var(--transition);
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--gray-500);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-light);
    flex-shrink: 0;
  }

  .contact-details h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--gray-400);
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .contact-details a,
  .contact-details span {
    color: var(--white);
    text-decoration: none;
    font-size: 1.1rem;
    transition: var(--transition);
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .contact-details a:hover {
    color: var(--primary-light);
  }

  .social-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 1.5rem;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    color: var(--white);
    text-decoration: none;
    transition: var(--transition);
  }

  .social-link:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--primary);
    transform: translateX(5px);
  }

  .social-number {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--gray-500);
  }

  .social-name {
    flex: 1;
    text-align: left;
    margin-left: 1rem;
    font-weight: 500;
  }

  .availability {
    padding: 1.5rem;
    background: rgba(0, 255, 136, 0.05);
    border: 1px solid rgba(0, 255, 136, 0.2);
    border-radius: var(--radius-lg);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    background: #00ff88;
    border-radius: 50%;
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  .status-indicator span {
    color: var(--white);
    font-weight: 500;
  }

  /* Footer */
  .footer {
    background: var(--black);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem 0;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
  }

  .footer-year {
    color: var(--gray-500);
    font-weight: 400;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer-links button,
  .footer-links a {
    background: none;
    border: none;
    color: var(--gray-400);
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    transition: var(--transition);
  }

  .footer-links button:hover,
  .footer-links a:hover {
    color: var(--white);
  }

  /* Animations */
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes scroll-move {
    0% { transform: translateY(-30px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(30px); opacity: 0; }
  }

  /* AOS (Animate On Scroll) Styles */
  [data-aos] {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-aos].aos-animate {
    opacity: 1;
    transform: translateY(0);
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .container {
      max-width: calc(100vw - 3rem);
      padding: 0 1.5rem;
    }

    .nav-container {
      padding: 1.5rem 1.5rem;
    }

    .floating-menu {
      right: 1.5rem;
    }

    .hero-scroll {
      right: 1.5rem;
    }
  }

  @media (max-width: 900px) {
    .nav-menu {
      display: none;
    }

    .nav-mobile {
      display: block;
    }

    .about-grid,
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .about-sidebar {
      position: relative;
      top: auto;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .floating-menu {
      top: 1.5rem;
      right: 1.5rem;
    }

    .floating-btn {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 768px) {
    .container {
      max-width: calc(100vw - 2rem);
      padding: 0 1rem;
    }

    .nav-container {
      padding: 1rem;
    }

    section {
      padding: 4rem 0 3rem;
    }

    .section-header {
      margin-bottom: 4rem;
    }

    .hero {
      min-height: 100vh;
      padding: 8rem 0 4rem;
    }

    .hero-title {
      font-size: clamp(2.5rem, 10vw, 4rem);
      margin-bottom: 2rem;
    }

    .hero-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .meta-divider {
      display: none;
    }

    .hero-description {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }

    .btn {
      justify-content: center;
      width: 100%;
    }

    .hero-scroll {
      display: none;
    }

    .projects-grid {
      gap: 2rem;
    }

    .project-info {
      padding: 1.5rem;
    }

    .menu-item {
      font-size: 1.25rem;
      padding: 1.25rem 1.5rem;
    }

    .menu-header h2 {
      font-size: 2rem;
    }

    .floating-menu {
      top: 1rem;
      right: 1rem;
    }

    .floating-btn {
      width: 45px;
      height: 45px;
    }

    .contact-form {
      gap: 1.5rem;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 0.75rem;
    }

    .nav-container {
      padding: 0.75rem;
    }

    .hero-title {
      font-size: clamp(2rem, 9vw, 3rem);
    }

    .hero-description {
      font-size: 1rem;
    }

    .btn {
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
    }

    .section-title {
      font-size: clamp(2rem, 8vw, 2.5rem);
    }

    .project-image {
      height: 200px;
    }

    .project-number {
      font-size: 3rem;
    }

    .project-info {
      padding: 1rem;
    }

    .menu-item {
      font-size: 1.1rem;
      padding: 1rem;
    }

    .item-text {
      margin-left: 1rem;
    }

    .menu-header h2 {
      font-size: 1.75rem;
    }

    .floating-btn {
      width: 40px;
      height: 40px;
    }

    .floating-btn svg {
      width: 18px;
      height: 18px;
    }

    .about-text p {
      font-size: 1rem;
    }

    .experience-timeline {
      padding-left: 1.5rem;
    }

    .experience-dot {
      left: -1.5rem;
      width: 10px;
      height: 10px;
    }

    .image-placeholder {
      height: 300px;
    }

    .contact-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
    }

    .social-link {
      padding: 0.75rem;
    }
  }

  /* Ultra-small screens */
  @media (max-width: 320px) {
    .floating-menu {
      top: 0.5rem;
      right: 0.5rem;
    }

    .floating-btn {
      width: 36px;
      height: 36px;
    }

    .floating-btn svg {
      width: 16px;
      height: 16px;
    }

    .hero-title {
      font-size: clamp(1.75rem, 8vw, 2.5rem);
    }

    .btn {
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
    }

    .menu-item {
      font-size: 1rem;
      padding: 0.875rem;
    }

    .project-image {
      height: 180px;
    }

    .project-number {
      font-size: 2.5rem;
    }
  }

  /* High-DPI Display Optimizations */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .gradient-orb {
      filter: blur(40px);
    }

    .floating-btn {
      border-width: 1px;
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .scroll-line {
      animation: none;
    }

    .gradient-orb {
      animation: none;
    }

    .badge-dot,
    .status-dot {
      animation: none;
    }
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    .btn-outline {
      border-color: var(--white);
    }

    .project-card {
      border-color: var(--white);
    }

    .contact-item {
      border: 1px solid var(--white);
      border-radius: var(--radius-lg);
      padding: 1rem;
    }
  }

  /* Dark Mode Override (if system prefers light) */
  @media (prefers-color-scheme: light) {
    /* Keep dark theme regardless of system preference */
  }

  /* Print Styles */
  @media print {
    .nav,
    .floating-menu,
    .menu-overlay,
    .hero-scroll {
      display: none !important;
    }

    .hero {
      min-height: auto;
      padding: 2rem 0;
    }

    section {
      padding: 2rem 0;
      page-break-inside: avoid;
    }

    .project-card,
    .experience-item {
      page-break-inside: avoid;
    }

    * {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
    }
  }

  /* Focus Styles for Accessibility */
  .btn:focus,
  .nav-link:focus,
  .menu-item:focus,
  .floating-btn:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  /* Loading State */
  .portfolio:not(.loaded) * {
    transition: none !important;
    animation: none !important;
  }

  /* Scroll Behavior */
  html {
    scroll-padding-top: 100px;
  }

  /* Selection Styles */
  ::selection {
    background: var(--primary);
    color: var(--white);
  }

  ::-moz-selection {
    background: var(--primary);
    color: var(--white);
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--gray-900);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray-600);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray-500);
  }

  /* Ensure no text overflow on any device */
  h1, h2, h3, h4, h5, h6,
  p, span, div, a, button,
  input, textarea, select {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
  }

  /* Prevent horizontal scroll */
  html, body, #root, .portfolio {
    overflow-x: hidden;
    max-width: 100vw;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .no-scroll {
    overflow: hidden;
  }
`;

export default Portfolio;1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

 