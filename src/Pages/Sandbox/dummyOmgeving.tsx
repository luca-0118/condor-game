import { Route, Routes } from 'react-router-dom'
import Google from './Google search/Google'
import GoogleResults from './Google search/Results/GoogleResults'
import Facebook from './Facebook/Facebook'
import Instagram from './Insta/Instagram'
import InstagramProfile from './Insta/InstagramProfile'
import InstaDM from './Insta/insta-dm'
import Webshop from './Webshop/Webshop'
import ReverseImageSearch from './ReverseImageSearch/ReverseImageSearch'

function DummyOmgeving() {
  return (
    <div className="dummy-omgeving">
      <Routes>
        <Route path="search" element={<GoogleResults />} />
        <Route path="images" element={<ReverseImageSearch />} />
        <Route path="instagram" element={<Instagram />} />
        <Route path="instagram/messages" element={<InstaDM />} />
        <Route path="instagram/profile/:username/post/:postId" element={<InstagramProfile />} />
        <Route path="instagram/profile" element={<InstagramProfile />} />
        <Route path="instagram/profile/:username" element={<InstagramProfile />} />
        <Route path="facebook" element={<Facebook />} />
        <Route path="monajewelry/*" element={<Webshop />} />
        <Route index element={<Google />} />
      </Routes>
    </div>
  )
}

export default DummyOmgeving
