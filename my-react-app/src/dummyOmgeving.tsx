import { Route, Routes } from 'react-router-dom'
import Test from './Pages/test'

function DummyOmgeving() {
  return (
    <Routes>
      <Route path="*" element={<Test />} />
    </Routes>
  )
}

export default DummyOmgeving
