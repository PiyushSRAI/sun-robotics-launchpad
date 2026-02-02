import { useState, useEffect } from "react";
import { api, Job } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AdminJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState<Job>({
        title: "", department: "", location: "", type: "Full-time",
        description: "", requirements: "", active: true
    });

    const fetchJobs = async () => {
        try {
            const data = await api.getAllJobsAdmin();
            setJobs(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleSubmit = async () => {
        try {
            if (editingJob && editingJob.id) {
                await api.updateJob(editingJob.id, formData);
                toast({ title: "Success", description: "Job updated successfully" });
            } else {
                await api.createJob(formData);
                toast({ title: "Success", description: "Job created successfully" });
            }
            setIsOpen(false);
            setEditingJob(null);
            resetForm();
            fetchJobs();
        } catch (error) {
            toast({ title: "Error", description: "Operation failed", variant: "destructive" });
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await api.deleteJob(id);
            toast({ title: "Deleted", description: "Job removed" });
            fetchJobs();
        } catch (error) {
            toast({ title: "Error", description: "Delete failed", variant: "destructive" });
        }
    };

    const resetForm = () => {
        setFormData({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: "", active: true });
    };

    const openEdit = (job: Job) => {
        setEditingJob(job);
        setFormData(job);
        setIsOpen(true);
    };

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Jobs</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingJob(null); resetForm(); }}>Add New Job</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingJob ? "Edit Job" : "Create Job"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                                <Input placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                            </div>
                            <Input placeholder="Type (e.g., Full-time, Remote)" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
                            <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                            <Textarea placeholder="Requirements" value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} />
                            <div className="flex items-center space-x-2">
                                <Switch checked={formData.active} onCheckedChange={(c) => setFormData({...formData, active: c})} />
                                <Label>Active Listing</Label>
                            </div>
                            <Button onClick={handleSubmit}>Save Job</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.department}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${job.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    {job.active ? "Active" : "Inactive"}
                                </span>
                            </TableCell>
                            <TableCell className="space-x-2">
                                <Button variant="outline" size="sm" onClick={() => openEdit(job)}>Edit</Button>
                                <Button variant="destructive" size="sm" onClick={() => job.id && handleDelete(job.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobs;