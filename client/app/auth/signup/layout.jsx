import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { FormProvider } from '@/app/utility/FormContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Caramel App Auth',
  description: "let's get you started",
}

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="./../favicon.png" sizes="any" />
      </head>
      <body>
       <FormProvider>
        {children}
       </FormProvider>
      </body>
    </html>
  )
}