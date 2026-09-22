import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/Landing'
import { CameraPage } from './pages/Camera'
import { GalleryPage } from './pages/Gallery'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
