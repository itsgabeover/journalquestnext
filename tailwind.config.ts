import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx,css}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        fluidSm: "clamp(0.875rem, 0.8vw + 0.3rem, 1rem)", // ~14–16px
        fluidBase: "clamp(1rem, 1vw + 0.2rem, 1.25rem)", // ~16–20px
        fluidLg: "clamp(1.25rem, 1.2vw + 0.25rem, 1.75rem)", // ~20–28px
        fluidXl: "clamp(1.5rem, 1.6vw + 0.3rem, 2.25rem)", // ~24–36px
      },
      spacing: {
        fluidPadding: "clamp(1rem, 2vw, 2rem)", // Optional: responsive padding
      },
      colors: {
        parchment: {
          light: "#fbf4e9",
          DEFAULT: "#f5edd6",
          dark: "#e8d9b5",
        },
        leather: {
          light: "#a98e63",
          DEFAULT: "#896308",
          dark: "#654a06",
        },
        mythicalBlue: {
          "50": "#EDF2F7",
          "100": "#E2E8F0",
          "200": "#C5D1E8",
          "300": "#A9B9D8",
          "400": "#7A94C1",
          "500": "#4A69A9",
          "600": "#3A5488",
          "700": "#2A3F66",
          "800": "#1A2A44",
          "900": "#0A1522",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        sans: ["system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
