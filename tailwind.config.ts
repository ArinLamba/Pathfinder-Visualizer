/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		keyframes: {
				visitedCell: {
					'0%':   { backgroundColor: '#ef4444', transform: 'scale(0.4)', borderRadius: "50%"}, // amber start
					'50%':  { backgroundColor: '#1d4ed8', transform: 'scale(0.8)',  },
					'75%':  { backgroundColor: '#a855f7', transform: 'scale(1.1)', }, // purple pop
					'100%': { backgroundColor: '#9333ea', transform: 'scale(1)', }    // cyan end
				},

        flashWeighted: {
          "0%": 	{ backgroundColor: "#ef4444", },   // yellow-400 (flash start)
          "100%": { backgroundColor: "#9333ea" }, // blue-500 (final visited color)
        },

				waterCell: {
					'0%':   { backgroundColor: '#06b6d4', transform: 'scale(0.4)' }, // bright cyan
					'33%':  { backgroundColor: '#06b6d4', transform: 'scale(0.8)' },
					'67%':  { backgroundColor: '#0891b2', transform: 'scale(1.1)' }, // deep cyan
					'100%': { backgroundColor: '#1d4ed8', transform: 'scale(1)' }    // strong blue
				},

				wallCell: {
					'0%':   { backgroundColor: '#52525b', transform: 'scale(0.4)' }, // zinc-300 (light gray, pops on black bg)
					'33%':  { backgroundColor: '#71717a', transform: 'scale(0.8)' }, // zinc-400
					'67%':  { backgroundColor: '#a1a1aa', transform: 'scale(1.1)' }, // zinc-500
					'100%': { backgroundColor: '#d4d4d8', transform: 'scale(1)' }    // zinc-600 (dark gray, not black)
				},

				grassCell: {
					'0%':   { backgroundColor: '#bbf7d0', transform: 'scale(0.4)' }, // green-200
					'33%':  { backgroundColor: '#86efac', transform: 'scale(0.8)' }, // green-300
					'67%':  { backgroundColor: '#22c55e', transform: 'scale(1.1)' }, // green-500
					'100%': { backgroundColor: '#15803d', transform: 'scale(1)' }    // green-700 (lush)
				},

				mountainCell: {
					'0%':   { backgroundColor: '#d6a673', transform: 'scale(0.4)' }, // light brown
					'33%':  { backgroundColor: '#d6a673', transform: 'scale(0.8)' },
					'67%':  { backgroundColor: '#b07c5d', transform: 'scale(1.1)' }, // rocky brown
					'100%': { backgroundColor: '#8b5e3c', transform: 'scale(1)' }    // deep earthy
				},
				weightedVisitedCell: {
					'0%':   { transform: 'scale(0.4)' }, // light brown
					'33%':  { transform: 'scale(0.8)' },
					'67%':  { transform: 'scale(1.2)' }, // rocky brown
					'100%': { transform: 'scale(1)' }    // deep earthy
				},

				pathHighlight: {
					'0%': 	{ backgroundColor: '#f59e0b', transform: 'scale(0.8)' },
					'33%': 	{ backgroundColor: '#f59e0b', transform: 'scale(1)' },
					'50%': 	{ backgroundColor: '#facc15', transform: 'scale(1.2)' },
					'100%': { backgroundColor: '#fbbf24', transform: 'scale(1)' },
				},

  			pulseScale: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(0.8)'
  				}
  			},


	      	LightVisitedCell: {
          '0%':   { backgroundColor: '#15803d', transform: 'scale(0.4)', borderRadius: "100%" },
          '50%':  { backgroundColor: '#06b6d4', transform: 'scale(0.8)' },
          '75%':  { backgroundColor: '#0891b2', transform: 'scale(1.1)' },
          '100%': { backgroundColor: '#9333ea', transform: 'scale(1)' },
        },

				LightWallCell: {
					'0%':   { backgroundColor: '#0D0D0D', transform: 'scale(0.6)' },
					'25%':  { backgroundColor: '#0D0D0D', transform: 'scale(0.8)' },
					'50%':  { backgroundColor: '#0D0D0D', transform: 'scale(1)' },
					'75%':  { backgroundColor: '#0D0D0D', transform: 'scale(1.2)' },
					'100%': { backgroundColor: '#0D0D0D', transform: 'scale(1)' }    
				},
  		},

			animation: {
				pathHighlight: 'pathHighlight 0.6s ease-in-out forwards',
				waterCell: 'waterCell 0.5s ease-in-out forwards',
				wallCell: 'wallCell 0.4s ease-in-out forwards',
				grassCell: 'grassCell 0.5s ease-in-out forwards',
				mountainCell: 'mountainCell 0.5s ease-in-out forwards',
				visitedCell: 'visitedCell 1.6s ease-in-out forwards',
				weightedVisitedCell: 'weightedVisitedCell 0.5s ease-in-out forwards',
				flashWeighted: "flashWeighted 0.4s ease-out forwards",
				pulseScale: 'pulseScale 1.5s ease-out infinite',

				LightWallCell: 'LightWallCell 0.2s ease-in-out forwards',
				LightVisitedCell: 'LightVisitedCell 1.6s ease-in-out forwards',
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

