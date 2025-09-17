'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GitHubIcon from './icons/GitHubIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import EmailIcon from './icons/EmailIcon'

export default function SocialIcons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        whileHover={{ scale: 1.1 }}
      >
        <GitHubIcon
          href="https://github.com/benuh"
          size="1.5rem"
          className="shadow-lg"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
        whileHover={{ scale: 1.1 }}
      >
        <LinkedInIcon
          href="https://www.linkedin.com/in/benjamin-hu-556104176/"
          size="1.5rem"
          className="shadow-lg"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <EmailIcon
          href="mailto:huchangcan@gmail.com"
          size="1.5rem"
          className="shadow-lg"
        />
      </motion.div>

      <Link href="/developer">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
          style={{
            backgroundColor: 'rgb(30, 41, 59)',
            color: 'rgb(250, 248, 246)'
          }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
        </motion.div>
      </Link>
    </div>
  )
}