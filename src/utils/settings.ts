export interface Settings {
  smallDiff: number
  largeDiff: number
  primaryColor: string
  focusedColor: string
}

export const DEFAULT_SETTINGS: Settings = {
  smallDiff: 10,
  largeDiff: 30,
  primaryColor: '#e91e63', // pink
  focusedColor: '#fb5211', // orange
} as const

const KEY = 'imageAnnotatorSettings'

export function getSettings(): Settings | null {
  const settingsString = localStorage.getItem(KEY)
  if (!settingsString) {
    return null
  }
  return JSON.parse(settingsString)
}

export function updateSettings(s: Settings) {
  localStorage.setItem(KEY, JSON.stringify(s))
}
