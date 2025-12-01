import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, id, ...props }, ref) => {
        const generatedId = React.useId()
        const inputId = id || generatedId

        return (
            <div className="relative">
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "peer flex h-12 w-full rounded-lg border border-slate/20 bg-white/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-dream disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black/20",
                        className
                    )}
                    placeholder={label || "Input"}
                    ref={ref}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={inputId}
                        className="absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75 transform cursor-text text-sm text-muted-foreground duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-fuchsia-dream"
                    >
                        {label}
                    </label>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
