export interface Settings {
  smallDiff: number
  largeDiff: number
  primaryColor: string
  focusedColor: string
}

const DEFAULT_SETTINGS: Settings = {
  smallDiff: 10,
  largeDiff: 30,
  primaryColor: '#e91e63', // pink
  focusedColor: '#fb5211', // orange
} as const

export let settings = { ...DEFAULT_SETTINGS }

const KEY = 'imageAnnotatorSettings'

const settingsString = localStorage.getItem(KEY)
if (settingsString) {
  settings = JSON.parse(settingsString)
}

export function updateSettings(s: Settings) {
  localStorage.setItem(KEY, JSON.stringify(s))
  settings = s
}
