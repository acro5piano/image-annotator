import { Canvas } from './Canvas'

export function App() {
  return (
    <div>
      <nav className="px-8 py-2 bg-indigo-600 flex justify-between items-center">
        <div className="text-white">Image Annotator</div>
        <a
          href="https://github.com/acro5piano/image-annotator"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 text-white hover:bg-indigo-700 rounded"
        >
          GitHub
        </a>
      </nav>
      <div className="p-8">
        <Canvas />
      </div>
    </div>
  )
}
