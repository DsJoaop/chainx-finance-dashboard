'use client'

import { useCallback } from 'react'

interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite'
}

export function useAnimation() {
  const getFadeIn = useCallback((config?: AnimationConfig) => {
    return {
      animation: `fadeIn ${config?.duration || 300}ms ${config?.easing || 'ease-in-out'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 1
      }`,
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    }
  }, [])

  const getSlideIn = useCallback(
    (direction: 'left' | 'right' | 'top' | 'bottom', config?: AnimationConfig) => {
      const getTransform = () => {
        switch (direction) {
          case 'left':
            return 'translateX(-100%)'
          case 'right':
            return 'translateX(100%)'
          case 'top':
            return 'translateY(-100%)'
          case 'bottom':
            return 'translateY(100%)'
        }
      }

      return {
        animation: `slideIn ${config?.duration || 300}ms ${config?.easing || 'ease-in-out'} ${
          config?.delay || 0
        }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
          config?.iterationCount || 1
        }`,
        '@keyframes slideIn': {
          '0%': {
            opacity: 0,
            transform: getTransform(),
          },
          '100%': {
            opacity: 1,
            transform: 'translate(0)',
          },
        },
      }
    },
    []
  )

  const getScale = useCallback((config?: AnimationConfig) => {
    return {
      animation: `scale ${config?.duration || 300}ms ${config?.easing || 'ease-in-out'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 1
      }`,
      '@keyframes scale': {
        '0%': {
          opacity: 0,
          transform: 'scale(0.95)',
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
    }
  }, [])

  const getRotate = useCallback((config?: AnimationConfig) => {
    return {
      animation: `rotate ${config?.duration || 300}ms ${config?.easing || 'ease-in-out'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 1
      }`,
      '@keyframes rotate': {
        '0%': {
          opacity: 0,
          transform: 'rotate(-180deg)',
        },
        '100%': {
          opacity: 1,
          transform: 'rotate(0)',
        },
      },
    }
  }, [])

  const getPulse = useCallback((config?: AnimationConfig) => {
    return {
      animation: `pulse ${config?.duration || 1500}ms ${config?.easing || 'ease-in-out'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 'infinite'
      }`,
      '@keyframes pulse': {
        '0%, 100%': {
          transform: 'scale(1)',
        },
        '50%': {
          transform: 'scale(1.05)',
        },
      },
    }
  }, [])

  const getBounce = useCallback((config?: AnimationConfig) => {
    return {
      animation: `bounce ${config?.duration || 1000}ms ${config?.easing || 'cubic-bezier(0.8,0,1,1)'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 'infinite'
      }`,
      '@keyframes bounce': {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'translateY(0)',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      },
    }
  }, [])

  const getShake = useCallback((config?: AnimationConfig) => {
    return {
      animation: `shake ${config?.duration || 1000}ms ${config?.easing || 'ease-in-out'} ${
        config?.delay || 0
      }ms ${config?.direction || 'normal'} ${config?.fillMode || 'forwards'} ${
        config?.iterationCount || 1
      }`,
      '@keyframes shake': {
        '0%, 100%': {
          transform: 'translateX(0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
          transform: 'translateX(-10px)',
        },
        '20%, 40%, 60%, 80%': {
          transform: 'translateX(10px)',
        },
      },
    }
  }, [])

  return {
    getFadeIn,
    getSlideIn,
    getScale,
    getRotate,
    getPulse,
    getBounce,
    getShake,
  }
} 