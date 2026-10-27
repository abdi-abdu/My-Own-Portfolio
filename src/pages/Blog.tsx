import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Loader2, FileText } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

const formatTimestamp = (ts: BlogPost['publishedAt'] | BlogPost['createdAt']) => {
  if (!ts || typeof ts.toDate !== 'function') return '';
  return ts.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Single-field equality filter only — keeps this index-free. We sort
        // client-side by publishedAt (falling back to createdAt).
        const q = query(collection(db, 'blogPosts'), where('published', '==', true));
        const snapshot = await getDocs(q);
        if (cancelled) return;
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
        docs.sort((a, b) => {
          const ta = (a.publishedAt ?? a.createdAt).toDate().getTime();
          const tb = (b.publishedAt ?? b.createdAt).toDate().getTime();
          return tb - ta;
        });
        setPosts(docs);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
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
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <nav className="section-container flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-xl text-foreground">
            AA<span className="text-primary">.</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </Button>
        </nav>
      </header>

      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2">Writing</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Blog</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Thoughts on web development, projects, and what I'm learning along the way.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden card-glow"
                >
                  {post.coverImage && (
                    <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      {formatTimestamp(post.publishedAt ?? post.createdAt)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
