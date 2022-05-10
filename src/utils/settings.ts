export const DEFAULT_SETTINGS = {
  smallDiff: 10,
  largeDiff: 30,
  primaryColor: '#e91e63', // pink
  secondaryColor: '#fb5211', // orange
  isDarkMode: false,
} as const

export type Settings = typeof DEFAULT_SETTINGS

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
