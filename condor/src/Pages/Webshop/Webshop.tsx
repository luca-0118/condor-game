import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { categorieen } from './data'
import WinkelProvider from './winkel/WinkelProvider'
import Header from './components/Header'
import Footer from './components/Footer'
import Popup from './components/Popup'
import Home from './pages/Home'
import CategoriePagina from './pages/CategoriePagina'
import ProductPagina from './pages/ProductPagina'
import Winkelmandje from './pages/Winkelmandje'
import Afrekenen from './pages/Afrekenen'
import Klantenservice from './pages/Klantenservice'
import './webshop.css'

/*
  De layout van de shop. Header, Footer en Popup staan hier één keer en blijven staan.
  Alleen het stuk binnen <Routes> wisselt per pagina.
*/
function Webshop() {
  const { pathname } = useLocation()
  const shop = useRef<HTMLDivElement>(null)

  // Bij een andere pagina weer bovenaan beginnen.
  useEffect(() => {
    shop.current?.parentElement?.scrollTo(0, 0)
  }, [pathname])

  return (
    <WinkelProvider>
      <div className="webshop" ref={shop}>
        <Popup />
        <Header />
        <main>
          <Routes>
            <Route index element={<Home />} />
            {categorieen.map((c) => <Route key={c.pad} path={c.pad} element={<CategoriePagina pad={c.pad} />} />)}
            <Route path="product/:id" element={<ProductPagina />} />
            <Route path="winkelmandje" element={<Winkelmandje />} />
            <Route path="afrekenen" element={<Afrekenen />} />
            <Route path="klantenservice" element={<Klantenservice />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WinkelProvider>
  )
}

export default Webshop
