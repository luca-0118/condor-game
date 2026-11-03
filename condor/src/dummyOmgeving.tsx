import { Route, Routes } from 'react-router-dom'
import Google from './Pages/Google search/Google'
import GoogleResults from './Pages/Google search/Results/GoogleResults'
import Facebook from './Pages/Facebook/Facebook'
import Instagram from './Pages/Insta/Instagram'
import InstaDM from './Pages/Insta/insta-dm'
import Webshop from './Pages/Webshop/Webshop'

function DummyOmgeving() {
  return (
    <div className="dummy-omgeving">
      <Routes>
        <Route path="/search" element={<GoogleResults />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/instagram/messages" element={<InstaDM />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/webshop/*" element={<Webshop />} />
        <Route path="*" element={<Google />} />
      </Routes>
    </div>
  )
}

export default DummyOmgeving
