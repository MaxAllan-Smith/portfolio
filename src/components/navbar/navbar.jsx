function NavBar() {
    return ( 
        <div className="formNavBar">
            <nav className="bg-gray-800 p-4">
                <div className="flex justify-between items-center">
                    <a href="/" className="text-white font-bold text-xl">
                    My Portfolio
                    </a>
                    <div className="flex">
                    <a href="/" className="text-gray-300 mx-4 hover:text-white">
                        About
                    </a>
                    <a href="/" className="text-gray-300 mx-4 hover:text-white">
                        Projects
                    </a>
                    <a href="/" className="text-gray-300 mx-4 hover:text-white">
                        Contact
                    </a>
                    <a href="/" className="text-gray-300 mx-4 hover:text-white">
                        Login
                    </a>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default NavBar;