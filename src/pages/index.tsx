import { Canvas } from 'src/components/Canvas'
import { useState } from 'react'
import { useLocalStorageState, useMount } from 'ahooks'
import { Help } from 'src/components/Help'
import { Settings } from 'src/components/Settings'
import { QuickHelp } from 'src/components/QuickHelp'
import { useKeyPress } from 'src/hooks/useKeyPress'
import { useOnPasteImageLight } from 'src/hooks/useOnPasteImage'
import { useStore } from 'src/store'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  const initApplication = useStore((store) => store.initApplication)
  const isInitialized = useStore((store) => store.isInitialized)

  useMount(initApplication)

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

  useOnPasteImageLight(() => {
    setIsQuickHelpVisible(true)
  })

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-zinc-900">
      <nav className="px-8 py-2 flex justify-between items-center fixed top-0 w-full text-lg bg-white border-b border-gray-50 shadow-md invert-if-dark ">
        <div className="flex items-center font-bold ">Image Annotator</div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              setIsHelpVisible(true)
              e.currentTarget.blur()
            }}
          >
            <div className="flex items-center transition-all hover:bg-gray-200 px-3 py-2 rounded ">
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
            <div className="cursor-pointe flex items-center transition-all hover:bg-gray-800 px-2 py-1 cursor-pointer rounded ">
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
            className="ml-8 px-2 py-1 transition-all hover:bg-gray-800 rounded "
          >
            GitHub
          </a>
        </div>
      </nav>
      <div className="pt-16 p-8">
        {typeof window !== 'undefined' && <Canvas />}
      </div>
      {isQuickHelpVisible && <QuickHelp />}
      <Help
        visible={isHelpVisible! && isInitialized}
        onClose={() => setIsHelpVisible(false)}
      />
      <Settings
        visible={isSettingsVisible || false}
        onClose={() => setIsSettingsVisible(false)}
      />

      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 9999999,
        }}
        toastOptions={{
          style: {
            backgroundColor: '#2A2F39',
            color: '#fff',
          },
          duration: 3000,
        }}
      />
    </div>
  )
}
