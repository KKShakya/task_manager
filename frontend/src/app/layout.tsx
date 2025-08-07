import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/ui/theme-provider'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
