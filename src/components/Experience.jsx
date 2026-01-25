import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi'

/*
  Experience Component
  --------------------
  Displays work experience in a timeline/card format.
  
  TIMELINE ANIMATION:
  -------------------
  The timeline line uses a scaleY animation that grows from 0 to 1.
  Combined with transform-origin: top, it creates a "drawing" effect
  as if the line is being drawn from top to bottom.
  
  Each experience card slides in from the left with a stagger delay,
  creating a nice cascading effect as you scroll.
*/

// Your experience data - add more entries as you gain experience!
const experiences = [
    {
        id: 1,
        role: 'Full Stack Python Developer Intern',
        company: 'Bigfat AI',
        location: 'Noida, India (Remote)',
        period: 'Dec 2025 - Present',
        description: [
            'Developing full-stack applications as part of the in-house IT team',
            'Working with Python and modern web technologies',
            'Collaborating on AI-powered projects and solutions',
        ],
        current: true,
    },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
}

function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="experience" className="relative">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Title */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="section-title">Experience</h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        My professional journey so far
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto relative">
                    {/* Animated timeline line */}
                    <motion.div
                        variants={lineVariants}
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px 
                     bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent
                     origin-top hidden md:block"
                    />

                    {/* Experience Cards */}
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'
                                }`}
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="hidden md:block absolute top-8 w-4 h-4 rounded-full 
                         bg-primary-500 border-4 border-dark-900 shadow-lg shadow-primary-500/30
                         left-0 md:left-auto md:-translate-x-1/2"
                                style={{
                                    [index % 2 === 0 ? 'left' : 'right']: '-8px',
                                }}
                            />

                            {/* Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-6 relative"
                            >
                                {/* Current badge */}
                                {exp.current && (
                                    <div className="absolute -top-2 -right-2">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full 
                                   bg-green-500/20 text-green-400 border border-green-500/30">
                                            Current
                                        </span>
                                    </div>
                                )}

                                {/* Role & Company */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-primary-500/10 shrink-0">
                                        <HiBriefcase className="text-xl text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {exp.role}
                                        </h3>
                                        <p className="text-primary-400 font-medium">
                                            {exp.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-4">
                                    <span className="flex items-center gap-1">
                                        <HiCalendar className="text-dark-500" />
                                        {exp.period}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <HiLocationMarker className="text-dark-500" />
                                        {exp.location}
                                    </span>
                                </div>

                                {/* Description */}
                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-dark-300 text-sm flex items-start gap-2"
                                        >
                                            <span className="text-primary-400 mt-1">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* More experience note */}
                <motion.p
                    variants={itemVariants}
                    className="text-center text-dark-500 mt-8"
                >
                    🚀 More experiences coming as I continue my journey...
                </motion.p>
            </motion.div>
        </section>
    )
}

export default Experience
