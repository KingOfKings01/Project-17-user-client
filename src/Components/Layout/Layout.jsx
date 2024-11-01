import { Outlet } from "react-router-dom";
import NavBar from "../Navbar";

export default function Layout() {
    return (
        <div>
            <NavBar />
            <main >
                <Outlet />
            </main>
        </div>
    );
}
