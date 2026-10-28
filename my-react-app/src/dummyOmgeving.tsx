import { Route, Routes } from 'react-router-dom'
import Google from './Pages/Google'
import Facebook from './Pages/Facebook/Facebook'
import Instagram from './Pages/Insta/Instagram'

function DummyOmgeving() {
  return (
    <div className="dummy-omgeving">
      <Routes>
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="*" element={<Google />} />
      </Routes>
    </div>
  )
}

export default DummyOmgeving
