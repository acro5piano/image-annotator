import clsx from 'clsx'

export function Popover({
  visible,
  message,
}: {
  visible: boolean
  message: string
}) {
  return (
    <div
      className={clsx('fixed bottom-0 left-0 pb-2 pl-4 transition-all', {
        '-mb-12': !visible,
        'mb-0': visible,
      })}
    >
      <div
        className={clsx(
          'mx-auto bg-gray-900 text-white rounded py-4 px-8 transition-all',
          {
            '-mb-96': !visible,
          },
        )}
      >
        {message}
      </div>
    </div>
  )
}
