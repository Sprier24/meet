import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "startContent" | "onClear" | "onValueChange"> {
  startContent?: React.ReactNode
  isClearable?: boolean
  onClear?: () => void
  onValueChange?: (value: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, isClearable, onClear, onValueChange, value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    return (
      <div className="relative flex items-center">
        {startContent && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {startContent}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            startContent && "pl-10",
            isClearable && value && "pr-10",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {isClearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
