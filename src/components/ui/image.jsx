import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Plain image wrapper. `fittingType="fill"` (default) covers the box; `"fit"` contains it.
 * @param {{ src: string, alt?: string, fittingType?: "fill" | "fit", className?: string }} props
 */
const Image = React.forwardRef(
  ({ src, alt, fittingType = "fill", className, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(fittingType === "fit" ? "object-contain" : "object-cover", className)}
      {...props}
    />
  )
)
Image.displayName = "Image"

export { Image }
