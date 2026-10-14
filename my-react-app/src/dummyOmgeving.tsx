import { Route, Routes } from 'react-router-dom'
import Test from './Pages/test'
import Instagram from './Pages/Insta/Instagram'

function DummyOmgeving() {
  return (
    <Routes>
      <Route path="/instagram" element={<Instagram />} />
      <Route path="*" element={<Test />} />
    </Routes>
  )
}

export default DummyOmgeving
