import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
    HiMail, HiPhone, HiLocationMarker, HiPaperAirplane
} from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

/*
  Contact Component
  -----------------
  Contact information and optional form.
  
  FORM ANIMATION:
  ---------------
  The form uses focus animations on inputs:
  - The border glows when focused (via Tailwind focus: classes)
  - The send button has a hover effect with icon animation
  
  We're using local state (useState) to handle form inputs.
  For a real portfolio, you'd connect this to an email service
  like EmailJS, Formspree, or your own backend.
*/

// Contact info
const contactInfo = [
    {
        icon: HiMail,
        label: 'Email',
        value: 'kartikbansal9152@gmail.com',
        href: 'mailto:kartikbansal9152@gmail.com',
    },
    {
        icon: HiPhone,
        label: 'Phone',
        value: '+91 8273889824',
        href: 'tel:+918273889824',
    },
    {
        icon: HiLocationMarker,
        label: 'Location',
        value: 'Mathura, Uttar Pradesh, India',
        href: null,
    },
]

// Social links
const socialLinks = [
    {
        icon: HiMail,
        label: 'Email',
        href: 'mailto:kartikbansal9152@gmail.com',
        color: 'hover:text-red-400',
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/kbansal1111',
        color: 'hover:text-white',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kartik-bansal-85a34a289/',
        color: 'hover:text-blue-400',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://www.instagram.com/kartik_bansal_8273/',
        color: 'hover:text-pink-400',
    },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    /*
      WEB3FORMS INTEGRATION
      ---------------------
      1. Get Access Key from https://web3forms.com
      2. Add it to your .env file or Vercel Environment Variables:
         VITE_WEB3FORMS_ACCESS_KEY=your-key-here
    */
    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        // Check if key is available
        if (!WEB3FORMS_ACCESS_KEY) {
            alert("Please provide a Web3Forms Access Key in your environment variables.")
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact: Message from ${formData.name}`,
                }),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
        }

        setIsSubmitting(false)
    }

    return (
        <section id="contact" className="bg-dark-950/50 relative">
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
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                        Have a question or want to work together? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Left side - Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Contact Information
                            </h3>

                            <div className="space-y-4">
                                {contactInfo.map((info) => (
                                    <motion.div
                                        key={info.label}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="p-3 rounded-xl bg-primary-500/10">
                                            <info.icon className="text-xl text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-dark-500 text-sm">{info.label}</p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-dark-200 hover:text-primary-400 
                                   transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-dark-200">{info.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Connect With Me
                            </h3>

                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-xl bg-dark-800/50 border border-dark-700/50 
                             text-dark-400 ${social.color} transition-all duration-300
                             hover:border-primary-500/50`}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="text-2xl" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side - Contact Form */}
                    <motion.div variants={itemVariants}>
                        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Send a Message
                            </h3>

                            <div className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-dark-300 text-sm mb-2"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-dark-900/50 
                             border border-dark-700/50 text-white
                             placeholder-dark-500
                             focus:outline-none focus:border-primary-500 
                             focus:ring-2 focus:ring-primary-500/20
                             transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-dark-300 text-sm mb-2"
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-dark-900/50 
                             border border-dark-700/50 text-white
                             placeholder-dark-500
                             focus:outline-none focus:border-primary-500 
                             focus:ring-2 focus:ring-primary-500/20
                             transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Message Input */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-dark-300 text-sm mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-dark-900/50 
                             border border-dark-700/50 text-white
                             placeholder-dark-500 resize-none
                             focus:outline-none focus:border-primary-500 
                             focus:ring-2 focus:ring-primary-500/20
                             transition-all duration-300"
                                        placeholder="Your message here..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <HiPaperAirplane className="text-lg" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>

                                {/* Success Message */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-center"
                                    >
                                        ✅ Thanks for your message! I'll get back to you soon.
                                    </motion.div>
                                )}

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-center"
                                    >
                                        ❌ Something went wrong. Please try again or email me directly.
                                    </motion.div>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Contact
