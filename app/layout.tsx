import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Noah Edge",
  description: "Noah Edge's Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        {/* Apply saved preferences before the browser paints the page. */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem("theme");var theme=stored==="light"||stored==="system"?stored:"dark";var dark=theme==="dark"||(theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var resolved=dark?"dark":"light";document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(resolved);document.documentElement.style.colorScheme=resolved}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
