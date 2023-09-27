import './globals.css'
import { Navbar } from './components/navbar'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <UserProvider>
      <body>
        <div>
          <Navbar/>
            <main>
              {children}
            </main>
        </div>
      </body>
      </UserProvider>
    </html>
  )
}
