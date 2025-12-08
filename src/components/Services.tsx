import { Layout, Database, Layers, Palette, Plug, FileText } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'Frontend Development',
    description: 'Building responsive, performant, and accessible web interfaces using React and modern CSS frameworks.',
  },
  {
    icon: Database,
    title: 'Firebase Backend',
    description: 'Complete Firebase integration including Authentication, Firestore, Cloud Functions, and Hosting.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Applications',
    description: 'End-to-end development from database design to deployment, delivering complete web solutions.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually appealing interfaces with focus on user experience and accessibility.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Seamless integration with third-party APIs, payment gateways, and external services.',
  },
  {
    icon: FileText,
    title: 'Technical Writing',
    description: 'Clear documentation, tutorials, and content that makes complex technology understandable.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-card/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">What I Offer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Services</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Professional services tailored to bring your digital vision to life.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group p-6 bg-card border border-border rounded-xl card-glow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
