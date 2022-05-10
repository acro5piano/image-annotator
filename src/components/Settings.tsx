import { Modal } from './Modal'
import { useStore } from '../store'
import { useForm } from 'react-hook-form'
import { forwardRef } from 'react'
import toast from 'react-hot-toast'
import { DEFAULT_SETTINGS } from '../utils/settings'

export function Settings({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const settings = useStore((store) => store.settings)
  const updateSettings = useStore((store) => store.updateSettings)

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors, },
  } = useForm({
    defaultValues: settings,
  })

  const onSubmit = handleSubmit((input) => {
    updateSettings(input)
    onClose()
    toast.success('Saved!')
  })

  return (
    <Modal visible={visible} onClose={onClose} title="Settings">
      <div
        className="bg-white py-4 overflow-y-scroll w-full px-24"
        style={{ maxHeight: '60vh' }}
      >
        <form onSubmit={onSubmit}>
          <TextField
            label="Distance for small movements"
            type="number"
            {...register('smallDiff', {
              valueAsNumber: true,
              required: 'Required',
            })}
            autoFocus
          />
          <TextField
            label="Distance for large movements"
            type="number"
            {...register('largeDiff', {
              valueAsNumber: true,
              required: 'Required',
            })}
          />
          <TextField
            label="Primary color"
            type="color"
            {...register('primaryColor', {
              required: 'Required',
            })}
          />
          <div className="flex justify-center gap-3">
            <button
              className="button is-secondary"
              type="button"
              onClick={() => reset(DEFAULT_SETTINGS)}
            >
              Restore default
            </button>
            <button className="button is-primary" type="submit">
              Save settings
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

const TextField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
>(({ label, ...props }, ref) => {
  return (
    <div className="my-4">
      <label>
        <div className="flex items-center">
          <div className="w-64">{label}</div>
          <input
            ref={ref}
            {...props}
            className="border border-gray-200 p-1 rounded"
          />
        </div>
      </label>
    </div>
  )
})
