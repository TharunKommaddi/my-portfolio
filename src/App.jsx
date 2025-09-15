import React, { useState, useEffect, useRef } from 'react';


// Custom hook for magnetic effects
const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Magnetic refs
  const logoRef = useMagnetic(0.2);
  const floatingMenuRef = useMagnetic(0.5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      <div className="portfolio">
        {/* Enhanced Navigation */}
        <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <div className="nav-left">
              <span ref={logoRef} className="logo magnetic-element" onClick={() => navigateTo('home')}>
                <span className="logo-text">©code by Tanuja</span>
                <span className="logo-dot"></span>
              </span>
            </div>
            
            <div className="nav-menu">
              {['home', 'work', 'about', 'contact'].map((item, index) => {
                const NavLink = () => {
                  const navRef = useMagnetic(0.25);
                  return (
                    <button 
                      ref={navRef}
                      className={`nav-link magnetic-element ${currentSection === item ? 'active' : ''}`}
                      onClick={() => navigateTo(item)}
                    >
                      <span className="nav-number">0{index + 1}</span>
                      <span className="nav-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                    </button>
                  );
                };
                return <NavLink key={item} />;
              })}
            </div>

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

        {/* Enhanced Floating Menu */}
        <div className={`floating-menu ${isMenuOpen ? 'active' : ''} ${isScrolled ? 'show-on-scroll' : ''}`}>
          <button ref={floatingMenuRef} className="floating-menu-button magnetic-element" onClick={toggleMenu}>
            <span className="floating-inner">
              <span className="floating-line"></span>
              <span className="floating-line"></span>
            </span>
          </button>
        </div>
          
        {/* Enhanced Menu Overlay */}
        <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="menu-background"></div>
            {['home', 'work', 'about', 'contact'].map((item, index) => {
              const MenuItem = () => {
                const menuRef = useMagnetic(0.3);
                return (
                  <button 
                    ref={menuRef}
                    key={item}
                    className="menu-item magnetic-element" 
                    onClick={() => navigateTo(item)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="menu-number">0{index + 1}</span>
                    <span className="menu-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                    <span className="menu-arrow">→</span>
                  </button>
                );
              };
              return <MenuItem key={item} />;
            })}
          </div>
        </div>

        <main className="main-content">
          {renderContent()}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>2025© Edition, Tanuja. Crafted with precision.</p>
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

const HomeSection = ({ navigateTo }) => {
  const primaryBtnRef = useMagnetic(0.3);
  const secondaryBtnRef = useMagnetic(0.25);
  const badgeRef = useMagnetic(0.2);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div ref={badgeRef} className="hero-badge magnetic-element">
            <span className="badge-dot"></span>
            Available for new projects
          </div>
          <h1 className="hero-title">
            <span className="title-line typing-effect" data-text="Full Stack">Full Stack</span>
            <span className="title-line title-outline typing-effect" data-text="Developer" style={{"--delay": "1s"}}>Developer</span>
            <span className="title-line typing-effect" data-text="& Problem Solver" style={{"--delay": "2s"}}>& Problem Solver</span>
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
            <button ref={primaryBtnRef} className="btn btn-primary magnetic-element" onClick={() => navigateTo('work')}>
              <span>View My Work</span>
              <span className="btn-arrow">↗</span>
            </button>
            <button ref={secondaryBtnRef} className="btn btn-secondary magnetic-element" onClick={() => navigateTo('contact')}>
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
};

const WorkSection = ({ navigateTo }) => {
  const ctaBtnRef = useMagnetic(0.3);

  const projects = [
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
  ];

  return (
    <section className="work-section">
      <div className="section-background">
        <div className="grid-pattern"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of full-stack applications built with modern technologies and best practices
          </p>
        </div>
        <div className="work-grid">
          {projects.map((item, index) => {
            const WorkItem = () => {
              const workRef = useMagnetic(0.2);
              return (
                <div ref={workRef} className="work-item magnetic-element">
                  <div className="work-image">
                    <div className="work-number">0{index + 1}</div>
                    <div className="work-overlay">
                      <span className="view-project">View Project</span>
                      <span className="project-arrow">↗</span>
                    </div>
                    <div className="work-glow"></div>
                  </div>
                  <div className="work-info">
                    <h3 className="work-title">{item.title}</h3>
                    <p className="work-description">{item.description}</p>
                    <div className="work-meta">
                      <span className="work-tech">{item.tech}</span>
                      <span className="work-year">{item.year}</span>
                    </div>
                  </div>
                </div>
              );
            };
            return <WorkItem key={index} />;
          })}
        </div>
        <div className="work-cta">
          <button ref={ctaBtnRef} className="btn btn-outline magnetic-element" onClick={() => navigateTo('contact')}>
            <span>Interested in working together?</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
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
              <div className="experience-dot"></div>
              <div className="experience-content">
                <h4>Software Engineer</h4>
                <span>May 2024 - Present</span>
                <p>Full-time role at Kaplan, developing software solutions in a hybrid work environment</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-content">
                <h4>Associate Software Engineering</h4>
                <span>Sep 2023 - May 2024</span>
                <p>Worked at Robosoft Technologies focusing on web application development and GitHub collaboration</p>
              </div>
            </div>
            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-content">
                <h4>Trainee Software Engineer</h4>
                <span>2023</span>
                <p>Started career in software development, building foundational skills in programming and development practices</p>
              </div>
            </div>
          </div>
        </div>
                    
          <div className="about-sidebar">
            <div className="about-image">
  <img 
    src="/images/Gemini_Generated_Image_8revb08revb08rev.png" 
    alt="Tanuja's Photo"
    className="profile-image"
  />
</div>
            
            <div className="skills-section">
              <h3>Technical Skills</h3>
              <div className="skills">
                {[
                  { name: "Frontend", skills: ["React", "JavaScript", "TypeScript", "Next.js", "CSS3", "HTML5"] },
                  { name: "Backend", skills: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"] },
                  { name: "Database", skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"] },
                  { name: "Tools & Others", skills: ["Git", "Docker", "AWS", "Figma", "Postman"] }
                ].map((category, index) => (
                  <div key={index} className="skill-category">
                    <h4>{category.name}</h4>
                    <div className="skill-tags">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillTag = () => {
                          const skillRef = useMagnetic(0.15);
                          return (
                            <span ref={skillRef} key={skillIndex} className="skill-tag magnetic-element">{skill}</span>
                          );
                        };
                        return <SkillTag key={skillIndex} />;
                      })}
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

const ContactSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Select project type');
  const submitBtnRef = useMagnetic(0.3);

  const projectTypes = [
    'Full Stack Web Application',
    'Frontend Development', 
    'Backend API Development',
    'Website Redesign',
    'E-commerce Solution',
    'Other'
  ];

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <span className="section-number">04</span>
          <h2 className="section-title">Let's Build Something Amazing</h2>
          <p className="contact-text">
            Ready to turn your ideas into reality? I'm always excited to work on 
            challenging projects and collaborate with innovative teams.
          </p>
          
          <div className="contact-grid">
            <div className="contact-form-section">
              <h3>Send me a message</h3>
              <div className="contact-form">
                {[
                  { label: "Name", type: "text", placeholder: "Your name" },
                  { label: "Email", type: "email", placeholder: "your.email@example.com" },
                ].map((field, index) => (
                  <div key={index} className="form-group">
                    <label>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Project Type</label>
                  <div className="custom-dropdown">
                    <div 
                      className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{selectedProject}</span>
                      <span className="dropdown-arrow">↓</span>
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown-options">
                        {projectTypes.map((type, index) => (
                          <div 
                            key={index}
                            className="dropdown-option"
                            onClick={() => {
                              setSelectedProject(type);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell me about your project..."></textarea>
                </div>
                <button ref={submitBtnRef} type="submit" className="btn btn-primary magnetic-element">
                  <span>Send Message</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
            
            <div className="contact-info-section">
              <div className="contact-info">
                {[
                  { label: "Email", value: "tanuja.dev@example.com", href: "mailto:tanuja.dev@example.com" },
                  { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { label: "Location", value: "Bangalore, India" },
                  { label: "Response Time", value: "Usually within 24 hours" }
                ].map((item, index) => {
                  const ContactItem = () => {
                    const contactRef = useMagnetic(0.15);
                    return (
                      <div ref={contactRef} className="contact-item magnetic-element">
                        <h4>{item.label}</h4>
                        {item.href ? (
                          <a href={item.href}>{item.value}</a>
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </div>
                    );
                  };
                  return <ContactItem key={index} />;
                })}
              </div>
              
              <div className="social-section">
                <h4>Connect with me</h4>
                <div className="social-links">
                  {["LinkedIn", "GitHub", "Twitter", "Dev.to"].map((platform, index) => {
                    const SocialLink = () => {
                      const socialRef = useMagnetic(0.2);
                      return (
                        <a ref={socialRef} href="#" className="social-link magnetic-element">
                          <span className="social-number">0{index + 1}</span>
                          <span className="social-text">{platform}</span>
                          <span className="social-arrow">↗</span>
                        </a>
                      );
                    };
                    return <SocialLink key={index} />;
                  })}
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
};

const styles = `
  /* Reset and Base Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #0a0a0a;
    background: #0a0a0a;
    overflow-x: hidden;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  #root, .portfolio {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Magnetic Element Base Styles */
  .magnetic-element {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .magnetic-element:hover {
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced Navigation */
  .nav {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav.scrolled {
    background: rgba(10, 10, 10, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    letter-spacing: -0.02em;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    background: #0066cc;
    border-radius: 50%;
    transition: all 0.3s ease;
    margin-top: 5px;
  }

  .logo:hover .logo-dot {
    background: #66ccff;
    transform: scale(1.2);
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
    color: white;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    position: relative;
    overflow: hidden;
  }

  .nav-number {
    font-size: 0.75rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .nav-text {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .nav-link:hover::before {
    left: 100%;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  .nav-link.active {
    background: #0066cc;
    color: white;
  }

  .nav-link.active .nav-number {
    opacity: 0.8;
  }

  /* Mobile Menu Toggle */
  .nav-right-mobile {
    display: none;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    width: 24px;
    height: 18px;
    cursor: pointer;
  }

  .hamburger span {
    width: 100%;
    height: 2px;
    background: white;
    margin: 3px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  /* Enhanced Floating Menu */
  .floating-menu {
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 10000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .floating-menu-button {
    width: 80px; /* Made bigger */
    height: 80px; /* Made bigger */
    border-radius: 50%;
    background: linear-gradient(135deg, #0066cc, #0052a3);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 102, 204, 0.3);
    position: relative;
    overflow: hidden;
  }

  .floating-menu-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .floating-menu-button:hover::before {
    opacity: 1;
  }

  .floating-menu-button:hover {
    transform: scale(1.05) rotate(180deg);
    box-shadow: 0 12px 48px rgba(0, 102, 204, 0.4);
  }

  .floating-menu.active .floating-menu-button {
    background: linear-gradient(135deg, #fff, #f0f0f0);
    transform: scale(0.9) rotate(180deg);
  }

  .floating-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: all 0.3s ease;
  }

 .floating-line {
    width: 24px; /* Made bigger to match larger button */
    height: 2px;
    background: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .floating-menu.active .floating-line {
    background: #0a0a0a;
  }

  .floating-menu.active .floating-line:nth-child(1) {
    transform: rotate(45deg) translate(1px, 1px);
  }

  .floating-menu.active .floating-line:nth-child(2) {
    transform: rotate(-45deg) translate(1px, -1px);
  }

  /* Enhanced Menu Overlay */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(0, 102, 204, 0.1));
    backdrop-filter: blur(30px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9999;
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .menu-background {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 102, 204, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-overlay.active .menu-background {
    transform: translate(-50%, -50%) scale(10);
  }

  .menu-content {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background: none;
    border: none;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300;
    margin: 2rem 0;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    letter-spacing: -0.02em;
    font-family: inherit;
    opacity: 0;
    transform: translateY(50px);
    animation: menuItemSlide 0.6s forwards;
    position: relative;
    overflow: hidden;
  }

  @keyframes menuItemSlide {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu-number {
    font-size: 1rem;
    opacity: 0.4;
    font-weight: 400;
  }

  .menu-text {
    position: relative;
  }

  .menu-text::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #0066cc;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-arrow {
    font-size: 2rem;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-item:hover .menu-text::after {
    width: 100%;
  }

  .menu-item:hover .menu-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .menu-item:hover {
    transform: translateX(20px);
    color: #66ccff;
  }

  /* Main Content */
  .main-content {
    width: 100%;
    overflow-x: hidden;
  }

  .container {
    max-width: min(1400px, 100vw);
    margin: 0 auto;
    padding: 0 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Enhanced Hero Section */
  .hero {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 4rem 0 4rem;
    overflow: hidden;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: float 20s ease-in-out infinite;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 102, 204, 0.3) 0%, transparent 70%);
    top: 20%;
    left: -10%;
    animation-delay: -10s;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(102, 204, 255, 0.2) 0%, transparent 70%);
    bottom: 20%;
    right: -5%;
    animation-delay: -5s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    word-wrap: break-word;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(0, 102, 204, 0.1);
    border: 1px solid rgba(0, 102, 204, 0.3);
    border-radius: 50px;
    font-size: 0.9rem;
    margin-bottom: 3rem;
    color: #66ccff;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .hero-badge:hover {
    background: rgba(0, 102, 204, 0.2);
    transform: translateY(-2px);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.2); }
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 300;
    line-height: 0.9;
    margin-bottom: 3rem;
    letter-spacing: -0.04em;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Add this after the existing .hero-title styles */

  /* Typewriter Effect - Complete CSS */
  .typing-effect {
    overflow: hidden;
    white-space: nowrap;
    margin: 0;
    width: 0;
    animation: typing 2s steps(var(--char-count, 20), end) var(--delay, 0s) forwards;
  }
  
  .typing-effect:nth-child(1) {
    --char-count: 10; /* "Full Stack" character count */
    --delay: 0s;
  }
  
  .typing-effect:nth-child(2) {
    --char-count: 9; /* "Developer" character count */
    --delay: 1s;
  }
  
  .typing-effect:nth-child(3) {
    --char-count: 17; /* "& Problem Solver" character count */
    --delay: 2s;
  }
  
  @keyframes typing {
    from { 
      width: 0; 
    }
    to { 
      width: 100%; 
    }
  }




  




      

  .title-line {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .title-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: titleShine 3s ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }

  @keyframes titleShine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .title-outline {
    -webkit-text-stroke: 3px white;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .hero-subtitle {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    margin-bottom: 3rem;
    font-size: 1.1rem;
    opacity: 0.8;
    color: white;
  }

  .name {
    font-weight: 600;
    position: relative;
  }

  .name::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: #0066cc;
    animation: underlineGrow 2s ease-out 1s forwards;
  }

  @keyframes underlineGrow {
    to { width: 100%; }
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
    width: 1.5rem;
    height: 1px;
    background: linear-gradient(90deg, #0066cc, #66ccff);
    animation: lineGrow 1.5s ease-out 1.5s forwards;
    transform: translateY(-50%) scaleX(0);
    transform-origin: left;
  }

  @keyframes lineGrow {
    to { transform: translateY(-50%) scaleX(1); }
  }

  .hero-description {
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 4rem;
    max-width: 600px;
    opacity: 0.9;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
  }

  /* Enhanced Button Styles */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border: 2px solid transparent;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50px;
    font-family: inherit;
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #0066cc, #0052a3);
    color: white;
    border-color: #0066cc;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #0052a3, #003d7a);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
  }

  .btn-secondary {
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
    transform: translateY(-3px);
  }

  .btn-outline {
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .btn-outline:hover {
    background: white;
    color: #0a0a0a;
    transform: translateY(-3px);
  }

  .btn-arrow {
    font-size: 1.2rem;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn:hover .btn-arrow {
    transform: translateX(5px);
  }

  .hero-scroll {
    position: absolute;
    right: 3rem;
    bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 0.9rem;
    color: white;
    opacity: 0.7;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .scroll-indicator {
    width: 2px;
    height: 60px;
    background: linear-gradient(to bottom, #0066cc, transparent);
    position: relative;
    overflow: hidden;
  }

  .scroll-indicator::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background: white;
    animation: scrollMove 2s ease-in-out infinite;
  }

  @keyframes scrollMove {
    0% { transform: translateY(-20px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(60px); opacity: 0; }
  }

  /* Enhanced Section Headers */
  .section-header {
    margin-bottom: 6rem;
    text-align: center;
    position: relative;
  }

  .section-number {
    font-size: 1rem;
    font-weight: 600;
    color: #0066cc;
    margin-bottom: 1rem;
    display: block;
    position: relative;
  }

  .section-number::after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(100% + 1rem);
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, #0066cc, transparent);
  }

  .section-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 300;
    margin-bottom: 2rem;
    letter-spacing: -0.03em;
    color: white;
    position: relative;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .section-subtitle {
    font-size: 1.2rem;
    opacity: 0.8;
    max-width: 700px;
    margin: 0 auto;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Enhanced Work Section */
  .work-section {
    width: 100%;
    padding: 8rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    position: relative;
    overflow: hidden;
  }

  .section-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 102, 204, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 102, 204, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
    gap: 3rem;
    position: relative;
    z-index: 2;
  }

  .work-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    backdrop-filter: blur(10px);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .work-item:hover::before {
    opacity: 1;
  }

  .work-item:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(0, 102, 204, 0.3);
    box-shadow: 0 20px 60px rgba(0, 102, 204, 0.2);
  }

  .work-image {
    width: 100%;
    height: 250px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .work-number {
    font-size: 4rem;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
  }

  .work-item:hover .work-number {
    transform: scale(1.2) rotate(12deg);
    color: rgba(0, 102, 204, 0.3);
  }

  .work-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.9), rgba(102, 204, 255, 0.8));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .work-item:hover .work-overlay {
    opacity: 1;
  }

  .view-project {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .project-arrow {
    color: white;
    font-size: 1.5rem;
    transform: translateX(-10px);
    transition: transform 0.3s ease;
  }

  .work-item:hover .project-arrow {
    transform: translateX(0);
  }

  .work-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 102, 204, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: rotate 10s linear infinite;
  }

  .work-item:hover .work-glow {
    opacity: 1;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .work-info {
    padding: 2rem;
    position: relative;
    z-index: 2;
  }

  .work-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-description {
    font-size: 1rem;
    opacity: 0.8;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .work-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .work-tech {
    color: #66ccff;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .work-year {
    opacity: 0.6;
    color: white;
    font-size: 0.9rem;
  }

  .work-cta {
    text-align: center;
    margin-top: 6rem;
    position: relative;
    z-index: 2;
  }

  /* Enhanced About Section */
  .about-section {
    width: 100%;
    padding: 8rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    position: relative;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 6rem;
    align-items: start;
  }

  .about-content {
    position: relative;
  }

  .about-text p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    opacity: 0.9;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
    position: relative;
  }

  .about-text p::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 0;
    width: 4px;
    height: 0;
    background: linear-gradient(to bottom, #0066cc, #66ccff);
    transition: height 0.8s ease;
  }

  .about-text p:hover::before {
    height: 100%;
  }

  .experience {
    margin-top: 4rem;
  }

  .experience h3 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    color: white;
    position: relative;
  }

  .experience h3::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0066cc, #66ccff);
    border-radius: 2px;
  }

  .experience-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .experience-item:hover {
    transform: translateX(10px);
  }

  .experience-dot {
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #0066cc, #66ccff);
    border-radius: 50%;
    margin-top: 0.5rem;
    position: relative;
    flex-shrink: 0;
  }

  .experience-dot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .experience-dot::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 2px;
    height: 60px;
    background: linear-gradient(to bottom, #0066cc, transparent);
    transform: translateX(-50%);
  }

  .experience-item:last-child .experience-dot::before {
    display: none;
  }

  .experience-content h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
  }

  .experience-content span {
    font-size: 0.9rem;
    color: #66ccff;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }

  .experience-content p {
    font-size: 1rem;
    opacity: 0.8;
    color: white;
    line-height: 1.6;
  }

  .about-sidebar {
    position: sticky;
    top: 2rem;
  }

  .about-image {
    margin-bottom: 4rem;
    position: relative;
  }
/*
  .image-placeholder {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
    margin: 0 auto;
    animation: floatPhoto 6s ease-in-out infinite;
  }

  .image-placeholder:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 15px 40px rgba(0, 102, 204, 0.3);
  }

  .image-placeholder::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(0, 102, 204, 0.1), transparent);
    animation: rotateGlow 8s linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .image-placeholder:hover::before {
    opacity: 1;
  }
  */
  @keyframes floatPhoto {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes rotateGlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
/*
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.2), transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.1rem;
    opacity: 0.6;
  }
*/




.profile-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top; /* This shifts the crop position */
  transition: all 0.5s ease;
  animation: floatPhoto 6s ease-in-out infinite;
  margin: 0 auto;
  display: block;
}


.profile-image:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 15px 40px rgba(0, 102, 204, 0.3);
}

.about-image::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 102, 204, 0.1), transparent);
  animation: rotateGlow 8s linear infinite;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.about-image:hover::before {
  opacity: 1;
}










  .skills-section h3 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    color: white;
  }

  .skill-category {
    margin-bottom: 2.5rem;
  }

  .skill-category h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #66ccff;
    position: relative;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .skill-tag {
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.2), rgba(102, 204, 255, 0.1));
    color: #66ccff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(0, 102, 204, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
  }

  .skill-tag:hover {
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.4), rgba(102, 204, 255, 0.2));
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
  }

  /* Enhanced Contact Section */
  .contact-section {
    width: 100%;
    padding: 8rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    position: relative;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    margin-top: 4rem;
  }

  .contact-form-section h3 {
    font-size: 1.8rem;
    margin-bottom: 3rem;
    color: white;
  }

  .contact-form {
    display: grid;
    gap: 2rem;
  }

  .form-group {
    position: relative;
  }

  .form-group label {
    font-size: 0.9rem;
    color: #66ccff;
    margin-bottom: 0.5rem;
    display: block;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #0066cc;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 102, 204, 0.2);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .form-group textarea {
    min-height: 120px;
    resize: vertical;
  }

  .contact-info {
    margin-bottom: 4rem;
  }

  .contact-item {
    margin-bottom: 2.5rem;
    transition: all 0.3s ease;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .contact-item:hover {
    transform: translateX(10px);
    border-bottom-color: rgba(0, 102, 204, 0.3);
  }

  .contact-item h4 {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #66ccff;
  }

  .contact-item a,
  .contact-item span {
    font-size: 1.1rem;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    display: block;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .contact-item a:hover {
    color: #66ccff;
  }

  .social-section {
    margin-bottom: 4rem;
  }

  .social-section h4 {
    font-size: 0.8rem;
    margin-bottom: 2rem;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #66ccff;
  }

  .social-links {
    display: grid;
    gap: 1rem;
  }

  .social-link {


  display: flex;
    align-items: center;
    gap: 1.5rem;
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 1rem 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .social-link:hover::before {
    left: 100%;
  }

  .social-link:hover {
    color: #66ccff;
    transform: translateX(15px);
    border-bottom-color: rgba(0, 102, 204, 0.3);
  }

  .social-number {
    font-size: 0.8rem;
    opacity: 0.4;
    min-width: 30px;
  }

  .social-text {
    flex: 1;
  }

  .social-arrow {
    font-size: 1.2rem;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  .social-link:hover .social-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .availability {
    padding: 2rem;
    background: linear-gradient(135deg, rgba(0, 102, 204, 0.1), rgba(102, 204, 255, 0.05));
    border: 1px solid rgba(0, 102, 204, 0.2);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .availability:hover {
    border-color: rgba(0, 102, 204, 0.4);
    transform: translateY(-2px);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    background: #00ff88;
    border-radius: 50%;
    position: relative;
    animation: statusPulse 2s infinite;
  }

  .status-dot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: rgba(0, 255, 136, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: statusRipple 2s infinite;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes statusRipple {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }

  .status-indicator span {
    font-size: 1rem;
    color: white;
    font-weight: 500;
  }

  /* Enhanced Footer */
  .footer {
    width: 100%;
    padding: 3rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #0066cc, transparent);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    flex-wrap: wrap;
    gap: 2rem;
    color: white;
  }

  .footer-links {
    display: flex;
    gap: 3rem;
  }

  .footer-links a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    opacity: 0.7;
    transition: all 0.3s ease;
    position: relative;
  }

  .footer-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: #0066cc;
    transition: width 0.3s ease;
  }

  .footer-links a:hover {
    opacity: 1;
    color: #66ccff;
  }

  .footer-links a:hover::after {
    width: 100%;
  }

  .custom-dropdown {
    position: relative;
  }

  .dropdown-trigger {
    width: 100%;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
  }

  .dropdown-trigger:hover,
  .dropdown-trigger.active {
    border-color: #0066cc;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 102, 204, 0.2);
  }

  .dropdown-arrow {
    transition: transform 0.3s ease;
  }

  .dropdown-trigger.active .dropdown-arrow {
    transform: rotate(180deg);
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 10, 0.95);
    border: 2px solid rgba(0, 102, 204, 0.3);
    border-radius: 12px;
    margin-top: 0.5rem;
    z-index: 1000;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .dropdown-option {
    padding: 1rem 1.2rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .dropdown-option:last-child {
    border-bottom: none;
  }

  .dropdown-option:hover {
    background: rgba(0, 102, 204, 0.2);
    color: #66ccff;
  }

  .contact-form button.btn.btn-primary {
    width: max-content;
    justify-self: start;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .container {
      padding: 0 2rem;
    }

    .hero-scroll {
      right: 2rem;
    }

    .floating-menu {
      right: 2rem;
    }

    .about-grid {
      gap: 4rem;
    }

    .contact-grid {
      gap: 4rem;
    }
  }

  @media (max-width: 900px) {
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
      width: 56px;
      height: 56px;
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
    }

    .work-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    }

    .hero-subtitle {
      flex-direction: column;
      gap: 1rem;
    }

    .location::before {
      display: none;
    }

    .location {
      padding-left: 0;
    }

    .menu-item {
      font-size: clamp(2rem, 5vw, 3rem);
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    .nav-container {
      padding: 1rem 1.5rem;
    }

    .hero {
      padding: 6rem 0 4rem;
      min-height: 100vh;
    }

    .hero-scroll {
      display: none;
    }

    .hero-actions {
      flex-direction: column;
      width: 100%;
      gap: 1rem;
    }

    .btn {
      width: auto;
      justify-content: center;
    }

    .work-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .floating-menu {
      top: 1rem;
      right: 1rem;
    }

    .floating-menu-button {
      width: 50px;
      height: 50px;
    }

    .section-title {
      font-size: clamp(2rem, 6vw, 3.5rem);
    }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 4rem);
    }

    .contact-form {
      gap: 1.5rem;
    }

    .social-links {
      gap: 0.5rem;
    }

    .footer-links {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }

    .nav-container {
      padding: 1rem;
    }

    .floating-menu {
      top: 0.5rem;
      right: 0.5rem;
    }

    .floating-menu-button {
      width: 44px;
      height: 44px;
    }

    .hero-badge {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
    }

    .btn {
      padding: 0.9rem 1.5rem;
      font-size: 0.9rem;
    }

    .work-image {
      height: 200px;
    }

    .work-number {
      font-size: 3rem;
    }

    .menu-item {
      font-size: 1.8rem;
      margin: 1rem 0;
      gap: 1rem;
    }

    .section-header {
      margin-bottom: 4rem;
    }

    .work-cta {
      margin-top: 4rem;
    }

    .image-placeholder {
      width: 250px;
      height: 250px;
    }

    .about-text p {
      font-size: 1.1rem;
    }

    .experience-item {
      gap: 1rem;
    }

    .skill-tags {
      gap: 0.5rem;
    }

    .skill-tag {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }

    .contact-text {
      font-size: 1.1rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 1rem;
    }

    .availability {
      padding: 1.5rem;
    }
  }

/* Desktop floating menu behavior - FIXED */
@media (min-width: 901px) {
  .floating-menu {
    display: none; /* Hidden by default on desktop */
  }
  
  .floating-menu.show-on-scroll {
    display: block; /* Only show when user scrolls */
  }
}

/* Show floating menu only on mobile (900px and below) */
@media (max-width: 900px) {
  .floating-menu {
    display: block; /* Always visible on mobile */
  }
  
  .nav-right-mobile {
    display: none !important;
  }
  
  .menu-toggle {
    display: none !important;
  }
}

  .menu-item:focus {
    outline: none;
    background: none;
    border: none;
    box-shadow: none;
  }

  .menu-item:focus-visible {
    outline: none;
  }

  /* Accessibility and Performance */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .magnetic-element {
      transition: none !important;
    }
  }

  /* Focus states for accessibility */
  .btn:focus,
  .nav-link:focus,
  .menu-item:focus,
  .social-link:focus,
  .floating-menu-button:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .btn {
      border-width: 3px;
    }
    
    .nav-link.active {
      background: #ffffff;
      color: #000000;
    }
    
    .skill-tag {
      border-width: 2px;
    }
  }

  /* Print styles */
  @media print {
    .nav,
    .floating-menu,
    .menu-overlay,
    .hero-scroll {
      display: none;
    }
    
    .hero {
      min-height: auto;
      padding: 2rem 0;
    }
    
    * {
      animation: none !important;
      transition: none !important;
    }
  }

  /* Ensure no content overflow on any device */
  html,
  body,
  #root,
  .portfolio {
    overflow-x: hidden;
    max-width: 100vw;
  }

  .container {
    max-width: min(1400px, 100vw);
  }

  /* Text breaking for all elements */
  * {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* Prevent specific elements from breaking */
  .skill-tag,
  .btn,
  .nav-link,
  .menu-item {
    hyphens: none;
  }

  /* Long URLs and emails should break */
  .contact-item a,
  .social-link,
  .hero-description,
  .work-description,
  .about-text p,
  .contact-text {
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

export default Portfolio;




  


































    
