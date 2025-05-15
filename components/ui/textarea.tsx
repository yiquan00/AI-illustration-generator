import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onOptimizePrompt?: (prompt: string) => Promise<string>
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onOptimizePrompt, ...props }, ref) => {
    const [isOptimizing, setIsOptimizing] = React.useState(false)
    
    const handleOptimize = async () => {
      if (!props.value || !onOptimizePrompt) return
      setIsOptimizing(true)
      try {
        const optimized = await onOptimizePrompt(props.value.toString())
        if (props.onChange) {
          props.onChange({ target: { value: optimized } } as React.ChangeEvent<HTMLTextAreaElement>)
        }
      } catch (error) {
        console.error("Failed to optimize prompt:", error)
      } finally {
        setIsOptimizing(false)
      }
    }
    
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {onOptimizePrompt && (
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute right-2 bottom-2"
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            {isOptimizing ? "Optimizing..." : "Optimize Prompt"}
          </Button>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 