'use client'

import { useState, useEffect, useCallback } from 'react'
import { theme, Theme } from '@/styles/theme'

type ThemeMode = 'light' | 'dark'

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null

    // Usar modo salvo ou preferência do sistema
    setMode(savedMode || (prefersDark ? 'dark' : 'light'))
  }, [])

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', newMode)
      return newMode
    })
  }, [])

  useEffect(() => {
    // Aplicar classes do tema ao documento
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
  }, [mode])

  const getColor = useCallback(
    (path: keyof Theme['colors']) => {
      const color = theme.colors[path]
      return mode === 'dark' ? color : color
    },
    [mode]
  )

  const getTypography = useCallback(
    (
      size: keyof Theme['typography']['fontSize'],
      weight: keyof Theme['typography']['fontWeight'] = 'normal'
    ) => {
      return {
        fontSize: theme.typography.fontSize[size],
        fontWeight: theme.typography.fontWeight[weight],
        lineHeight: theme.typography.lineHeight.normal,
      }
    },
    []
  )

  const getSpacing = useCallback((value: keyof Theme['spacing']) => {
    return theme.spacing[value]
  }, [])

  const getRadius = useCallback((value: keyof Theme['borderRadius']) => {
    return theme.borderRadius[value]
  }, [])

  const getShadow = useCallback((value: keyof Theme['shadows']) => {
    return theme.shadows[value]
  }, [])

  const getTransition = useCallback((value: keyof Theme['transitions']) => {
    return theme.transitions[value]
  }, [])

  const getBreakpoint = useCallback((value: keyof Theme['breakpoints']) => {
    return theme.breakpoints[value]
  }, [])

  return {
    mode,
    toggleMode,
    getColor,
    getTypography,
    getSpacing,
    getRadius,
    getShadow,
    getTransition,
    getBreakpoint,
    theme,
  }
} 