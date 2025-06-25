import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono, Noto_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const notoSerif = Noto_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-noto-serif",
})

export const metadata: Metadata = {
  title: "Stanislav - Marketing Professional",
  description: "Dynamic marketing professional from Moscow, Russia",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('portfolioTheme');
                  if (savedTheme === 'light') {
                    document.documentElement.style.backgroundColor = '#f8f8f8';
                    document.documentElement.style.color = '#333333';
                  } else {
                    document.documentElement.style.backgroundColor = '#000000';
                    document.documentElement.style.color = '#f0f0f0';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${ibmPlexMono.variable} ${notoSerif.variable}`}>{children}</body>
    </html>
  )
}
