// Theme and Design Tokens
export const Colors = {
  // Base
  background: '#0a0e1a',
  surface: '#1a1f2e',
  surfaceElevated: '#252b3d',
  
  // Brand (Islamic gold/teal)
  primary: '#d4af37',
  primaryDark: '#b8941f',
  accent: '#2a9d8f',
  accentLight: '#48b5a8',
  
  // Text
  text: '#ffffff',
  textSecondary: '#b0b8c9',
  textMuted: '#6b7280',
  
  // Status
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  
  // Borders
  border: '#2d3548',
  borderSubtle: '#1f2537',
} as const;

export const Typography = {
  // Sizes
  xxl: 28,
  xl: 24,
  lg: 20,
  md: 16,
  sm: 14,
  xs: 12,
  
  // Weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Layout = {
  screenPadding: Spacing.md,
  cardSpacing: Spacing.md,
  sectionSpacing: Spacing.lg,
} as const;
