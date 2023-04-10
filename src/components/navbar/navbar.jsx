import "./navbar.css";

function NavBar() {
  return (
    <div id="formNavBar" className="sticky flex-auto backdrop-blur-sm top-0 z-50">
      <nav className="p-5">
        <div className="flex justify-between items-center">
          <a
            href="/"
            className="text-white font-body font-extrabold text-2xl pl-10"
          >
            Max Allan-Smith
          </a>

          <div className="font-semibold  text-2xl border-solid border-2 rounded-lg p-1">
            <a
              href="/signup"
              className="text-gray-300 mx-4 hover:text-white italic"
            >
              Signup
            </a>

            <label className="text-gray-300 mx-4 hover:text-white">|</label>

            <a href="/login" className="text-gray-300 mx-4 hover:text-white">
              Login
            </a>
          </div>

          <div className="flex pr-5 text-lg">
            <a href="/projects" className="text-gray-300 mx-4 hover:text-white">
              Projects
            </a>
            <a href="/about" className="text-gray-300 mx-4 hover:text-white">
              About
            </a>
            <a href="/contact" className="text-gray-300 mx-4 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
