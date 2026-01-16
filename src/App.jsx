import { useEffect, useState } from 'react'
import ScrollReveal from 'scrollreveal'
import './App.css'
import Typed from 'typed.js'
import Typing from "./Typing"

import myHomeImage from './assets/home.png'
import myAboutImage from './assets/about copy.png'

function App() {

  const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-backend-production-7962.up.railway.app//api";

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [socials, setSocials] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Message sent!");
        setData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    // Fetch Dynamic Content
    fetch(`${API_URL}/content/socials`).then(res => res.json()).then(setSocials);
    fetch(`${API_URL}/content/services`).then(res => res.json()).then(setServices);
    fetch(`${API_URL}/content/projects`).then(res => res.json()).then(setProjects);

    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.header .navbar a')
    const header = document.querySelector('.header')
    const menuIcon = document.querySelector('#menu-icon')
    const navbar = document.querySelector('.navbar')

    const handleScroll = () => {
      header?.classList.toggle('sticky', window.scrollY > 100)

      sections.forEach(sec => {
        const top = window.scrollY
        const offset = sec.offsetTop - 150
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => link.classList.remove('active'))
          document
            .querySelector(`.header .navbar a[href*="${id}"]`)
            ?.classList.add('active')
        }
      })

      menuIcon?.classList.remove('bx-x')
      navbar?.classList.remove('active')
    }

    const handleMenuClick = () => {
      menuIcon?.classList.toggle('bx-x')
      navbar?.classList.toggle('active')
    }

    window.addEventListener('scroll', handleScroll)
    menuIcon?.addEventListener('click', handleMenuClick)

    ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
    })

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' })
    ScrollReveal().reveal(
      '.home-image, .services-container, .portfolio-box, .contact form',
      { origin: 'bottom' }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
      menuIcon?.removeEventListener('click', handleMenuClick)
    }
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <a href="#home" className="logo">Portfolio</a>
        <i className="bx bx-menu" id="menu-icon"></i>

        <nav className="navbar">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HOME */}
      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, it's me</h3>
          <h1>John Doe</h1>
          <h3>And I'm a <span className="typing"><Typing /></span></h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <div className="social-media">
            {socials.map(social => (
              <a key={social._id} href={social.url} target="_blank" rel="noreferrer"><i className={social.icon}></i></a>
            ))}
          </div>

          <a href="#" className="btn">Download CV</a>
        </div>

        <div className="home-image">
          <img src={myHomeImage} alt="Home" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-image">
          <img src={myAboutImage} alt="About" />
        </div>

        <div className="about-content">
          <h2 className="heading">About <span>Me</span></h2>
          <h3>Frontend Developer</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <a href="#" className="btn">Read More</a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <h2 className="heading">Our <span>Services</span></h2>

        <div className="services-container">
          {services.map(service => (
            <div className="services-box" key={service._id}>
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className="btn">Read More</a>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="portfolio" id="portfolio">
        <h2 className="heading">Latest <span>Projects</span></h2>

        <div className="portfolio-container">
          {projects.map((project) => (
            <div className="portfolio-box" key={project._id}>
              <img src={project.image} alt={project.title} />
              <div className="portfolio-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer"><i className='bx bx-link-external'></i></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <h2 className="heading">Contact <span>Me</span></h2>

        <form onSubmit={submit}>
          <div className="input-box">
            <input type="text" placeholder="Full Name" name="name" value={data.name} onChange={handleChange} required />
            <input type="email" placeholder="Email Address" name="email" value={data.email} onChange={handleChange} required />
          </div>

          <div className="input-box">
            <input type="tel" placeholder="WhatsApp Number" name="phone" value={data.phone} onChange={handleChange} required />
            <input type="text" placeholder="Subject" name="subject" value={data.subject} onChange={handleChange} required />
          </div>

          <textarea cols="30" rows="10" placeholder="Your Message" name="message" value={data.message} onChange={handleChange} required></textarea>
          <input type="submit" value="Send Message" className="btn" />
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-text">
          <p>© {currentYear} by Cryptlord | All Rights Reserved</p>
        </div>

        <div className="footer-icontop">
          <a href="#home"><i className='bx bx-up-arrow-alt'></i></a>
        </div>
      </footer>
    </>
  )
}

export default App
