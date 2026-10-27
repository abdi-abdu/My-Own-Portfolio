import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, Loader2 } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from './ui/button';

type Project = {
  id: string;
  title: string;
  description: string;
  featuredImage?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

// Shown only while Firestore has no projects (e.g. before you add any in the
// admin panel at /admin/projects). Once projects exist in Firestore, those
// take over the live site. Also used as a fallback if a Firestore read fails.
const fallbackProjects: Project[] = [
  {
    id: 'fallback-hu-anti-club',
    title: 'HU Anti-Drug Club System',
    description:
      "A full-stack web system for Haramaya University's Anti-Drug Club, handling member management, awareness events, educational content, and anonymous student support.",
    techStack: ['React', 'Firebase', 'Firestore', 'Tailwind CSS'],
    liveUrl: 'https://hu-anti-club.vercel.app',
    githubUrl: 'https://github.com/abdi-abdu/HU-Anti-Club',
    featured: true,
  },
  {
    id: 'fallback-accounting-app',
    title: 'Accounting & Inventory App',
    description:
      'A multilingual, offline-first Flutter mobile app for small business accounting and inventory management, syncing to the cloud through Supabase.',
    techStack: ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'Drift'],
    githubUrl: 'https://github.com/abdi-abdu/Accounting-App',
  },
  {
    id: 'fallback-d-sdas',
    title: 'D-SDAS: Department Allocation System',
    description:
      'A bilingual (English/Amharic) web app that helps Haramaya University students view department allocation probabilities and make binding program choices.',
    techStack: ['Vanilla JS (ES6+)', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/abdi-abdu/D-SDAS-Haramaya-university',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (cancelled) return;
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
        setProjects(docs.length > 0 ? docs : fallbackProjects);
      } catch (error) {
        console.error('Failed to load projects from Firestore, using fallback:', error);
        if (!cancelled) setProjects(fallbackProjects);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Featured Projects</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A selection of real-world applications built with modern technologies and best practices.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group p-6 bg-card border border-border rounded-xl card-glow flex flex-col"
              >
                {project.featuredImage && (
                  <div className="mb-4 aspect-video rounded-lg overflow-hidden">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                    {project.title}
                    {project.featured && (
                      <span
                        title="Featured"
                        className="flex items-center gap-1 text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full font-medium"
                      >
                        <Star size={12} /> Featured
                      </span>
                    )}
                  </h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <Github size={18} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.techStack ?? []).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button variant="hero" size="sm" className="flex-1" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        View Live
                      </a>
                    </Button>
                  )}
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
        )}
      </div>
    </section>
  );
};

export default Projects;
