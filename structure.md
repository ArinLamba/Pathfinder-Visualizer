/pathfinding-visualizer
├── public/
│   └── favicon.svg (or similar assets)
├── src/
│   ├── assets/                 # Static assets (icons, images, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── Grid.tsx
│   │   ├── Node.tsx
│   │   └── Controls.tsx
│   ├── pages/                  # Main views/pages (optional if SPA)
│   │   └── Home.tsx
│   ├── algorithms/             # DSA logic (BFS, DFS, Dijkstra, A*)
│   │   ├── bfs.ts
│   │   ├── dfs.ts
│   │   ├── dijkstra.ts
│   │   └── astar.ts
│   ├── types/                  # TypeScript types and interfaces
│   │   └── index.ts
│   ├── utils/                  # Helper functions, grid generation etc.
│   │   ├── generateGrid.ts
│   │   ├── delay.ts
│   │   └── animate.ts
│   ├── styles/                 # Optional: Tailwind overrides or extra styles
│   │   └── globals.css
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Vite entry point
│   └── index.css               # Tailwind base styles
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
