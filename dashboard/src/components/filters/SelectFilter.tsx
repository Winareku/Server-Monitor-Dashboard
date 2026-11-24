import { useId } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import type { SelectOption } from '../../types/dashboard'

interface SelectFilterProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export default function SelectFilter({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  const id = useId()

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    // Animación de hover en styles/tokens.css (.select-hover): la luz sigue al cursor con --mx / --my.
    <FormControl
      fullWidth
      size="small"
      className="select-hover"
      onPointerMove={(e) => {
        const root = e.currentTarget.querySelector<HTMLElement>('.MuiOutlinedInput-root')
        if (!root) return
        const r = root.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      sx={{ maxWidth: { md: 300 } }}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        value={value}
        onChange={handleChange}
        // El valor elegido entra con motion blur cada vez que cambia
        renderValue={(v) => (
          <span key={v} className="select-value">
            {options.find((o) => o.value === v)?.label ?? v}
          </span>
        )}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
