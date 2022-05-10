export function Modal({
  visible,
  children,
  onClose,
  title,
}: {
  visible: boolean
  children: React.ReactNode
  onClose: () => void
  title: string
}) {
  return (
    <div
      className="fixed top-0 left-0 w-full flex justify-center items-center bg-gray-800"
      style={{ height: visible ? '100vh' : 0, background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      {visible && (
        <div className="w-8/12" onClick={(e) => e.stopPropagation()}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          {children}
        </div>
      )}
    </div>
  )
}
