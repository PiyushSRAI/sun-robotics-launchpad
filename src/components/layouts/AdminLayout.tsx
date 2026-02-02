import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, FileText, Mail, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path: string) => location.pathname === path;

    // Protect the route
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        api.logout();
    };

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <img
                            src="/logo.png"
                            alt="Sun Robotics Logo"
                            className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                        />
                        Sun Robotics
                    </Link>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    {/* ... Existing Links ... */}
                    <Link to="/admin">
                        <Button variant={isActive("/admin") ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <Link to="/admin/jobs">
                        <Button variant={isActive("/admin/jobs") ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                            <Briefcase className="h-4 w-4" /> Manage Jobs
                        </Button>
                    </Link>
                    <Link to="/admin/applications">
                        <Button variant={isActive("/admin/applications") ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" /> Applications
                        </Button>
                    </Link>
                    <Link to="/admin/messages">
                        <Button variant={isActive("/admin/messages") ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                            <Mail className="h-4 w-4" /> Inbox
                        </Button>
                    </Link>
                </nav>
                <div className="mt-auto p-4 border-t">
                    {/* Logout Button */}
                    <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;