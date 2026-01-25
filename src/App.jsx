import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

/*
  App Component
  -------------
  This is the main component that brings together all sections of your portfolio.
  
  Structure:
  - Navbar: Fixed navigation at the top
  - Hero: Your landing section with animated intro
  - About: Introduction and education
  - Skills: Your technical skills
  - Projects: Showcase of your work
  - Experience: Work experience/internships
  - Contact: Ways to reach you
  
  Each component is in its own file for easy editing!
*/
function App() {
    return (
        <div className="min-h-screen bg-dark-900">
            {/* Navbar stays fixed at the top */}
            <Navbar />

            {/* Main content sections */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-dark-400 border-t border-dark-800">
                <p>© 2025 Kartik Bansal. Built with React & Tailwind CSS</p>
            </footer>
        </div>
    )
}

export default App
