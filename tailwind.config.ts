/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		keyframes: {
				visitedCell: {
					'0%': { backgroundColor: '#f59e0b', transform: 'scale(0.4)' }, // amber-400
					'33%': { backgroundColor: '#f59e0b', transform: 'scale(0.8)' }, // amber-400
					'67%': { backgroundColor: '#a855f7', transform: 'scale(1.1)' }, // amber-500
					'100%': { backgroundColor: '#9333ea', transform: 'scale(1)' }   // amber-300
				},

				waterCell: {
					'0%': { backgroundColor: '#06b6d4', transform: 'scale(0.4)' }, // cyan-500
					'33%': { backgroundColor: '#06b6d4', transform: 'scale(0.8)' }, // cyan-500
					'67%': { backgroundColor: '#0891b2', transform: 'scale(1.1)' }, // cyan-600
					'100%': { backgroundColor: '#22d3ee', transform: 'scale(1)' }   // cyan-400 (bright pop)
				},

				wallCell: {
					'0%': { backgroundColor: '#f87171', transform: 'scale(0.4)' },  // red-400
					'33%': { backgroundColor: '#f87171', transform: 'scale(0.8)' },  // red-400
					'67%': { backgroundColor: '#dc2626', transform: 'scale(1.1)' }, // red-600
					'100%': { backgroundColor: '#ef4444', transform: 'scale(1)' }, // red-500
				},

				grassCell: {
					'0%': { backgroundColor: '#84cc16', transform: 'scale(0.4)' }, // lime-500
					'33%': { backgroundColor: '#84cc16', transform: 'scale(0.8)' }, // lime-500
					'67%': { backgroundColor: '#65a30d', transform: 'scale(1.1)' }, // lime-600
					'100%': { backgroundColor: '#a3e635', transform: 'scale(1)' }   // lime-400
				},

				mountainCell: {
					'0%': { backgroundColor: '#8b5cf6', transform: 'scale(0.4)' }, // violet-500
					'33%': { backgroundColor: '#8b5cf6', transform: 'scale(0.8)' }, // violet-500
					'67%': { backgroundColor: '#7c3aed', transform: 'scale(1.1)' }, // violet-600
					'100%': { backgroundColor: '#a78bfa', transform: 'scale(1)' }   // violet-400
				},

				pathHighlight: {
					'0%': { backgroundColor: '#f59e0b', transform: 'scale(0.8)' },
					'33%': { backgroundColor: '#f59e0b', transform: 'scale(1)' },
					'50%': { backgroundColor: '#facc15', transform: 'scale(1.2)' },
					'100%': { backgroundColor: '#fbbf24', transform: 'scale(1)' },
				},

  			pulseScale: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(0.8)'
  				}
  			}
  		},
			animation: {
				pathHighlight: 'pathHighlight 0.6s ease-in-out forwards',
				waterCell: 'waterCell 0.3s ease-in-out forwards',
				wallCell: 'wallCell 0.3s ease-in-out forwards',
				grassCell: 'grassCell 0.3s ease-in-out forwards',
				mountainCell: 'mountainCell 0.3s ease-in-out forwards',
				visitedCell: 'visitedCell 1.6s ease-in-out forwards',
				pulseScale: 'pulseScale 1.5s ease-out infinite',
			},

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
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

