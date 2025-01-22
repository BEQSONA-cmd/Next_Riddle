import "@/styles/globals.css";
import type { AppProps } from "next/app";

export const metadata = {
  title: 'Template',
  description: "Welcome to Beqa Tvildiani's personal Template",
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Shared Navbar (if needed) */}
      <nav className="bg-gray-800 p-4">
        <ul className="container mx-auto flex gap-1 items-center">
          <li><a href="/" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Home</a></li>
          <li><a href="Page_1" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Page 1</a></li>
          <li><a href="Page_2" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Page 2</a></li>
          <li><a href="Page_3" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Page 3</a></li>
        </ul>
      </nav>

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
