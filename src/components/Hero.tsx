import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import profileImage from '@/assets/profile.jpg';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow animation-delay-500" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-4 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Full-Stack Developer
            </p>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Abdulaziz<br />
              <span className="text-gradient">Aman</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 font-medium animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              "Honesty and Creativity"
            </p>
            
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Building exceptional digital experiences with modern technologies. 
              Passionate about clean code, intuitive design, and solving complex problems.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Linkedin size={22} />
              </a>
              <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-primary transition-colors p-2">
                <Mail size={22} />
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-card border border-border overflow-hidden">
                  <img 
                    src={profileImage} 
                    alt="Abdulaziz Aman" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
