import { Code2, Palette, Lightbulb, Heart } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Clean Code', description: 'Writing maintainable, scalable solutions' },
  { icon: Palette, label: 'UI/UX Design', description: 'Creating intuitive user experiences' },
  { icon: Lightbulb, label: 'Problem Solver', description: 'Tackling complex challenges creatively' },
  { icon: Heart, label: 'Passion', description: 'Dedicated to continuous learning' },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">Get to Know Me</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">About Me</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate <span className="text-foreground font-medium">Full-Stack Developer</span> with extensive 
              experience in building modern web applications. My expertise spans across frontend frameworks like 
              <span className="text-primary"> React</span> and backend technologies including 
              <span className="text-primary"> Firebase</span>, <span className="text-primary">Node.js</span>, and 
              <span className="text-primary"> Django</span>.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              What drives me is the perfect blend of <span className="text-foreground font-medium">honesty and creativity</span>. 
              I believe in transparent communication with clients and creative problem-solving that pushes boundaries. 
              Every project is an opportunity to create something meaningful and impactful.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond coding, I have a keen eye for <span className="text-foreground font-medium">UI/UX design</span> and 
              enjoy crafting interfaces that are not only functional but also visually compelling. I'm also passionate 
              about technical writing and content creation, helping bridge the gap between complex technology and 
              user understanding.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['React', 'Firebase', 'TypeScript', 'Node.js', 'Python', 'UI/UX'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div 
                key={item.label}
                className="p-6 bg-card border border-border rounded-xl card-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
