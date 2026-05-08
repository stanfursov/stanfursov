import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono, Noto_Serif } from "next/font/google"
import Script from "next/script"
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
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M98FLGPL');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FSR6ZS2CKJ"
          strategy="afterInteractive"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FSR6ZS2CKJ');
          `}
        </Script>
        {/* End Google tag */}
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
      <body className={`${inter.className} ${ibmPlexMono.variable} ${notoSerif.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M98FLGPL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
