import { forwardRef, memo } from 'react'

type SvgComponentProps = {
  isSelected?: boolean
}

const SvgComponent = forwardRef<SVGSVGElement, SvgComponentProps>(
  ({ isSelected, ...props }, ref) => (
    <svg
      fill="none"
      height={18}
      ref={ref}
      width={18}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.19036 8.75285L6.12097 7.2504C6.24603 7.18629 6.36385 7.10572 6.44972 6.99446C6.81954 6.51521 6.90046 5.86465 6.64525 5.3032L5.18611 2.09308C4.70915 1.04377 3.33095 0.793852 2.5159 1.60889L1.55455 2.57019C1.22509 2.89964 1.06368 3.36462 1.14634 3.82315C1.71104 6.9556 3.20399 9.95355 5.62519 12.3747C8.0464 14.796 11.0444 16.2889 14.1768 16.8536C14.6353 16.9363 15.1003 16.7749 15.4298 16.4454L16.3911 15.4841C17.2061 14.669 16.9563 13.2908 15.907 12.8139L12.6968 11.3548C12.1354 11.0995 11.4848 11.1805 11.0056 11.5503C10.8943 11.6361 10.8137 11.754 10.7496 11.879L9.24715 14.8096"
        stroke={isSelected ? '#5A2D76' : '#344054'}
        strokeWidth="1.2"
      />
    </svg>
  )
)

export default memo(SvgComponent)
