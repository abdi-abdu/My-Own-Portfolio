import { ExternalLink, Github, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'SmartTasker',
    description: 'A powerful task management application with real-time collaboration and smart categorization.',
    features: ['Real-time sync', 'Team collaboration', 'Smart notifications', 'Progress tracking'],
    technologies: ['React', 'Firebase Auth', 'Firestore', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'EduLearn',
    description: 'An interactive e-learning platform with video courses, quizzes, and progress tracking.',
    features: ['Video streaming', 'Interactive quizzes', 'Certificate generation', 'Progress analytics'],
    technologies: ['React', 'Firebase', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'FinTrack',
    description: 'Real-time personal finance dashboard with expense tracking and budget management.',
    features: ['Real-time updates', 'Budget planning', 'Expense categories', 'Visual reports'],
    technologies: ['React', 'Firestore', 'Chart.js', 'Firebase Auth'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Shoply',
    description: 'A modern e-commerce platform with cart management, payments, and order tracking.',
    features: ['Product catalog', 'Cart & checkout', 'Order management', 'User reviews'],
    technologies: ['React', 'Firebase', 'Stripe API', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Featured Projects</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of full-stack applications built with modern technologies and best practices.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article 
              key={project.title}
              className="group p-6 bg-card border border-border rounded-xl card-glow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View GitHub repository"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View live demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Features:</p>
                <ul className="grid grid-cols-2 gap-1">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button variant="hero" size="sm" className="flex-1" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    GitHub Code
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
