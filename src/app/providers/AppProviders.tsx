import React from "react"
import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "./QueryProvider"
import { queryClient } from "../../shared/api/query-client"

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryProvider>
  )
}
