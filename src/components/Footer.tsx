import { Github, Linkedin, Instagram, Send, Mail, Phone } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Send, href: 'https://t.me/username', label: 'Telegram' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#" className="font-display font-bold text-2xl text-foreground inline-block">
              Abdulaziz Aman<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Full-Stack Developer
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
            <a
              href="mailto:contact@abdulazizaman.com"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:+1234567890"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Abdulaziz Aman
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Honesty and Creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
