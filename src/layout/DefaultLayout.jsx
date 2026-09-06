import { Outlet } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";

export default function DefaultLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <AppHeader />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <AppFooter />
        </div>
    );
}
