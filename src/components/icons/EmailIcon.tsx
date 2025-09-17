interface EmailIconProps {
  href: string
  size?: string
  className?: string
  backgroundColor?: string
  color?: string
  style?: React.CSSProperties
}

export default function EmailIcon({
  href,
  size = 'clamp(2.5rem, 4vw, 3rem)',
  className = '',
  backgroundColor = 'rgb(30, 41, 59)',
  color = 'rgb(250, 248, 246)',
  style = {}
}: EmailIconProps) {
  return (
    <a
      href={href}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${className}`}
      style={{
        backgroundColor,
        color,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <svg style={{ width: '60%', height: '60%' }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </a>
  )
}