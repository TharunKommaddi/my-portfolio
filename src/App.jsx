import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const toggleMenu = () => {
    console.log('Toggling menu, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    console.log('Closing menu');
    setIsMenuOpen(false);
  };

  const navigateTo = (section) => {
    console.log('Navigating to:', section);
    setCurrentSection(section);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'work':
        return <WorkSection navigateTo={navigateTo} />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="portfolio">
        {/* Normal Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-left">
              <span className="logo" onClick={() => navigateTo('home')}>
                Tanuja
              </span>
            </div>
            
            {/* Desktop Navigation Menu */}
            <div className="nav-menu">
              <button 
                className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentSection === 'work' ? 'active' : ''}`}
                onClick={() => navigateTo('work')}
              >
                Work
              </button>
              <button 
                className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                About
              </button>
              <button 
                className={`nav-link ${currentSection === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
              >
                Contact
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="nav-right-mobile">
              <button className="menu-toggle" onClick={toggleMenu}>
                <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Fixed Floating Circle Menu */}
        <div className={`floating-menu ${isMenuOpen ? 'menu-open' : ''}`}>
          <button className="floating-menu-button" onClick={toggleMenu}>
            <span className={`floating-hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
          
        {/* Menu Overlay */}
        <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button className="menu-item" onClick={() => navigateTo('home')}>
              <span>01</span>Home
            </button>
            <button className="menu-item" onClick={() => navigateTo('work')}>
              <span>02</span>Work
            </button>
            <button className="menu-item" onClick={() => navigateTo('about')}>
              <span>03</span>About
            </button>
            <button className="menu-item" onClick={() => navigateTo('contact')}>
              <span>04</span>Contact
            </button>
          </div>
        </div>

        <main className="main-content">
          {renderContent()}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Tanuja. All rights reserved.</p>
            <div className="footer-links">
              <a href="#" onClick={() => navigateTo('about')}>Privacy</a>
              <a href="#" onClick={() => navigateTo('contact')}>Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const HomeSection = ({ navigateTo }) => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <div className="hero-badge">Available for new projects</div>
        <h1 className="hero-title">
          Full Stack<br />
          <span className="title-outline">Developer</span><br />
          & Problem Solver
        </h1>
        <div className="hero-subtitle">
          <span className="name">Tanuja</span>
          <span className="location">Based in India</span>
        </div>
        <p className="hero-description">
          I craft scalable web applications using modern technologies. 
          Passionate about creating efficient solutions that bridge the gap 
          between frontend aesthetics and backend functionality.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigateTo('work')}>
            View My Work
          </button>
          <button className="btn-secondary" onClick={() => navigateTo('contact')}>
            Get in Touch
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  </section>
);

const WorkSection = ({ navigateTo }) => (
  <section className="work-section">
    <div className="container">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A showcase of full-stack applications built with modern technologies and best practices
        </p>
      </div>
      <div className="work-grid">
        {[
          { 
            title: "E-Commerce Platform", 
            category: "Full Stack Development", 
            year: "2024",
            tech: "React, Node.js, MongoDB",
            description: "Complete online store with payment integration and admin dashboard"
          },
          { 
            title: "Task Management App", 
            category: "MERN Stack", 
            year: "2024",
            tech: "React, Express, MongoDB",
            description: "Collaborative project management tool with real-time updates"
          },
          { 
            title: "Social Media Dashboard", 
            category: "Frontend + API", 
            year: "2024",
            tech: "Next.js, REST APIs",
            description: "Analytics dashboard for social media management"
          },
          { 
            title: "Weather App", 
            category: "React Application", 
            year: "2023",
            tech: "React, Weather API",
            description: "Real-time weather forecasting with location services"
          },
          { 
            title: "Portfolio Website", 
            category: "Frontend Development", 
            year: "2023",
            tech: "React, CSS3, Responsive",
            description: "Modern portfolio showcasing responsive design principles"
          },
          { 
            title: "Blog CMS", 
            category: "Full Stack", 
            year: "2023",
            tech: "Node.js, MySQL, React",
            description: "Content management system with user authentication"
          }
        ].map((item, index) => (
          <div key={index} className="work-item">
            <div className="work-image">
              <div className="work-number">0{index + 1}</div>
              <div className="work-overlay">
                <span className="view-project">View Project</span>
              </div>
            </div>
            <div className="work-info">
              <h3>{item.title}</h3>
              <p className="work-description">{item.description}</p>
              <div className="work-meta">
                <span className="work-tech">{item.tech}</span>
                <span className="work-year">{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="work-cta">
        <button className="btn-outline" onClick={() => navigateTo('contact')}>
          Interested in working together?
        </button>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="about-section">
    <div className="container">
      <div className="about-grid">
        <div className="about-content">
          <span className="section-number">03</span>
          <h2 className="section-title">About Me</h2>
          <div className="about-text">
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
          
          <div className="experience">
            <h3>Experience</h3>
            <div className="experience-item">
              <h4>Full Stack Developer</h4>
              <span>2022 - Present</span>
              <p>Building modern web applications and leading development teams</p>
            </div>
            <div className="experience-item">
              <h4>Frontend Developer</h4>
              <span>2021 - 2022</span>
              <p>Specialized in React development and UI/UX implementation</p>
            </div>
          </div>
        </div>
        
        <div className="about-sidebar">
          <div className="about-image">
            <div className="image-placeholder">
              <span>Tanuja's Photo</span>
            </div>
          </div>
          
          <div className="skills-section">
            <h3>Technical Skills</h3>
            <div className="skills">
              <div className="skill-category">
                <h4>Frontend</h4>
                <div className="skill-tags">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>TypeScript</span>
                  <span>Next.js</span>
                  <span>CSS3</span>
                  <span>HTML5</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Backend</h4>
                <div className="skill-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>Python</span>
                  <span>Django</span>
                  <span>REST APIs</span>
                  <span>GraphQL</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Database</h4>
                <div className="skill-tags">
                  <span>MongoDB</span>
                  <span>MySQL</span>
                  <span>PostgreSQL</span>
                  <span>Firebase</span>
                </div>
              </div>
              <div className="skill-category">
                <h4>Tools & Others</h4>
                <div className="skill-tags">
                  <span>Git</span>
                  <span>Docker</span>
                  <span>AWS</span>
                  <span>Figma</span>
                  <span>Postman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="contact-section">
    <div className="container">
      <div className="contact-content">
        <span className="section-number">04</span>
        <h2 className="section-title">Let's Build Something Amazing</h2>
        <p className="contact-text">
          Ready to turn your ideas into reality? I'm always excited to work on 
          challenging projects and collaborate with innovative teams. Let's discuss 
          how we can bring your vision to life.
        </p>
        
        <div className="contact-grid">
          <div className="contact-form-section">
            <h3>Send me a message</h3>
            <div className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
              <div className="form-group">
                <label>Project Type</label>
                <select>
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
                <label>Message</label>
                <textarea placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </div>
          </div>
          
          <div className="contact-info-section">
            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <a href="mailto:tanuja.dev@example.com">tanuja.dev@example.com</a>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="contact-item">
                <h4>Location</h4>
                <span>Bangalore, India</span>
              </div>
              <div className="contact-item">
                <h4>Response Time</h4>
                <span>Usually within 24 hours</span>
              </div>
            </div>
            
            <div className="social-section">
              <h4>Connect with me</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span>01</span>LinkedIn
                </a>
                <a href="#" className="social-link">
                  <span>02</span>GitHub
                </a>
                <a href="#" className="social-link">
                  <span>03</span>Twitter
                </a>
                <a href="#" className="social-link">
                  <span>04</span>Dev.to
                </a>
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
    </div>
  </section>
);

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #0a0a0a;
    background: #ffffff;
    overflow-x: hidden;
    font-weight: 400;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .portfolio {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Navigation */
  .nav {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  .logo {
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.3s ease;
    letter-spacing: -0.02em;
    color: white;
  }

  .logo:hover {
    opacity: 0.6;
  }

  /* Desktop Navigation Menu */
  .nav-menu {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-link {
    background: none;
    border: none;
    font-size: 1rem;
    font-weight: 400;
    color: white;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.3s ease;
    position: relative;
    font-family: inherit;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #66ccff;
  }

  .nav-link.active {
    background: #0066cc;
    color: white;
  }

  .nav-link.active:hover {
    background: #0052a3;
    color: white;
  }

  /* Mobile Hamburger Menu */
  .nav-right-mobile {
    display: none;
  }

  .menu-toggle {
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
    background: white;
    margin: 3px 0;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* FIXED Floating Circle Menu */
  .floating-menu {
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 10000;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: all 0.4s ease;
  }

  .floating-menu-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #0a0a0a;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 10001;
  }

  .floating-menu-button:hover {
    background: #333;
    transform: scale(1.05);
  }

  .floating-menu.menu-open .floating-menu-button {
    background: white;
  }

  .floating-hamburger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    position: relative;
  }

  .floating-hamburger span {
    width: 20px;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .floating-menu.menu-open .floating-hamburger span {
    background: #0a0a0a;
  }

  .floating-hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(1px, 1px);
  }

  .floating-hamburger.active span:nth-child(2) {
    transform: rotate(-45deg) translate(1px, -1px);
  }

  /* Menu Overlay */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(30px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    z-index: 9999;
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .menu-content {
    text-align: center;
    position: relative;
    padding: 2rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: none;
    border: none;
    font-size: 3.5rem;
    font-weight: 300;
    margin: 1.5rem 0;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    letter-spacing: -0.02em;
    font-family: inherit;
  }

  .menu-item span {
    font-size: 1rem;
    opacity: 0.4;
    font-weight: 400;
  }

  .menu-item:hover {
    opacity: 0.4;
    transform: translateX(10px);
  }

  /* Main Content */
  .main-content {
    width: 100%;
    padding-top: 0;
    overflow-x: hidden;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    overflow-x: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Hero Section */
  .hero {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 6rem 0 4rem;
    overflow: hidden;
    background: #0a0a0a;
  }

  .hero .hero-title {
    color: white;
  }

  .hero .title-outline {
    -webkit-text-stroke: 2px white;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .hero .hero-subtitle .name,
  .hero .hero-subtitle .location {
    color: white;
    opacity: 0.7;
  }

  .hero .hero-description {
    color: white;
    opacity: 0.8;
  }

  .hero .hero-scroll {
    color: white;
    opacity: 0.6;
  }

  .hero .scroll-line {
    background: white;
  }

  .hero .location::before {
    background: white;
  }

  .hero-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #f0f8ff;
    border: 1px solid #e0f0ff;
    border-radius: 20px;
    font-size: 0.85rem;
    margin-bottom: 3rem;
    color: #0066cc;
  }

  .hero-content {
    width: 100%;
    max-width: 1000px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 6rem);
    font-weight: 300;
    line-height: 0.9;
    margin-bottom: 3rem;
    letter-spacing: -0.03em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .title-outline {
    -webkit-text-stroke: 2px #0a0a0a;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .hero-subtitle {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;
    font-size: 1rem;
    opacity: 0.7;
  }

  .name {
    font-weight: 600;
  }

  .location {
    position: relative;
    padding-left: 2rem;
  }

  .location::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 1rem;
    height: 1px;
    background: #0a0a0a;
  }

  .hero-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 4rem;
    max-width: 700px;
    opacity: 0.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }

  .btn-primary, .btn-secondary, .btn-outline {
    padding: 1rem 2rem;
    border: 1px solid #0a0a0a;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-radius: 0;
    font-family: inherit;
    white-space: nowrap;
    word-wrap: normal;
    min-width: fit-content;
  }

  .btn-primary {
    background: #0a0a0a;
    color: white;
  }

  .btn-primary:hover {
    background: transparent;
    color: #0a0a0a;
  }

  .btn-secondary:hover {
    background: #0a0a0a;
    color: white;
  }

  .btn-outline {
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    margin-top: 3rem;
  }

  .btn-outline:hover {
    background: white;
    color: #0a0a0a;
  }

  .hero-scroll {
    position: absolute;
    right: 2rem;
    bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    opacity: 0.6;
  }

  .scroll-line {
    width: 1px;
    height: 4rem;
    background: #0a0a0a;
    animation: scrollAnimation 2s infinite;
  }

  @keyframes scrollAnimation {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.5); }
  }

  /* Section Headers */
  .section-header {
    margin-bottom: 6rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .section-number {
    font-size: 0.9rem;
    opacity: 0.4;
    margin-bottom: 1rem;
    display: block;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 4rem);
    font-weight: 300;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .section-subtitle {
    font-size: 1.1rem;
    opacity: 0.7;
    max-width: 700px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Work Section */
  .work-section {
    width: 100%;
    padding: 8rem 0;
    background: #0a0a0a;
    overflow: hidden;
  }

  .work-section .section-number,
  .work-section .section-title,
  .work-section .section-subtitle {
    color: white;
  }

  .work-section .work-info h3,
  .work-section .work-description,
  .work-section .work-tech,
  .work-section .work-year {
    color: white;
  }

  .work-section .work-description {
    opacity: 0.8;
  }

  .work-section .work-year {
    opacity: 0.6;
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    gap: 4rem;
    width: 100%;
  }

  .work-item {
    cursor: pointer;
    transition: transform 0.4s ease;
    overflow: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-item:hover {
    transform: translateY(-10px);
  }

  .work-image {
    width: 100%;
    height: 250px;
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    margin-bottom: 2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .work-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .work-item:hover .work-overlay {
    opacity: 1;
  }

  .view-project {
    color: white;
    font-size: 1rem;
    font-weight: 500;
  }

  .work-number {
    font-size: 3rem;
    font-weight: 100;
    opacity: 0.3;
  }

  .work-info h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .work-description {
    font-size: 0.95rem;
    opacity: 0.7;
    margin-bottom: 1rem;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .work-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    flex-wrap: wrap;
    gap: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-tech {
    color: #0066cc;
    font-weight: 500;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-year {
    opacity: 0.6;
  }

  .work-cta {
    text-align: center;
    margin-top: 6rem;
  }

  /* About Section */
  .about-section {
    width: 100%;
    padding: 8rem 0;
    background: #0a0a0a;
    overflow: hidden;
  }

  .about-section .section-number,
  .about-section .section-title {
    color: white;
  }

  .about-section .about-text p {
    color: white;
    opacity: 0.8;
  }

  .about-section .experience h3,
  .about-section .experience-item h4 {
    color: white;
  }

  .about-section .experience-item p {
    color: white;
    opacity: 0.7;
  }

  .about-section .skills-section h3,
  .about-section .skill-category h4 {
    color: white;
  }

  .about-section .skill-category h4 {
    color: #0066cc;
  }

  .about-section .image-placeholder {
    background: #333;
    color: white;
    opacity: 0.6;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    align-items: start;
    width: 100%;
  }

  .about-text p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    opacity: 0.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .experience {
    margin-top: 3rem;
  }

  .experience h3 {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .experience-item {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #333;
  }

  .experience-item:last-child {
    border-bottom: none;
  }

  .experience-item h4 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .experience-item span {
    font-size: 0.9rem;
    color: #0066cc;
    margin-bottom: 0.5rem;
    display: block;
  }

  .experience-item p {
    font-size: 0.95rem;
    opacity: 0.7;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .about-sidebar {
    position: sticky;
    top: 2rem;
  }

  .about-image {
    margin-bottom: 3rem;
  }

  .image-placeholder {
    width: 100%;
    height: 400px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    opacity: 0.6;
    border-radius: 8px;
  }

  .skills-section h3 {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .skill-category {
    margin-bottom: 2rem;
  }

  .skill-category h4 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #0066cc;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tags span {
    background: #f0f8ff;
    color: #0066cc;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 500;
    white-space: nowrap;
    word-wrap: normal;
  }

  /* Contact Section */
  .contact-section {
    width: 100%;
    padding: 8rem 0;
    background: #0a0a0a;
    color: white;
    overflow: hidden;
  }

  .contact-section .section-number,
  .contact-section .section-title {
    color: white;
  }

  .contact-text {
    font-size: 1.2rem;
    margin-bottom: 4rem;
    max-width: 700px;
    opacity: 0.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    width: 100%;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contact-form-section h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.9rem;
    opacity: 0.8;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    font-family: inherit;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .form-group textarea {
    min-height: 120px;
    resize: vertical;
  }

  .contact-info-section {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .contact-item {
    margin-bottom: 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .contact-item h4 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .contact-item a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: opacity 0.3s ease;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .contact-item a:hover {
    opacity: 0.6;
  }

  .contact-item span {
    font-size: 1.1rem;
    opacity: 0.8;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .social-section {
    margin-top: 3rem;
  }

  .social-section h4 {
    font-size: 0.9rem;
    margin-bottom: 2rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .social-link {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
  }

  .social-link span {
    font-size: 0.8rem;
    opacity: 0.4;
  }

  .social-link:hover {
    opacity: 0.6;
    transform: translateX(10px);
  }

  .availability {
    margin-top: 3rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .status-indicator span {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  /* Footer */
  .footer {
    width: 100%;
    padding: 2rem 0;
    background: #0a0a0a;
    color: white;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    flex-wrap: wrap;
    gap: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer-links a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .footer-links a:hover {
    opacity: 1;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .container, .footer-content {
      padding: 0 2rem;
    }

    .nav-container {
      padding: 1.5rem 2rem;
    }

    .hero-scroll {
      right: 2rem;
    }

    .floating-menu {
      right: 2rem;
    }
  }

  @media (max-width: 900px) {
    /* Hide desktop menu, show mobile menu on smaller screens */
    .nav-menu {
      display: none;
    }

    .nav-right-mobile {
      display: block;
    }

    .floating-menu {
      top: 1.5rem;
      right: 1.5rem;
    }

    .floating-menu-button {
      width: 50px;
      height: 50px;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .about-sidebar {
      position: relative;
      top: auto;
    }

    .work-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container, .footer-content {
      padding: 0 1.5rem;
    }

    .nav-container {
      padding: 1rem 1.5rem;
    }

    .hero {
      padding: 6rem 0 4rem;
    }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 4rem);
    }

    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .hero-actions .btn-primary,
    .hero-actions .btn-secondary {
      width: 100%;
      text-align: center;
    }

    .hero-scroll {
      display: none;
    }

    .work-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .menu-item {
      font-size: 2.5rem;
    }

    .section-title {
      font-size: clamp(2rem, 6vw, 3rem);
    }

    .footer-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .hero-subtitle {
      flex-direction: column;
      gap: 0.5rem;
    }

    .location::before {
      display: none;
    }

    .location {
      padding-left: 0;
    }

    .floating-menu {
      top: 1rem;
      right: 1rem;
    }

    .floating-menu-button {
      width: 45px;
      height: 45px;
    }

    .work-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .container, .footer-content {
      padding: 0 1rem;
    }

    .nav-container {
      padding: 1rem;
    }

    .hero-title {
      font-size: clamp(2rem, 8vw, 3.5rem);
    }

    .hero-description {
      font-size: 1rem;
    }

    .work-grid {
      gap: 2rem;
      grid-template-columns: 1fr;
    }

    .about-text p {
      font-size: 1rem;
    }

    .contact-form {
      gap: 1.5rem;
    }

    .section-header {
      margin-bottom: 4rem;
    }

    .work-cta {
      margin-top: 4rem;
    }

    .menu-item {
      font-size: 2rem;
      margin: 0.5rem 0;
    }

    .hero-badge {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }

    .btn-primary, .btn-secondary, .btn-outline {
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
    }

    .work-image {
      height: 200px;
    }

    .work-number {
      font-size: 2rem;
    }

    .floating-menu {
      top: 0.5rem;
      right: 0.5rem;
    }

    .floating-menu-button {
      width: 40px;
      height: 40px;
    }

    .floating-hamburger span {
      width: 16px;
    }
  }

  /* Additional overflow and text fixes */
  * {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .menu-content {
    max-width: 90vw;
    overflow: hidden;
  }

  .hero-content,
  .about-content,
  .contact-content,
  .work-item {
    max-width: 100%;
    overflow: hidden;
  }

  /* Ensure no horizontal scroll */
  html, body, #root, .portfolio {
    overflow-x: hidden;
    max-width: 100vw;
  }

  .container {
    max-width: min(1400px, 100vw);
  }

  /* Text that should never break */
  .skill-tags span,
  .btn-primary,
  .btn-secondary,
  .btn-outline {
    white-space: nowrap;
  }

  /* Long words/URLs should break */
  .contact-item a,
  .hero-description,
  .work-description,
  .about-text p,
  .contact-text {
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;

export default Portfolio;
