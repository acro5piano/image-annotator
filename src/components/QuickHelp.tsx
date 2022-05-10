const Desc = ({ k, desc }: { k: string; desc: string }) => (
  <>
    <code className="mr-1 bg-gray-600 text-white rounded">{k}</code>
    <div className="mr-4">{desc}</div>
  </>
)

export function QuickHelp() {
  return (
    <div className="fixed left-0 bottom-0 w-full py-2 invert-if-dark">
      <div className="flex items-center justify-end">
        <Desc k="r" desc="Rectangle" />
        <Desc k="t" desc="Text" />
        <Desc k="o" desc="select Other" />
        <Desc k="&larr;&uarr;&darr;&rarr;" desc="Move" />
        <Desc k="Ctrl + &larr;&uarr;&darr;&rarr;" desc="Move a little" />
        <Desc k="Shift + &larr;&uarr;&darr;&rarr;" desc="Resize" />
        <Desc
          k="Ctrl + Shift + &larr;&uarr;&darr;&rarr;"
          desc="Resize a little"
        />
        <Desc k="?" desc="Help" />
      </div>
    </div>
  )
}
