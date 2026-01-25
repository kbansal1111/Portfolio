import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    FaJava, FaPython, FaReact, FaDatabase, FaGitAlt
} from 'react-icons/fa'
import {
    SiJavascript, SiFlask, SiOpencv, SiMysql,
    SiPostgresql, SiMongodb, SiMediapipe
} from 'react-icons/si'

/*
  Skills Component
  ----------------
  Displays skills organized by category with animated cards.
  
  HOVER ANIMATIONS - whileHover EXPLAINED:
  ----------------------------------------
  whileHover is a Framer Motion prop that defines animation state 
  when the mouse hovers over an element.
  
  Examples:
  - whileHover={{ scale: 1.05 }} = Grow to 105% on hover
  - whileHover={{ y: -5 }} = Move up 5px on hover
  - whileHover={{ rotate: 5 }} = Rotate 5 degrees on hover
  
  The transition is automatic and smooth!
  
  STAGGER ANIMATION EXPLAINED:
  ----------------------------
  staggerChildren creates a cascading effect:
  - Parent container controls the timing
  - Each child animates one after another
  - staggerChildren: 0.1 = 100ms delay between each child
  
  This makes the skills "reveal" one by one as you scroll!
*/

// Skill data organized by category
// You can easily edit this to add/remove skills!
const skillCategories = [
    {
        title: 'Languages',
        skills: [
            { name: 'Java', icon: FaJava, color: 'text-red-400' },
            { name: 'Python', icon: FaPython, color: 'text-yellow-400' },
            { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-300' },
        ],
    },
    {
        title: 'Frameworks & Tools',
        skills: [
            { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
            { name: 'Flask', icon: SiFlask, color: 'text-gray-300' },
            { name: 'OpenCV', icon: SiOpencv, color: 'text-green-400' },
            { name: 'Mediapipe', icon: SiMediapipe, color: 'text-blue-400' },
            { name: 'Git', icon: FaGitAlt, color: 'text-orange-400' },
        ],
    },
    {
        title: 'Databases',
        skills: [
            { name: 'MySQL', icon: SiMysql, color: 'text-blue-400' },
            { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-300' },
            { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
        ],
    },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, staggerChildren: 0.08 },
    },
}

const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 },
    },
}

function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="skills" className="relative">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Title */}
                <motion.div variants={categoryVariants} className="text-center mb-16">
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Technologies I work with to bring ideas to life
                    </p>
                </motion.div>

                {/* Skills Categories */}
                <div className="space-y-12">
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={categoryVariants}
                            className="text-center"
                        >
                            {/* Category Title */}
                            <h3 className="text-xl font-semibold text-dark-200 mb-6 
                           inline-flex items-center gap-2">
                                <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary-500" />
                                {category.title}
                                <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary-500" />
                            </h3>

                            {/* Skills Grid */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={skillVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="skill-card flex items-center gap-3 cursor-default"
                                    >
                                        {/* Skill Icon */}
                                        <skill.icon className={`text-2xl ${skill.color}`} />

                                        {/* Skill Name */}
                                        <span className="text-dark-200 font-medium">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Spoken Languages */}
                <motion.div variants={categoryVariants} className="mt-12 text-center">
                    <h3 className="text-xl font-semibold text-dark-200 mb-6 
                       inline-flex items-center gap-2">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-accent-400" />
                        Spoken Languages
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-accent-400" />
                    </h3>
                    <div className="flex justify-center gap-4">
                        {['English', 'Hindi'].map((lang) => (
                            <motion.span
                                key={lang}
                                variants={skillVariants}
                                whileHover={{ scale: 1.05 }}
                                className="px-6 py-3 rounded-xl bg-dark-800/50 border border-dark-700/50
                         text-dark-200 font-medium"
                            >
                                {lang}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Skills
