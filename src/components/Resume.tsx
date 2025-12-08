import { Download, FileText } from 'lucide-react';
import { Button } from './ui/button';

const Resume = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-6 card-glow">
            <FileText className="text-primary" size={36} />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Download My Resume
          </h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Get a detailed overview of my experience, skills, and qualifications. 
            Available in PDF format for your convenience.
          </p>
          
          <Button variant="hero" size="xl" asChild>
            {/* TODO: Add actual CV file path when available */}
            <a href="#" download="Abdulaziz_Aman_CV.pdf">
              <Download size={20} />
              Download CV
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: December 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resume;
