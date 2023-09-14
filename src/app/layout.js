import './globals.css'

import ReduxProvider from './store/provider'
export const metadata = {
  title: 'First lesson',
  description: 'Learn next JS and react with decode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
