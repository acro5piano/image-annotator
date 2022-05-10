import { useLocalStorageState } from 'ahooks'
import { Modal } from './Modal'
import * as constants from '../constants'
import { useForm } from 'react-hook-form'
import { forwardRef } from 'react'

export function Settings({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const [smallDiff, setSmallDiff] = useLocalStorageState(
    constants.LOCAL_STORAGE_KEY.SMALL_DIFF,
    constants.DEFAULT_SMALL_DIFF,
  )
  const [largeDiff, setLargeDiff] = useLocalStorageState(
    constants.LOCAL_STORAGE_KEY.LARGE_DIFF,
    constants.DEFAULT_LARGE_DIFF,
  )

  const {
    register,
    handleSubmit,
    // formState: { errors, },
  } = useForm({
    defaultValues: {
      smallDiff,
      largeDiff,
    },
  })

  const onSubmit = handleSubmit((input) => {
    setSmallDiff(input.smallDiff)
    setLargeDiff(input.largeDiff)
    onClose()
  })

  return (
    <Modal visible={visible} onClose={onClose} title="Settings">
      <div
        className="bg-white py-4 overflow-y-scroll w-full px-24"
        style={{ maxHeight: '60vh' }}
      >
        <form onSubmit={onSubmit}>
          <TextField label="Small diff" {...register('smallDiff')} />
          <TextField label="Large diff" {...register('largeDiff')} />
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

const TextField = forwardRef<HTMLInputElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        <div className="flex items-center">
          <div className="w-32">{label}</div>
          <input
            ref={ref}
            {...props}
            className="border border-gray-200 p-1 rounded"
            autoFocus
          />
        </div>
      </label>
    )
  },
)
