import { Modal } from './Modal'

export function Settings({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <Modal visible={visible} onClose={onClose} title="Settings">
      <div
        className="bg-white p-4 overflow-y-scroll w-full"
        style={{ maxHeight: '60vh' }}
      >
        ほげ
        <div className="text-2xl"></div>
      </div>
    </Modal>
  )
}
