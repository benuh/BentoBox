export const themes = {
  dark: {
    // Page background
    background: 'rgb(15, 23, 42)',
    // Text colors
    textPrimary: 'rgb(248, 250, 252)',
    textSecondary: 'rgb(148, 163, 184)',
    textMuted: 'rgb(71, 85, 105)',
    // Terminal colors
    terminalBg: 'rgb(17, 24, 39)',
    terminalHeader: 'rgb(31, 41, 55)',
    terminalBorder: 'rgb(55, 65, 81)',
    terminalTab: 'rgb(31, 41, 55)',
    terminalTabActive: 'rgb(17, 24, 39)',
    terminalDots: {
      red: 'rgb(239, 68, 68)',
      yellow: 'rgb(245, 158, 11)',
      green: 'rgb(34, 197, 94)'
    },
    // Terminal content colors
    command: 'rgb(34, 197, 94)',
    variable: 'rgb(147, 197, 253)',
    string: 'rgb(251, 146, 60)',
    keyword: 'rgb(250, 204, 21)',
    comment: 'rgb(168, 85, 247)',
    error: 'rgb(239, 68, 68)',
    cursor: 'rgb(34, 197, 94)',
    // Social icon colors
    iconBg: 'rgb(30, 41, 59)',
    iconColor: 'rgb(250, 248, 246)',
    // Navigation
    navText: 'rgb(248, 250, 252)',
    navHover: 'rgba(51, 65, 85, 0.1)'
  },
  light: {
    // Page background
    background: 'rgb(248, 250, 252)',
    // Text colors
    textPrimary: 'rgb(15, 23, 42)',
    textSecondary: 'rgb(71, 85, 105)',
    textMuted: 'rgb(100, 116, 139)',
    // Terminal colors
    terminalBg: 'rgb(255, 255, 255)',
    terminalHeader: 'rgb(249, 250, 251)',
    terminalBorder: 'rgb(229, 231, 235)',
    terminalTab: 'rgb(249, 250, 251)',
    terminalTabActive: 'rgb(255, 255, 255)',
    terminalDots: {
      red: 'rgb(209, 213, 219)',
      yellow: 'rgb(209, 213, 219)',
      green: 'rgb(209, 213, 219)'
    },
    // Terminal content colors
    command: 'rgb(71, 85, 105)',
    variable: 'rgb(15, 23, 42)',
    string: 'rgb(100, 116, 139)',
    keyword: 'rgb(71, 85, 105)',
    comment: 'rgb(148, 163, 184)',
    error: 'rgb(185, 28, 28)',
    cursor: 'rgb(71, 85, 105)',
    // Social icon colors
    iconBg: 'transparent',
    iconColor: 'rgb(71, 85, 105)',
    // Navigation
    navText: 'rgb(15, 23, 42)',
    navHover: 'rgba(100, 116, 139, 0.1)'
  }
} as const

export type ThemeConfig = typeof themes.dark