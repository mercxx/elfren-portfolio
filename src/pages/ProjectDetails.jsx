import { Link, useParams } from "react-router-dom"

function ProjectDetails() {
  const { projectId } = useParams()

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/"
          className="text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Portfolio
        </Link>

        <p className="mt-12 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Project Details
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          {projectId}
        </h1>

        <p className="mt-6 leading-8 text-gray-400">
          This is the project details page. We'll replace this
          with the complete project information next.
        </p>

      </div>
    </main>
  )
}

export default ProjectDetails