import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Loader2, FileQuestion } from 'lucide-react';
import type { BlogPost } from '@/types/portfolio';

const formatTimestamp = (ts: BlogPost['publishedAt'] | BlogPost['createdAt']) => {
  if (!ts || typeof ts.toDate !== 'function') return '';
  return ts.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // Single-field query on `slug` — index-free. We verify `published`
        // client-side so unpublished drafts are never exposed.
        const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (cancelled) return;
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
        const found = docs.find((d) => d.published);
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to load blog post:', error);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <nav className="section-container flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-xl text-foreground">
            AA<span className="text-primary">.</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </Button>
        </nav>
      </header>

      <article className="py-24">
        <div className="section-container max-w-3xl">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : notFound ? (
            <div className="text-center py-16">
              <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">Post not found</h1>
              <p className="text-muted-foreground mb-6">
                This post doesn't exist or isn't published.
              </p>
              <Button variant="hero" size="sm" asChild>
                <Link to="/blog">Back to Blog</Link>
              </Button>
            </div>
          ) : (
            post && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                  <Calendar size={16} />
                  {formatTimestamp(post.publishedAt ?? post.createdAt)}
                </div>

                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full aspect-video object-cover rounded-xl mb-8"
                  />
                )}

                {post.excerpt && (
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* 
                  content is HTML authored in the admin rich-text editor (Tiptap).
                  It is trusted because only authenticated admins can write it
                  (enforced by Firestore rules). If you ever allow untrusted
                  authoring, sanitize this with DOMPurify before rendering.
                */}
                <div
                  className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-12 pt-8 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/blog">
                      <ArrowLeft size={16} /> Back to Blog
                    </Link>
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
