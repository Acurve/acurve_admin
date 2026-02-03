
import ProtectedRoute from "@/components/shared/protected-route";
import AdminDashboard from "./admin-dashboard";
AdminDashboard

const AdminRoute = () => {
    return (
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    );
}
export default AdminRoute