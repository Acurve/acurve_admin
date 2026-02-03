import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    LogOut,
    Mail,
    Phone,
    DollarSign,
    Briefcase,
    RefreshCw,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/auth-context';

type IContact = {
    status: string,
    priority: string,
    assignedTo: null,
    notes: null,
    respondedAt: null,
    _id: string,
    name: string,
    email: string,
    phoneNumber: number,
    service: string,
    budget: string,
    message: string,
    createdAt: string,
    updatedAt: string,
    __v: 0,
    id: string
}



const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<IContact[] | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const getContacts = async () => {
        const getContactsApi = `${import.meta.env.VITE_API_PREFIX}/api/v1/contacts`;
        try {
            const response = await fetch(getContactsApi, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || "Something went wrong");
            }


            const contacts = await response.json()
            if (contacts) setSubmissions(contacts.data)
        } catch (error) {
            toast.error("An error occured! please try again")
        }


    }

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            getContacts()

            toast.success('Contacts refreshed successfully');
        } catch (error) {
            toast.error('Failed to refresh contacts');
            console.error('Error refreshing contacts:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        getContacts()

    }, [])






    const stats = {
        total: submissions?.length || 0,
        new: "x",
        contacted: "y",
        completed: "z",
    };



    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Manage contact form submissions</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground font-medium">Total Submissions</p>
                            <Mail className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground font-medium">New</p>
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stats.new}</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground font-medium">Contacted</p>
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stats.contacted}</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground font-medium">Completed</p>
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
                    </div>
                </div>


                {/* Submissions List */}
                <div className="space-y-4">
                    {
                        submissions ?
                            submissions.map((submission, index) => (
                                <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden">
                                    {/* Card Header */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-foreground">{submission.name}</h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(submission.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Quick Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{submission.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{submission.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{submission.service}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-foreground">{submission.budget}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-border p-6 bg-background/50 space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                                            <p className="text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl p-4">
                                                {submission.message}
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            ))
                            :
                            <div>
                                <h1 className='text-3xl'>
                                    No any Contacts found
                                </h1>
                            </div>
                    }
                </div>
            </main>
        </div>
    );
}
export default AdminDashboard