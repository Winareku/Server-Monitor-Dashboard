import { createTheme } from '@mui/material/styles'
import { esES } from '@mui/material/locale'
import type {} from '@mui/x-charts/themeAugmentation'
import BlurFade from './components/layout/BlurFade'

// Sistema de diseño (tema Console, grafito). Los valores viven en src/styles/tokens.css;
// los componentes los usan por nombre con `tk.*` (variables CSS).
// `hex` repite los mismos valores solo donde hace falta un color calculable (MUI, canvas, SVG).
//
// Significado de los colores:
//   azul frío (cool) = lo que mide un instrumento: series, lecturas, gráficos
//   ámbar (accent)   = lo que hace una persona: foco, selección, puntero, acciones
//   ok / bad         = solo estados

export const tk = {
  paper: 'var(--color-paper)',
  paper2: 'var(--color-paper-2)',
  paper3: 'var(--color-paper-3)',
  paper4: 'var(--color-paper-4)',
  ink: 'var(--color-ink)',
  ink2: 'var(--color-ink-2)',
  muted: 'var(--color-muted)',
  rule: 'var(--color-rule)',
  rule2: 'var(--color-rule-2)',
  accent: 'var(--color-accent)',
  accentHi: 'var(--color-accent-hi)',
  accentInk: 'var(--color-accent-ink)',
  accentSoft: 'var(--color-accent-soft)',
  cool: 'var(--color-cool)',
  cool2: 'var(--color-cool-2)',
  cool3: 'var(--color-cool-3)',
  cool4: 'var(--color-cool-4)',
  coolSoft: 'var(--color-cool-soft)',
  ok: 'var(--color-ok)',
  okSoft: 'var(--color-ok-soft)',
  bad: 'var(--color-bad)',
  badInk: 'var(--color-bad-ink)',
  badSoft: 'var(--color-bad-soft)',
  fontDisplay: 'var(--font-display)',
  fontBody: 'var(--font-body)',
  fontMono: 'var(--font-mono)',
  durMicro: 'var(--dur-micro)',
  durShort: 'var(--dur-short)',
  durMedium: 'var(--dur-medium)',
  ease: 'var(--ease-out)',
  easePress: 'var(--ease-press)',
  shadowPop: 'var(--shadow-pop)',
} as const

export const hex = {
  paper: '#0D1013',
  paper2: '#15191C',
  paper3: '#06080B',
  paper4: '#1E2226',
  ink: '#ECEFF2',
  ink2: '#C3C8CC',
  muted: '#9DA2A8',
  rule: '#2D3135',
  rule2: '#484E54',
  accent: '#F7B83D',
  accentHi: '#FFCC69',
  accentInk: '#1C0E00',
  accentSoft: '#38280A',
  cool: '#6EBCFC',
  cool2: '#4A91D1',
  cool3: '#316CA5',
  cool4: '#A8D8FB',
  coolSoft: '#142E43',
  ok: '#61CB7C',
  bad: '#F66D67',
  badInk: '#FF958D',
} as const

// Rampa azul fría para series (un solo tono, en orden fijo); el último en gris neutro.
export const seriesColors = {
  s1: hex.cool,
  s2: hex.cool2,
  s3: hex.cool3,
  s4: hex.cool4,
  s5: hex.muted,
} as const

// Familias de códigos HTTP. `mark` colorea barras e íconos; el texto siempre va en tinta.
// 4xx en ámbar: el error lo provocó quien hizo la solicitud (una persona).
export const statusFamily = {
  success: { mark: hex.ok, label: '2xx Éxito' },
  redirect: { mark: hex.cool, label: '3xx Redirección' },
  clientError: { mark: hex.accent, label: '4xx Error de cliente' },
  serverError: { mark: hex.bad, label: '5xx Error de servidor' },
} as const

export type StatusFamilyKey = keyof typeof statusFamily

export function statusFamilyOf(code: number): StatusFamilyKey {
  if (code >= 500) return 'serverError'
  if (code >= 400) return 'clientError'
  if (code >= 300) return 'redirect'
  return 'success'
}

const display = '"Host Grotesk", ui-sans-serif, system-ui, sans-serif'
const mono = '"Atkinson Hyperlegible Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

