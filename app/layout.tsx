import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { FilterProvider } from "@/components/filter-context"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <FilterProvider>{children}</FilterProvider>
      </body>
    </html>
  )
}
