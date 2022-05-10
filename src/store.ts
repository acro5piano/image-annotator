import create from 'zustand'
import {
  Settings,
  DEFAULT_SETTINGS,
  updateSettings,
  getSettings,
} from './utils/settings'

interface Store {
  settings: Settings
  initApplication: () => void
  updateSettings: (settings: Settings) => void
  isInitialized: boolean
}

export const useStore = create<Store>((set) => ({
  isInitialized: false,
  settings: DEFAULT_SETTINGS,
  initApplication() {
    const settings = getSettings()
    if (settings) {
      set({ settings })
    }
    set({ isInitialized: true })
  },
  updateSettings(settings: Settings) {
    updateSettings(settings)
    set({ settings })
  },
}))

useStore.subscribe((state) => {
  if (state.settings.isDarkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// To surppress ESLint error
export const getState = () => useStore.getState()
