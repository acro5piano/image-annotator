import { Canvas } from './components/Canvas'
import { useState } from 'react'
import { useLocalStorageState } from 'ahooks'
import { Help } from './components/Help'
import { QuickHelp } from './components/QuickHelp'
import { useKeyPress } from './hooks/useKeyPress'
import { useOnPasteImage } from './hooks/useOnPasteImage'

export function App() {
  const [isHelpVisible, setIsHelpVisible] = useLocalStorageState(
    'ia:isHelpVisible',
    true,
  )
  const [isQuickHelpVisible, setIsQuickHelpVisible] = useState(false)
  useKeyPress(['shift.?'], () => setIsHelpVisible(true))
  useKeyPress(['Escape'], () => setIsHelpVisible(false))

  useOnPasteImage(() => {
    setIsQuickHelpVisible(true)
  })

  return (
    <div>
      <nav className="px-8 py-2 bg-gray-900 flex justify-between items-center fixed top-0 w-full text-xl">
        <div className="text-white flex items-center">Image Annotator</div>
        <div className="flex items-center">
          <div
            className="text-white cursor-pointe flex items-center text-white hover:bg-indigo-700 hover:text-white px-2 py-1 cursor-pointer"
            onClick={() => setIsHelpVisible(true)}
          >
            How to use
            <code className="rounded ml-2 text-xs">?</code>
          </div>
          <a
            href="https://github.com/acro5piano/image-annotator"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-8 px-2 py-1 text-white hover:bg-indigo-700 hover:text-white rounded"
          >
            GitHub
          </a>
        </div>
      </nav>
      <div className="pt-16 p-8">
        <Canvas />
      </div>
      {isQuickHelpVisible && <QuickHelp />}
      <Help
        visible={isHelpVisible || false}
        onClose={() => setIsHelpVisible(false)}
      />
    </div>
  )
}
