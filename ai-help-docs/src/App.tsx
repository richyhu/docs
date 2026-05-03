import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import DocPage from "@/pages/DocPage"
import SearchPage from "@/pages/SearchPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  )
}
