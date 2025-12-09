import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, FileText, Mail, Eye } from 'lucide-react';
import type { Project, BlogPost, ContactSubmission } from '@/types/portfolio';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    publishedPosts: 0,
    unreadMessages: 0,
  });
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get projects count
        const projectsSnap = await getDocs(collection(db, 'projects'));
        
        // Get blog posts count
        const blogSnap = await getDocs(collection(db, 'blogPosts'));
        const publishedSnap = await getDocs(
          query(collection(db, 'blogPosts'), where('published', '==', true))
        );
        
        // Get unread messages count
        const unreadSnap = await getDocs(
          query(collection(db, 'contacts'), where('read', '==', false))
        );
        
        // Get recent contacts
        const recentSnap = await getDocs(
          query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(5))
        );
        
        setStats({
          projects: projectsSnap.size,
          blogPosts: blogSnap.size,
          publishedPosts: publishedSnap.size,
          unreadMessages: unreadSnap.size,
        });
        
        setRecentContacts(
          recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission))
        );
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-400' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'text-green-400' },
    { title: 'Published Posts', value: stats.publishedPosts, icon: Eye, color: 'text-purple-400' },
    { title: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'text-orange-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    contact.read ? 'border-border bg-secondary/20' : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{contact.name}</span>
                      {!contact.read && (
                        <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                    <p className="text-sm mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
