import { Link, Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl">TALENTPOOL</h1>
            </header>

            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex space-x-4">
                    <li>
    <Link to="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
<Link to={ "/login" } className="hover:underline">Login</Link>
                        </li>
                    <li>
                         <Link to={ "/register" } className="hover:underline">Register</Link>
                                            </li>
                </ul>
            </nav>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2025 IMILY
            </footer>
        </div>
    );
}