import { useState, useEffect } from "react";
import { api, ContactMessage } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Trash2, Eye, Mail, Phone, Building, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const AdminMessages = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const { toast } = useToast();

    const fetchMessages = async () => {
        try {
            const data = await api.getMessages();
            setMessages(data);
        } catch (error) {
            console.error("Failed to load messages");
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const markRead = async (id: number) => {
        try {
            await api.markMessageRead(id);
            // Update local state to reflect change without full reload
            setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, read: true });
            }
        } catch (error) {
            console.error("Failed to mark as read");
        }
    };

    const deleteMsg = async (id: number) => {
        if (!confirm("Delete this message permanently?")) return;
        try {
            await api.deleteMessage(id);
            toast({ title: "Deleted", description: "Message removed" });
            setMessages(messages.filter(m => m.id !== id));
            setSelectedMessage(null); // Close modal if deleted
        } catch (error) {
            toast({ title: "Error", description: "Delete failed", variant: "destructive" });
        }
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Inbox</h1>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No messages found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            messages.map((msg) => (
                                <TableRow
                                    key={msg.id}
                                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${!msg.read ? "bg-blue-50/50 font-medium" : ""}`}
                                    onClick={() => setSelectedMessage(msg)}
                                >
                                    <TableCell>
                                        {!msg.read ? (
                                            <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">New</Badge>
                                        ) : (
                                            <Badge variant="secondary">Read</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold">{msg.name}</div>
                                        <div className="text-xs text-muted-foreground">{msg.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {msg.subject}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button size="icon" variant="ghost" onClick={() => setSelectedMessage(msg)} title="View Details">
                                            <Eye className="w-4 h-4 text-primary" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => deleteMsg(msg.id)} title="Delete">
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* MESSAGE DETAILS MODAL */}
            <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    {selectedMessage && (
                        <>
                            <DialogHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <DialogTitle className="text-2xl">{selectedMessage.subject}</DialogTitle>
                                        <DialogDescription className="mt-1 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(selectedMessage.createdAt).toLocaleString()}
                                        </DialogDescription>
                                    </div>
                                    {!selectedMessage.read && (
                                        <Button size="sm" onClick={() => markRead(selectedMessage.id)}>
                                            <CheckCircle className="w-4 h-4 mr-2" /> Mark Read
                                        </Button>
                                    )}
                                </div>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                {/* Sender Info Card */}
                                <Card className="bg-muted/30">
                                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                                {selectedMessage.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{selectedMessage.name}</p>
                                                <p className="text-xs text-muted-foreground">Sender</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">{selectedMessage.email}</a>
                                            </div>
                                            {selectedMessage.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                                    <span>{selectedMessage.phone}</span>
                                                </div>
                                            )}
                                            {selectedMessage.company && (
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-4 h-4 text-muted-foreground" />
                                                    <span className="font-medium">{selectedMessage.company}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Full Message Body */}
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Message</h4>
                                    <div className="p-4 rounded-lg border bg-background whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                                    Close
                                </Button>
                                <Button variant="destructive" onClick={() => deleteMsg(selectedMessage.id)}>
                                    Delete Message
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminMessages;