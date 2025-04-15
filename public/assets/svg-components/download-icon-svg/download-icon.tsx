import { forwardRef, memo } from 'react'

type SvgComponentProps = {
  isSelected?: boolean
  width?: number
  height?: number
}

const SvgComponent = forwardRef<SVGSVGElement, SvgComponentProps>(
  ({ isSelected, height = 18, width = 18, ...props }, ref) => (
<svg
  fill="none"
  height={height}
  ref={ref}
  viewBox="0 0 18 18"
  width={width}
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path
    fill={isSelected ? '#5A2D76' : '#344054'}
    fillRule="evenodd"
    d="M9.002.25a.748.748 0 0 0-.548.237l-4.61 4.607a.75.75 0 1 0 1.06 1.061L8.253 2.81V13a.75.75 0 0 0 1.5 0V2.815l3.342 3.34a.75.75 0 0 0 1.06-1.06L9.58.521A.748.748 0 0 0 9 .25ZM1.75 13a.75.75 0 0 0-1.5 0v2.5a2.25 2.25 0 0 0 2.25 2.25h13a2.25 2.25 0 0 0 2.25-2.25V13a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 1-.75.75h-13a.75.75 0 0 1-.75-.75V13Z"
    clipRule="evenodd"
  />
</svg>
)
)

export default memo(SvgComponent)
