import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiAcademicCap, HiLocationMarker, HiBookOpen } from 'react-icons/hi'

/*
  About Component
  ---------------
  Introduction section with education details.
  
  SCROLL ANIMATIONS - useInView EXPLAINED:
  ----------------------------------------
  useInView is a hook that detects when an element enters the viewport.
  
  How it works:
  1. Create a ref and attach it to an element
  2. useInView(ref) returns true when element is visible
  3. Use this to trigger animations when user scrolls to section
  
  Parameters:
  - once: true = animate only the first time it comes into view
  - margin: adds margin to detection area (negative = trigger earlier)
  - amount: how much of element must be visible (0.3 = 30%)
  
  This creates the "fade in on scroll" effect you wanted!
*/

// Animation variants for the section
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

function About() {
    // Ref for detecting when section is in view
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="about" className="bg-dark-950/50 relative">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950/50 to-dark-900 pointer-events-none" />

            <motion.div
                ref={ref}
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="section-container relative z-10"
            >
                {/* Section Title */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="section-title">About Me</h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Get to know me better
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left side - Bio */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <p className="text-lg text-dark-200 leading-relaxed">
                            I'm a passionate{' '}
                            <span className="text-primary-400 font-medium">
                                Computer Science student
                            </span>{' '}
                            with a love for building software that makes a difference.
                            Currently in my pre-final year at G.L.A. University, I spend
                            my time exploring new technologies and creating projects that
                            solve real-world problems.
                        </p>

                        <p className="text-lg text-dark-300 leading-relaxed">
                            My interests span from{' '}
                            <span className="text-accent-400">AI and Machine Learning</span>{' '}
                            to full-stack web development. I believe in writing clean,
                            maintainable code and constantly learning new skills.
                        </p>

                        {/* Location tag */}
                        <div className="flex items-center gap-2 text-dark-400">
                            <HiLocationMarker className="text-primary-400" />
                            <span>Mathura, Uttar Pradesh, India</span>
                        </div>
                    </motion.div>

                    {/* Right side - Education Card */}
                    <motion.div variants={itemVariants}>
                        <div className="glass-card p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-primary-500/10">
                                    <HiAcademicCap className="text-2xl text-primary-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Education</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Degree */}
                                <div>
                                    <h4 className="text-lg font-medium text-white">
                                        B.Tech in Computer Science & Engineering
                                    </h4>
                                    <p className="text-primary-400 font-medium">
                                        G.L.A. University, Mathura
                                    </p>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 rounded-lg bg-dark-900/50">
                                        <p className="text-dark-400">CPI</p>
                                        <p className="text-white font-semibold">7.71 / 10</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-dark-900/50">
                                        <p className="text-dark-400">Expected Graduation</p>
                                        <p className="text-white font-semibold">June 2027</p>
                                    </div>
                                </div>

                                {/* Coursework */}
                                <div className="pt-4 border-t border-dark-700/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <HiBookOpen className="text-accent-400" />
                                        <span className="text-dark-300 text-sm font-medium">
                                            Relevant Coursework
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Data Structures & Algorithms', 'Operating Systems', 'DBMS'].map(
                                            (course) => (
                                                <span
                                                    key={course}
                                                    className="px-3 py-1 text-xs rounded-full 
                                   bg-dark-800 text-dark-300 border border-dark-700"
                                                >
                                                    {course}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default About
