import MainLayout from "@/components/layout/main-layout";
import AdminRoute from "@/pages/admin/admin-route";
import Login from "@/pages/login/login";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "",
                Component: AdminRoute
            },
            {
                path: "login",
                Component: Login,
               
            }
        ]
    }
])