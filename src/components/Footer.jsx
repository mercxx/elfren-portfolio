function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-8 text-gray-900 transition-colors dark:border-white/10 dark:bg-[#050505] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Elfren Ruzmer Cruz. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">

          <a
            href="#"
            className="text-sm text-gray-500 transition hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            LinkedIn
          </a>

          <a
            href="#contact"
            className="text-sm text-gray-500 transition hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            Contact
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer