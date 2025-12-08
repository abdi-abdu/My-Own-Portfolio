const skillCategories = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Firebase', 'Node.js', 'Express', 'Django', 'PHP'],
  },
  {
    title: 'Databases',
    skills: ['Firestore', 'MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Firebase', 'Linux', 'VS Code', 'Figma'],
  },
  {
    title: 'Other',
    skills: ['UI/UX Design', 'Content Writing', 'Script Writing', 'API Design'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-card/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">What I Work With</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Skills & Technologies</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="p-6 bg-card border border-border rounded-xl card-glow"
            >
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
