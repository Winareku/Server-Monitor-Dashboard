import { forwardRef } from 'react'
import Fade, { type FadeProps } from '@mui/material/Fade'

// Transición de los menús desplegables (Fecha, Servidor): aparecen bajando con motion blur vertical
// y se van subiendo con un desenfoque corto. Las animaciones están en styles/tokens.css.
const BlurFade = forwardRef<HTMLDivElement, FadeProps>(function BlurFade(props, ref) {
  const { onEnter, onExit, ...rest } = props
  return (
    <Fade
      ref={ref}
      {...rest}
      onEnter={(node, isAppearing) => {
        node.style.transformOrigin = 'top center'
        node.style.animation = 'menu-in var(--dur-medium) var(--ease-out) backwards'
        onEnter?.(node, isAppearing)
      }}
      onExit={(node) => {
        node.style.animation = 'menu-out 160ms var(--ease-in) both'
        onExit?.(node)
      }}
    />
  )
})

export default BlurFade
