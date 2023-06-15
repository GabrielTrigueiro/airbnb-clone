import './globals.css'

import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import ToasterProivider from './providers/ToastProvider'
import getCurrentUser from './api/actions/getCurrentUser'

import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'

import { Nunito } from 'next/font/google'
import SearchModal from './components/modals/SearchModal'

//fonte
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProivider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
