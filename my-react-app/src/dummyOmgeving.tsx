import { Route, Routes } from 'react-router-dom'
import Test from './Pages/test'
import Facebook from './Pages/Facebook/Facebook'
import Instagram from './Pages/Insta/Instagram'

function DummyOmgeving() {
  return (
    <div className="dummy-omgeving">
      <Routes>
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="*" element={<Test />} />
      </Routes>
    </div>
  )
}

export default DummyOmgeving
