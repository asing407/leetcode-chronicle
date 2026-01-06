import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="font-bold text-lg text-primary-foreground">LC</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">LeetCode Portfolio</p>
              <p className="text-sm text-muted-foreground">
                A way to keep track and prepare for your interviews and upskill your coding skills!
              </p>
            </div>
          </motion.div>

          {/* Center - Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/asing407"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
            <a
              href="https://linkedin.com/in/anshumaansingh98"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/asing407"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              LeetCode Profile
            </a>
          </motion.div>

          {/* Right - Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} Anshumaan Singh. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
