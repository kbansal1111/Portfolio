import { motion } from 'framer-motion'
import { HiDownload, HiMail } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

/*
  Hero Component
  --------------
  The landing section - first thing visitors see!
  
  ANIMATION BREAKDOWN:
  --------------------
  1. Container animation with staggerChildren:
     - staggerChildren: 0.1 means each child animates 0.1s after the previous
     - This creates a cascading effect
  
  2. Individual element animations:
     - Each element has initial (start) and animate (end) states
     - The parent controls timing with variants
  
  3. Floating animation:
     - Uses animate with repeat: Infinity for continuous motion
     - Creates subtle floating effect for visual interest
  
  TAILWIND CLASSES USED:
  ----------------------
  - min-h-screen: Makes section at least full viewport height
  - flex items-center justify-center: Centers content vertically and horizontally
  - text-5xl sm:text-6xl lg:text-7xl: Responsive font sizes
  - gradient-text: Our custom gradient text class from index.css
  - gap-4: Space between flex/grid items (1rem = 16px)
*/

// Animation variants for container (orchestrates children animations)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Each child animates 0.15s after the previous
            delayChildren: 0.2,    // Wait 0.2s before starting
        },
    },
}

// Animation variants for individual items
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
        },
    },
}

function Hero() {
    // Smooth scroll to contact section
    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Background gradient orbs for visual interest */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Purple gradient orb - top right */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 
                     rounded-full blur-3xl"
                />
                {/* Cyan gradient orb - bottom left */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/20 
                     rounded-full blur-3xl"
                />
            </div>

            {/* Main content container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="section-container text-center relative z-10"
            >
                {/* Greeting tag */}
                <motion.div variants={itemVariants} className="mb-6">
                    <span className="px-4 py-2 rounded-full text-sm font-medium 
                         bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        👋 Welcome to my portfolio
                    </span>
                </motion.div>

                {/* Main heading with gradient text */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                     leading-tight mb-6"
                >
                    Hi, I'm{' '}
                    <span className="gradient-text">Kartik Bansal</span>
                </motion.h1>

                {/* Subtitle / Role */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl sm:text-2xl md:text-3xl text-dark-300 mb-4"
                >
                    Computer Science Student &{' '}
                    <span className="text-accent-400">Software Developer</span>
                </motion.p>

                {/* Short description */}
                <motion.p
                    variants={itemVariants}
                    className="text-dark-400 text-lg max-w-2xl mx-auto mb-8"
                >
                    Passionate about building innovative solutions using AI, web technologies,
                    and clean code. Currently pursuing B.Tech at G.L.A. University.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <motion.a
                        href="kartik bansal.pdf"
                        download
                        className="btn-primary inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiDownload className="text-lg" />
                        Download Resume
                    </motion.a>

                    <motion.button
                        onClick={scrollToContact}
                        className="btn-secondary inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiMail className="text-lg" />
                        Contact Me
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-6"
                >
                    <motion.a
                        href="https://github.com/kbansal1111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-400 hover:text-white text-2xl 
                     transition-colors duration-300"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/kartik-bansal-85a34a289/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-400 hover:text-white text-2xl 
                     transition-colors duration-300"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-dark-600 
                     flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-2 bg-dark-400 rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
