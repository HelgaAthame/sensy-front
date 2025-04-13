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
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.00198 13.75C8.78598 13.75 8.59131 13.6587 8.45446 13.5126L3.84487 8.9059C3.55188 8.6131 3.55173 8.13823 3.84453 7.84524C4.13733 7.55225 4.61221 7.5521 4.90519 7.8449L8.25198 11.1896V1C8.25198 0.585787 8.58777 0.25 9.00198 0.25C9.4162 0.25 9.75198 0.585787 9.75198 1V11.1854L13.0949 7.84489C13.3879 7.5521 13.8628 7.55226 14.1555 7.84526C14.4483 8.13825 14.4482 8.61313 14.1552 8.90592L9.58024 13.4776C9.44268 13.644 9.23471 13.75 9.00198 13.75ZM1.75 13C1.75 12.5858 1.41421 12.25 1 12.25C0.585786 12.25 0.25 12.5858 0.25 13V15.5C0.25 16.7426 1.25736 17.75 2.5 17.75H15.5009C16.7435 17.75 17.7509 16.7426 17.7509 15.5V13C17.7509 12.5858 17.4151 12.25 17.0009 12.25C16.5867 12.25 16.2509 12.5858 16.2509 13V15.5C16.2509 15.9142 15.9151 16.25 15.5009 16.25H2.5C2.08579 16.25 1.75 15.9142 1.75 15.5V13Z"
            fill={isSelected ? '#5A2D76' : '#344054'} />
    </svg>

  )
)

export default memo(SvgComponent)
