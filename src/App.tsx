import React from "react"
import { AppProviders } from "./app/providers"
import { AppRouter } from "./app/router"
import { Header, Footer } from "./components"

const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </AppProviders>
  )
}

export default App
