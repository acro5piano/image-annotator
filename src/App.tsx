import { Canvas } from './components/Canvas'
import { useState } from 'react'
import { useLocalStorageState } from 'ahooks'
import { Help } from './components/Help'
import { Settings } from './components/Settings'
import { QuickHelp } from './components/QuickHelp'
import { useKeyPress } from './hooks/useKeyPress'
import { useOnPasteImage } from './hooks/useOnPasteImage'

export function App() {
  const [isHelpVisible, setIsHelpVisible] = useLocalStorageState(
    'ia:isHelpVisible',
    true,
  )
  const [isQuickHelpVisible, setIsQuickHelpVisible] = useState(false)
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  useKeyPress(['shift.?', 'F1'], () => setIsHelpVisible(true))
  useKeyPress([','], (event) => {
    event.preventDefault()
    setIsSettingsVisible(true)
  })

  useKeyPress(['Escape'], () => {
    setIsHelpVisible(false)
    setIsSettingsVisible(false)
  })

  useOnPasteImage(() => {
    setIsQuickHelpVisible(true)
  })

  return (
    <div>
      <nav className="px-8 py-2 flex justify-between items-center fixed top-0 w-full text-lg bg-white border-b border-gray-50 shadow-md">
        <div className="flex items-center font-bold">Image Annotator</div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              setIsHelpVisible(true)
              e.currentTarget.blur()
            }}
          >
            <div className="flex items-center transition-all hover:bg-gray-200 px-3 py-2 rounded">
              How to use
              <code className="text-white bg-gray-600 rounded ml-2 text-xs">
                ?
              </code>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.currentTarget.blur()
              setIsHelpVisible(true)
            }}
          >
            <div className="cursor-pointe flex items-center transition-all hover:bg-gray-800 px-2 py-1 cursor-pointer rounded">
              Settings
              <code className="text-white bg-gray-600 rounded ml-2 text-xs">
                ,
              </code>
            </div>
          </button>
          <a
            href="https://github.com/acro5piano/image-annotator"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-8 px-2 py-1 transition-all hover:bg-gray-800 rounded"
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
      <Settings
        visible={isSettingsVisible || false}
        onClose={() => setIsSettingsVisible(false)}
      />
    </div>
  )
}
