import './globals.css'
import { Navbar } from './components/navbar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div>
          <Navbar/>
            <main>
              {children}
            </main>
        </div>
      </body>
    </html>
  )
}
