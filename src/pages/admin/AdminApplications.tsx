import { useState, useEffect } from "react";
import { api, Application } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminApplications = () => {
    const [apps, setApps] = useState<Application[]>([]);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    const fetchApps = async () => {
        try {
            const data = await api.getApplications();
            setApps(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchApps(); }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        await api.updateApplicationStatus(id, newStatus);
        fetchApps();
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Applications</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Job</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apps.map((app) => (
                                <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedApp(app)}>
                                    <TableCell>{app.fullName}</TableCell>
                                    <TableCell>{app.job.title}</TableCell>
                                    <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Select defaultValue={app.status} onValueChange={(val) => handleStatusChange(app.id, val)}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="NEW">New</SelectItem>
                                                <SelectItem value="REVIEWING">Reviewing</SelectItem>
                                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                                <SelectItem value="HIRED">Hired</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                                            Resume
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Detail View */}
                <div className="md:col-span-1">
                    {selectedApp ? (
                        <Card className="sticky top-20">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold">{selectedApp.fullName}</h3>
                                <p className="text-sm text-muted-foreground">{selectedApp.email}</p>
                                <p className="text-sm text-muted-foreground mb-4">{selectedApp.phone}</p>
                                <hr className="my-4"/>
                                <h4 className="font-semibold mb-2">Cover Letter</h4>
                                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-md">{selectedApp.coverLetter}</p>
                                <Button className="w-full mt-4" variant="outline" onClick={() => setSelectedApp(null)}>Close</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                            Select an application to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;