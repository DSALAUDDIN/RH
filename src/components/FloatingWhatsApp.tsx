'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/8801775227902"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="wa-pulse-ring" />
      <div className="wa-icon-container">
        <MessageCircle size={28} color="#fff" />
      </div>
      <span className="wa-tooltip">Chat with us</span>
    </motion.a>
  );
}
