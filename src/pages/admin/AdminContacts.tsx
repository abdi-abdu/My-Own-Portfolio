import { useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import type { ContactSubmission } from '@/types/portfolio';

const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setContacts(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission))
      );
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { read: true });
      toast({ title: 'Marked as read' });
      fetchContacts();
    } catch (error) {
      toast({ title: 'Error updating message', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await deleteDoc(doc(db, 'contacts', id));
      toast({ title: 'Message deleted' });
      fetchContacts();
    } catch (error) {
      toast({ title: 'Error deleting message', variant: 'destructive' });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Contact Messages</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 
            ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
            : 'All messages have been read'
          }
        </p>
      </div>

      {contacts.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No contact messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card 
              key={contact.id} 
              className={`bg-card border-border transition-colors ${
                !contact.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {contact.name}
                      {!contact.read && (
                        <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          New
                        </span>
                      )}
                    </CardTitle>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    {!contact.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(contact.id)}
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{contact.message}</p>
                <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(contact.createdAt)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
