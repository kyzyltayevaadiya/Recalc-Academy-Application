/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			quest: {
  				'gold': '#FDB813',
  				'gold-deep': '#B8860B',
  				'navy': '#050B14',
  				'navy-deep': '#02060C',
  				'crimson': '#C8102E',
  				'ember': '#FF6B1A',
  				'moss': '#1A2F20',
  				'terminal': '#4AF626',
  				'ice': '#A9D8FF',
  				'purple': '#3D2B6E',
  			}
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			pixel: ['var(--font-pixel)'],
  			mono: ['var(--font-mono)']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'twinkle': {
  				'0%, 100%': { opacity: '0.3' },
  				'50%': { opacity: '1' }
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-12px)' }
  			},
  			'flicker': {
  				'0%, 100%': { opacity: '1' },
  				'45%': { opacity: '0.85' },
  				'50%': { opacity: '0.6' },
  				'55%': { opacity: '0.9' }
  			},
  			'walk-bob': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-3px)' }
  			},
			'breath': {
  				'0%, 100%': { transform: 'scaleY(1)' },
  				'50%': { transform: 'scaleY(1.04)' }
  			},
  			'rise': {
  				'0%': { transform: 'translateY(0) scale(1)', opacity: '0.9' },
  				'100%': { transform: 'translateY(-120px) scale(0.4)', opacity: '0' }
  			},
  			'shimmer': {
  				'0%': { backgroundPosition: '-200% 0' },
  				'100%': { backgroundPosition: '200% 0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'twinkle': 'twinkle 3s ease-in-out infinite',
  			'float-slow': 'float-slow 6s ease-in-out infinite',
  			'flicker': 'flicker 2.5s ease-in-out infinite',
  			'walk-bob': 'walk-bob 0.5s ease-in-out infinite',
  			'breath': 'breath 3s ease-in-out infinite',
  			'rise': 'rise 4s linear infinite',
  			'shimmer': 'shimmer 3s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
