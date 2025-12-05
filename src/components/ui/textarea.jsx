import * as React from "react"
import { cn } from "../../lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border-2 border-emerald-300 dark:border-emerald-600 bg-white dark:bg-gray-800 px-4 py-3 text-base font-medium text-gray-900 dark:text-gray-100 ring-offset-background placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
