import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material'
import React from 'react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps extends Omit<SelectProps, 'onChange'> {
  value: string
  onChange: (event: SelectChangeEvent<unknown>) => void
  options: Option[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  sx,
  ...rest
}) => {
  return (
    <Select value={value} onChange={onChange} sx={sx} {...rest}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelect
