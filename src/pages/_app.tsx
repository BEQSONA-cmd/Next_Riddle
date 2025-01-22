import "@/styles/globals.css";
import type { AppProps } from "next/app";

export const metadata = {
  title: 'Template',
  description: "Welcome to Beqa Tvildiani's personal Template",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Main Content */}
      <main className="bg-gray-900 min-h-[85vh]">
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 absolute b-0 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; chxikvia.tech | Design by <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">BEQSONA-cmd</a></p>
        </div>
      </footer>
    </>
  );
}
