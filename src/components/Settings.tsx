import { Modal } from './Modal'
import clsx from 'clsx'
import { useStore } from '../store'
import { useForm } from 'react-hook-form'
import { forwardRef, useEffect } from 'react'
import { DEFAULT_SETTINGS } from '../utils/settings'
import { useDebounceFn } from 'ahooks'

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
    watch,
    // formState: { errors, },
  } = useForm({
    defaultValues: settings,
  })

  const onSubmit = handleSubmit((input) => {
    updateSettings(input)
  })
  const { run } = useDebounceFn(onSubmit, {
    wait: 100,
  })
  useEffect(() => {
    run()
  }, [watch()])

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
            invertColor
            {...register('primaryColor', {
              required: 'Required',
            })}
          />
          <TextField
            label="Secondary color"
            type="color"
            invertColor
            {...register('secondaryColor', {
              required: 'Required',
            })}
          />
          <TextField
            label="Dark Mode"
            type="checkbox"
            defaultChecked={settings.isDarkMode}
            {...register('isDarkMode', {})}
          />
          <div className="flex justify-center gap-3">
            <button
              className="button is-secondary"
              type="button"
              onClick={() => {
                if (confirm('are you sure?')) {
                  reset(DEFAULT_SETTINGS)
                  onSubmit()
                }
              }}
            >
              Restore default
            </button>
            <button
              className="button is-primary invert-if-dark"
              type="submit"
              onClick={() => {
                onSubmit()
                onClose()
              }}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

const TextField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    invertColor?: boolean
  }
>(({ label, invertColor = false, ...props }, ref) => {
  return (
    <div className="my-4">
      <label>
        <div className={clsx('flex items-center')}>
          <div className="w-64">{label}</div>
          <span className={invertColor ? 'invert-if-dark' : ''}>
            <input
              ref={ref}
              {...props}
              className="border border-gray-200 p-1 rounded"
            />
          </span>
        </div>
      </label>
    </div>
  )
})
