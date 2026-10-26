import { Route, Routes } from 'react-router-dom'
import Test from './Pages/test'
import Facebook from './Pages/Facebook/Facebook'
import Instagram from './Pages/Insta/Instagram'
import Webshop from './Pages/Webshop/Webshop'

function DummyOmgeving() {
  return (
    <div className="dummy-omgeving">
      <Routes>
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/webshop/*" element={<Webshop />} />
        <Route path="*" element={<Test />} />
      </Routes>
    </div>
  )
}

export default DummyOmgeving
