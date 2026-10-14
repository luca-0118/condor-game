import { Route, Routes } from 'react-router-dom'
import Test from './Pages/test'
import Facebook from './Pages/Facebook/Facebook'

function DummyOmgeving() {
  return (
    <Routes>
      <Route path="/Facebook" element={<Facebook />} />
      <Route path="*" element={<Test />} />
    </Routes>
  )
}

export default DummyOmgeving
