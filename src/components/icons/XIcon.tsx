interface XIconProps {
  href: string
  size?: string
  className?: string
  backgroundColor?: string
  color?: string
  style?: React.CSSProperties
}

export default function XIcon({
  href,
  size = 'clamp(2.5rem, 4vw, 3rem)',
  className = '',
  backgroundColor = 'rgb(30, 41, 59)',
  color = 'rgb(250, 248, 246)',
  style = {}
}: XIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-opacity-80 ${className}`}
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
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  )
}