// Respuesta física común a todo lo clicable: se hunde un poco al presionar.
const press = {
  transition: `background-color ${tk.durShort} ${tk.ease}, border-color ${tk.durShort} ${tk.ease}, color ${tk.durShort} ${tk.ease}, box-shadow ${tk.durShort} ${tk.ease}, transform ${tk.durMicro} ${tk.easePress}`,
  '&:active': { transform: 'scale(0.97)' },
}

// El punto de quiebre de escritorio/móvil definido en Planificación es 768px:
// "md" arriba = escritorio, "md" abajo = móvil.
const baseTheme = createTheme(
  {
    breakpoints: {
      values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 },
    },
    palette: {
      mode: 'dark',
      primary: { main: hex.accent, dark: '#D99A1F', light: hex.accentHi, contrastText: hex.accentInk },
      secondary: { main: hex.cool, contrastText: hex.paper3 },
      error: { main: hex.bad, dark: '#D9504B', light: hex.badInk },
      warning: { main: hex.accent, contrastText: hex.accentInk },
      success: { main: hex.ok },
      info: { main: hex.cool },
      background: { default: hex.paper, paper: hex.paper2 },
      text: { primary: hex.ink, secondary: hex.muted, disabled: hex.rule2 },
      divider: hex.rule,
      action: {
        hover: 'rgba(236, 239, 242, 0.05)',
        selected: 'rgba(247, 184, 61, 0.12)',
        focus: 'rgba(247, 184, 61, 0.16)',
      },
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: display,
      h1: { fontFamily: display, fontSize: '2.125rem', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.04 },
      h2: { fontFamily: display, fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.25 },
      kpi: {
        fontFamily: mono,
        fontSize: '2.75rem',
        fontWeight: 400,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums slashed-zero',
      },
      overline: {
        fontFamily: display,
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.4,
        textTransform: 'none',
      },
      body1: { lineHeight: 1.55 },
      body2: { lineHeight: 1.5 },
      caption: { fontSize: '0.8125rem', lineHeight: 1.45 },
      button: { textTransform: 'none', fontWeight: 500, fontFamily: display },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            borderColor: tk.rule,
            borderRadius: 10,
            backgroundColor: tk.paper2,
            transition: `border-color ${tk.durShort} ${tk.ease}`,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: { padding: 24, '&:last-child': { paddingBottom: 24 } },
        },
      },

      // ===== Campos de selección (Fecha, Servidor) =====
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: tk.paper3,
            borderRadius: 6,
            transition: `background-color ${tk.durShort} ${tk.ease}, box-shadow ${tk.durShort} ${tk.ease}`,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tk.rule2,
              transition: `border-color ${tk.durShort} ${tk.ease}`,
            },
            '&:hover': { backgroundColor: tk.paper4 },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tk.muted },
            // Foco: borde ámbar y un halo que se abre
            '&.Mui-focused': { boxShadow: `0 0 0 4px ${hex.accentSoft}` },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tk.accent, borderWidth: 1 },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: display,
            fontWeight: 500,
            color: tk.muted,
            transition: `color ${tk.durShort} ${tk.ease}, transform ${tk.durShort} ${tk.ease}`,
            '&.Mui-focused': { color: tk.accent },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: tk.muted,
            transition: `transform ${tk.durShort} ${tk.ease}, color ${tk.durShort} ${tk.ease}`,
          },
          iconOpen: { color: tk.accent },
        },
      },

      // ===== Menús desplegables: motion blur al abrir y cerrar =====
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: tk.paper4,
            border: `1px solid ${hex.rule2}`,
            borderRadius: 8,
            boxShadow: tk.shadowPop,
            marginTop: 6,
            willChange: 'transform, opacity, filter',
          },
        },
      },
      MuiMenu: {
        // Menu le pasa su propia transición a Popover, por eso se configura aquí.
        defaultProps: {
          slots: { transition: BlurFade },
          transitionDuration: { enter: 320, exit: 160 },
        },
        styleOverrides: {
          list: { padding: 6 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            position: 'relative',
            fontSize: '0.9375rem',
            borderRadius: 5,
            minHeight: 40,
            paddingLeft: 14,
            color: tk.ink2,
            transition: `background-color ${tk.durMicro} ${tk.ease}, color ${tk.durMicro} ${tk.ease}, padding-left ${tk.durShort} ${tk.ease}`,
            // Las opciones entran escalonadas con desenfoque horizontal
            animation: `item-in ${tk.durMedium} ${tk.ease} backwards`,
            ...Object.fromEntries(
              Array.from({ length: 8 }, (_, i) => [`&:nth-of-type(${i + 1})`, { animationDelay: `${60 + i * 35}ms` }]),
            ),
            // Barra ámbar a la izquierda de la opción elegida
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 4,
              top: 10,
              bottom: 10,
              width: 2,
              borderRadius: 2,
              backgroundColor: tk.accent,
              transform: 'scaleY(0)',
              transition: `transform ${tk.durShort} ${tk.ease}`,
            },
            '&:hover': { backgroundColor: 'rgba(236, 239, 242, 0.06)', color: tk.ink },
            '&.Mui-focusVisible': { backgroundColor: 'rgba(236, 239, 242, 0.06)', color: tk.ink },
            '&.Mui-selected': { backgroundColor: hex.accentSoft, color: tk.accentHi, fontWeight: 500, paddingLeft: 18 },
            '&.Mui-selected::before': { transform: 'scaleY(1)' },
            '&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': { backgroundColor: '#45320F' },
            '&:active': { transform: 'scale(0.985)' },
          },
        },
      },

      // ===== Tabla =====
      MuiTableCell: {
        styleOverrides: {
          root: { borderColor: tk.rule, fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem', color: tk.ink2 },
          head: {
            fontFamily: display,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: tk.muted,
            backgroundColor: tk.paper3,
            borderBottomColor: tk.rule2,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: { color: tk.muted },
          displayedRows: { fontFamily: mono, fontSize: '0.8125rem', color: tk.muted, fontVariantNumeric: 'tabular-nums slashed-zero' },
          actions: {
            '& .MuiIconButton-root': {
              border: `1px solid ${hex.rule2}`,
              borderRadius: 6,
              marginLeft: 6,
              color: tk.ink2,
              ...press,
              '&:hover': { backgroundColor: tk.paper4, borderColor: tk.accent, color: tk.accent },
              '&.Mui-disabled': { borderColor: tk.rule, color: tk.rule2 },
            },
          },
        },
      },

      // ===== Botones =====
      MuiButtonBase: {
        styleOverrides: {
          // Onda ámbar al hacer clic
          root: {
            '& .MuiTouchRipple-child': { backgroundColor: hex.accent },
            '& .MuiTouchRipple-rippleVisible': { opacity: 0.22 },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { minHeight: 44, borderRadius: 6, ...press },
          outlined: {
            borderColor: hex.rule2,
            color: tk.ink,
            backgroundColor: tk.paper2,
            '&:hover': { borderColor: tk.accent, color: tk.accentHi, backgroundColor: hex.accentSoft },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: { root: press },
      },

      // ===== Tooltip de los gráficos =====
      MuiChartsTooltip: {
        styleOverrides: {
          paper: {
            backgroundColor: hex.paper3,
            color: hex.ink,
            border: `1px solid ${hex.rule2}`,
            borderRadius: 8,
            boxShadow: 'var(--shadow-pop)',
            animation: `value-in 200ms ${'cubic-bezier(0.16, 1, 0.3, 1)'} both`,
            '& .MuiChartsTooltip-cell': { color: hex.ink, borderColor: hex.rule },
            '& .MuiChartsTooltip-axisValueCell, & thead .MuiChartsTooltip-cell': { fontFamily: mono, color: hex.cool },
            '& .MuiChartsTooltip-valueCell': { fontFamily: mono, fontVariantNumeric: 'tabular-nums slashed-zero' },
          },
        },
      },
    },
  },
  esES,
)

// Tamaños más compactos en móvil.
const theme = createTheme(baseTheme, {
  typography: {
    h1: { [baseTheme.breakpoints.down('md')]: { fontSize: '1.75rem' } },
    kpi: { [baseTheme.breakpoints.down('md')]: { fontSize: '2.125rem' } },
  },
})

declare module '@mui/material/styles' {
  interface TypographyVariants {
    kpi: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    kpi?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    kpi: true
  }
}

export default theme
