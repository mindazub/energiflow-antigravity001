import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthNav } from "@/components/auth-nav";
import { Footer } from "@/components/footer";
import { ActivityTracker } from "@/components/activity-tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnergiFlow | Smart Energy Management",
  description: "Next-gen energy management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ActivityTracker />
          <nav style={{
            padding: '1.25rem 0',
            borderBottom: '1px solid var(--border)',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(16px)',
            position: 'fixed',
            width: '100%',
            zIndex: 50,
            top: 0,
            transition: 'background 0.3s'
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="/" style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                background: 'linear-gradient(to right, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                EnergiFlow
              </a>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <ThemeToggle />
                <AuthNav />
              </div>
            </div>
          </nav>
          <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
