import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

/*
  Navbar Component
  ----------------
  A sticky/floating navigation bar that:
  - Stays at the top while scrolling
  - Changes background on scroll (glassmorphism effect)
  - Has smooth scroll to sections
  - Mobile responsive with hamburger menu
  
  FRAMER MOTION EXPLAINED:
  ------------------------
  motion.nav: A special version of <nav> that can be animated
  
  initial: The starting state before animation
  animate: The ending state to animate to
  transition: Controls the animation timing
  
  Example:
  initial={{ opacity: 0, y: -20 }}  // Start invisible and 20px above
  animate={{ opacity: 1, y: 0 }}    // Animate to visible and normal position
  transition={{ duration: 0.5 }}     // Take 0.5 seconds
*/

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
]

function Navbar() {
    // State for mobile menu open/close
    const [isOpen, setIsOpen] = useState(false)

    // State to track if user has scrolled (for navbar background)
    const [scrolled, setScrolled] = useState(false)

    // Listen for scroll events to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            // If scrolled more than 50px, add background
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)

        // Cleanup: remove listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smooth scroll to section when clicking a nav link
    const handleClick = (e, href) => {
        e.preventDefault()
        setIsOpen(false) // Close mobile menu

        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-dark-900/80 backdrop-blur-lg border-b border-dark-800/50 shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo / Name */}
                    <motion.a
                        href="#home"
                        onClick={(e) => handleClick(e, '#home')}
                        className="text-xl sm:text-2xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Kartik.
                    </motion.a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className="px-4 py-2 text-dark-300 hover:text-white rounded-lg
                         hover:bg-dark-800/50 transition-all duration-200"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white
                     hover:bg-dark-800/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <motion.div
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-dark-900/95 backdrop-blur-lg 
                   border-b border-dark-800/50"
            >
                <div className="px-4 py-4 space-y-2">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className="block px-4 py-3 text-dark-300 hover:text-white rounded-lg
                       hover:bg-dark-800/50 transition-all duration-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    )
}

export default Navbar
