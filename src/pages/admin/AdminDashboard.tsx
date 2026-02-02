import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, FileText, Mail } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="container py-20 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid md:grid-cols-3 gap-6">

                {/* Job Management */}
                <Link to="/admin/jobs">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Briefcase className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle>Manage Jobs</CardTitle>
                                <CardDescription>Create, edit, and delete job listings</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>

                {/* Applications */}
                <Link to="/admin/applications">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FileText className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <CardTitle>Applications</CardTitle>
                                <CardDescription>Review candidate submissions</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>

                {/* Messages */}
                <Link to="/admin/messages">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Mail className="w-8 h-8 text-purple-600" />
                            </div>
                            <div>
                                <CardTitle>Messages</CardTitle>
                                <CardDescription>View contact form inquiries</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>

            </div>
        </div>
    );
};

export default AdminDashboard;