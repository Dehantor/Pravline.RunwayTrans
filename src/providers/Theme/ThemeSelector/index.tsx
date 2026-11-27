'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

type ThemeSelectorProps = {
  labels: { label: string; auto: string; light: string; dark: string }
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ labels }) => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label={labels.label}
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder={labels.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">{labels.auto}</SelectItem>
        <SelectItem value="light">{labels.light}</SelectItem>
        <SelectItem value="dark">{labels.dark}</SelectItem>
      </SelectContent>
    </Select>
  )
}
