import logo from "../assets/images/logo.png"
import ThemeToggle from "./ThemeToggle"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-[#050505]/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Elfren Ruzmer Cruz"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          <a
            href="#about"
            className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            About
          </a>

          <a
            href="#projects"
            className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Projects
          </a>

          <a
            href="#experience"
            className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Experience
          </a>

          <a
            href="#skills"
            className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Stack
          </a>

        </div>

        {/* Right side */}
        <div className="hidden items-center gap-5 md:flex">

          <a
            href="#"
            className="text-sm text-gray-400 transition hover:text-gray-900 dark:hover:text-white"
          >
            GitHub ↗
          </a>

          <a
            href="#"
            className="text-sm text-gray-400 transition hover:text-gray-900 dark:hover:text-white"
          >
            LinkedIn ↗
          </a>

          <ThemeToggle />

        </div>

        {/* Mobile theme toggle */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

      </div>
    </nav>
  )
}

export default Navbar