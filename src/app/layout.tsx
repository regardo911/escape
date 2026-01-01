import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Just Move to Vegas?",
  description: "Leaving California is easy. Escaping California taxes is not."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-haze">
          <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
