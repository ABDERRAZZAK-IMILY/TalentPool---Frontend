import { Link, Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen h-screen w-screen bg-gray-50">
            <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        TALENT<span className="text-blue-200">POOL</span>
                    </h1>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li>
                                <Link to="/" className="font-medium rounded-full bg-white text-blue-600 px-6 py-2 hover:bg-blue-100 transition-colors duration-200">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" className="font-medium rounded-full bg-white text-blue-600 px-6 py-2 hover:bg-blue-100 transition-colors duration-200">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="font-medium rounded-full bg-white text-blue-600 px-6 py-2 hover:bg-blue-100 transition-colors duration-200">Register</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Mobile navigation */}
            <nav className="md:hidden bg-white shadow-md p-4">
                <ul className="flex justify-around">
                    <li>
                        <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-sm mt-1">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-sm mt-1">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            <span className="text-sm mt-1">Register</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <main className="flex-grow p-4 md:p-8 ">
                <Outlet />
            </main>
        </div>
    );
}