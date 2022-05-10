import { Modal } from './Modal'
import { settings, updateSettings } from '../utils/settings'
import { useForm } from 'react-hook-form'
import { forwardRef } from 'react'

export function Settings({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const {
    register,
    handleSubmit,
    // formState: { errors, },
  } = useForm({
    defaultValues: settings,
  })

  const onSubmit = handleSubmit((input) => {
    updateSettings(input)
    onClose()
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
          <div className="text-center">
            <button className="button is-primary" type="submit">
              Save
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
