import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt, FaEye, FaBrain } from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'

/*
  Projects Component
  ------------------
  Showcases your projects with animated cards.
  
  CARD HOVER EFFECT EXPLAINED:
  ----------------------------
  The project cards use multiple hover animations:
  
  1. Card lift: whileHover={{ y: -8 }} lifts the entire card up
  2. Image zoom: The image scales on card hover via CSS group-hover
  3. Overlay fade: A gradient overlay becomes visible on hover
  
  GROUP HOVER (Tailwind):
  -----------------------
  The "group" class on a parent lets you style children based on 
  parent hover state:
  
  <div className="group">           <- Parent has "group"
    <img className="group-hover:scale-110">  <- Child responds to parent hover
  </div>
  
  This is how the image zooms when you hover anywhere on the card!
*/

// Your project data - easy to edit!
const projects = [
    {
        id: 1,
        title: 'AI Proctoring System',
        description: 'Real-time exam monitoring system with face detection, eye tracking, and multiple person detection. Automatically flags suspicious behavior using AI.',
        tech: ['Python', 'OpenCV', 'Mediapipe', 'Flask', 'Machine Learning'],
        image: null, // Add image path later: '/project1.png'
        github: '#', // Add your GitHub link
        live: '#',   // Add live demo link
        featured: true,
        icon: FaBrain,
    },
    {
        id: 2,
        title: 'Linked List Visualizer',
        description: 'Interactive web tool for visualizing linked list operations with dynamic DOM updates. Perfect educational tool for beginners learning data structures.',
        tech: ['React.js', 'JavaScript', 'HTML/CSS'],
        image: null, // Add image path later
        github: '#',
        live: 'https://linkedlist-visualizer.netlify.app/',
        featured: true,
        icon: HiCode,
    },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="projects" className="bg-dark-950/50 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950/50 to-dark-900 pointer-events-none" />

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="section-container relative z-10"
            >
                {/* Section Title */}
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Some of the projects I've built to solve real problems
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            className="project-card group"
                        >
                            {/* Project Image / Placeholder */}
                            <div className="relative h-48 overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform 
                             duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    // Placeholder with gradient
                                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 
                                to-accent-400/20 flex items-center justify-center">
                                        <project.icon className="text-6xl text-primary-400/50 
                                           group-hover:text-primary-400 transition-colors" />
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 
                              via-transparent to-transparent opacity-60" />

                                {/* Featured badge */}
                                {project.featured && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full 
                                   bg-primary-500/20 text-primary-400 
                                   border border-primary-500/30">
                                            Featured
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 
                             group-hover:text-primary-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-dark-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs rounded-md bg-dark-900/80 
                               text-dark-300 border border-dark-700/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-dark-400 
                             hover:text-white transition-colors text-sm"
                                        whileHover={{ x: 3 }}
                                    >
                                        <FaGithub />
                                        <span>Code</span>
                                    </motion.a>

                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-dark-400 
                             hover:text-primary-400 transition-colors text-sm"
                                        whileHover={{ x: 3 }}
                                    >
                                        <FaExternalLinkAlt />
                                        <span>Live Demo</span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* More Projects Link */}
                <motion.div variants={cardVariants} className="text-center mt-12">
                    <motion.a
                        href="https://github.com/kbansal1111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-dark-400 
                     hover:text-primary-400 transition-colors"
                        whileHover={{ x: 5 }}
                    >
                        <FaEye />
                        <span>View more on GitHub</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Projects
