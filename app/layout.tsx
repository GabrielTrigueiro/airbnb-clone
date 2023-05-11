import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProivider from './providers/ToastProvider'
import LoginModal from './components/modals/LoginModal copy'

//fonte
const font = Nunito({subsets: ['latin']})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProivider/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
