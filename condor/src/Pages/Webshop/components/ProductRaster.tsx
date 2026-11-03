import type { Product } from '../data'
import ProductKaart from './ProductKaart'

/*
  Zet een lijst producten als kaarten in een raster. Gebruikt op Home en op elke categoriepagina.
  Hoeveel kolommen er komen, regelt de CSS (.ws-raster) aan de hand van de breedte.
*/
function ProductRaster({ items }: { items: Product[] }) {
  return <div className="ws-raster">{items.map((item) => <ProductKaart key={item.id} item={item} />)}</div>
}

export default ProductRaster
