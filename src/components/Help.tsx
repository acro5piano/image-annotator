import { Modal } from './Modal'

const shortcuts = [
  { key: '?', description: 'Open this cheatsheet' },
  {
    key: 'Ctrl + v',
    description: 'Paste the image from clipboard to the canvas',
  },
  { key: 'Ctrl + c', description: 'Copy the image on the canvas to clipboard' },
  { key: 'r', description: 'Add a rectangle on the canvas' },
  {
    key: 't',
    description:
      'Add a text on the canvas. If a rectangle is focused, put the text on the above of it',
  },
  { key: 'o', description: 'Focus next element on canvas' },
  { key: 'Escape', description: 'Clear focus' },
  { key: 'i', description: 'Edit focused text' },
  {
    key: 'l / Ctrl + Arrow Right',
    description: 'Move current element to right by 10',
  },
  {
    key: 'h / Ctrl + Arrow Left',
    description: 'Move current element to left by 10',
  },
  {
    key: 'j / Ctrl + Arrow Down',
    description: 'Move current element to down by 10',
  },
  {
    key: 'k / Ctrl + Arrow Up',
    description: 'Move current element to up by 10',
  },
  {
    key: 'Ctrl + f / Arrow Right',
    description: 'Move current element to right by 30',
  },
  {
    key: 'Ctrl + b / Arrow Left',
    description: 'Move current element to left by 30',
  },
  {
    key: 'Ctrl + n / Arrow Down',
    description: 'Move current element to down by 30',
  },
  {
    key: 'Ctrl + p / Arrow Up',
    description: 'Move current element to up by 30',
  },
  {
    key: '0 / Ctrl + a / Home',
    description: 'Move current element current to left end',
  },
  {
    key: '$ / Ctrl + e / End',
    description: 'Move current element current to right end',
  },
  {
    key: 'g / Ctrl + Meta + a / Ctrl + Home',
    description: 'Move current element current to top',
  },
  {
    key: 'G / Ctrl + Meta + e / Ctrl + End',
    description: 'Move current element current to bottom',
  },
  {
    key: 'Ctrl + Shift + Arrow Right',
    description: 'Increase current element width 10',
  },
  {
    key: 'Ctrl + Shift + Arrow Left',
    description: 'Decrease current element width 10',
  },
  {
    key: 'Ctrl + Shift + Arrow Down',
    description: 'Increase current element height 10',
  },
  {
    key: 'Ctrl + Shift + Arrow Up',
    description: 'Decrease current element height 10',
  },
  {
    key: 'Shift + l / Shift + Arrow Right',
    description: 'Increase current element width 30',
  },
  {
    key: 'Shift + h / Shift + Arrow Left',
    description: 'Decrease current element width 30',
  },
  {
    key: 'Shift + j / Shift + Arrow Down',
    description: 'Increase current element height 30',
  },
  {
    key: 'Shift + k / Shift + Arrow Up',
    description: 'Decrease current element height 30',
  },
  {
    key: 'Ctrl + h / d / x / Backspace / Delete',
    description: 'Delete current element',
  },
  { key: '`>` / ctrl + `>`', description: 'Increase font size' },
  { key: '`<` / ctrl + `<`', description: 'Decrease font size' },
]

export function Help({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Keyboard shortcuts</p>
        <button className="delete" aria-label="close" onClick={onClose} />
      </header>
      <div
        className="bg-white p-4 overflow-y-scroll w-full"
        style={{ maxHeight: '60vh' }}
      >
        {shortcuts.map((shortcut) => (
          <div className="flex py-2 border-b">
            <div className="w-4/12">
              {shortcut.key.split(' / ').map((key) => (
                <code className="ml-4 bg-gray-600 text-white rounded">
                  {key}
                </code>
              ))}
            </div>
            <div>{shortcut.description}</div>
          </div>
        ))}
        <div className="text-2xl"></div>
      </div>
    </Modal>
  )
}
