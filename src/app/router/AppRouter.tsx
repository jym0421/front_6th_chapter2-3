import React from "react"
import { Routes, Route } from "react-router-dom"
import PostsManagerPage from "../../pages/PostsManagerPage"

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsManagerPage />} />
      <Route path="/posts" element={<PostsManagerPage />} />
    </Routes>
  )
}
