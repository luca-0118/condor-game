import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './webshop.css'

/* ===== Placeholder data (edit content here) ===== */
const brandName = 'MERKNAAM'

const product = {
  id: 'product-1',
  name: 'Hier product',
  price: 49.95,
  oldPrice: 89.95,
  shortText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.',
  details: [
    { title: 'Materiaal', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Verzending en retour', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ],
  images: ['Productfoto 1', 'Productfoto 2', 'Productfoto 3', 'Productfoto 4'],
}

const usps = [
  { title: 'Lorem ipsum', text: 'Dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Lorem ipsum', text: 'Dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Lorem ipsum', text: 'Dolor sit amet, consectetur adipiscing elit.' },
]

const reviews = [
  { id: 1, name: 'Naam', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, name: 'Naam', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 3, name: 'Naam', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
]

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price)
}

/* ===== Webshop (houdt het winkelmandje bij voor alle pagina's) ===== */
function Webshop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  function addToCart(quantity: number) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, { id: product.id, name: product.name, price: product.price, quantity }]
    })
    setCartOpen(true)
  }

  function changeQuantity(id: string, change: number) {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <div className="webshop">
      <div className="shop-scroll">
        <p className="announcement">Gratis verzending vanaf € 50</p>
        <ShopHeader cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

        <Routes>
          <Route index element={<Home />} />
          <Route path="product" element={<ProductPage onAdd={addToCart} />} />
        </Routes>

        <ShopFooter />
      </div>

      {cartOpen && (
        <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} />
      )}
    </div>
  )
}

/* ===== Header ===== */
function ShopHeader({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <header className="shop-header">
      <nav className="shop-nav" aria-label="Webshop navigatie">
        <Link to="/webshop/product">Shop</Link>
        <a href="#">Over ons</a>
        <a href="#">Contact</a>
      </nav>

      <Link to="/webshop" className="shop-logo">
        {brandName}
      </Link>

      <button className="cart-button" onClick={onCartClick}>
        Winkelmand ({cartCount})
      </button>
    </header>
  )
}

/* ===== Homepagina ===== */
function Home() {
  return (
    <main>
      <section className="hero">
        <ImagePlaceholder label={product.images[0]} />

        <div className="hero-text">
          <p className="label">Nieuw</p>
          <h1>{product.name}</h1>
          <p>{product.shortText}</p>
          <Price />
          <Link to="/webshop/product" className="shop-btn">
            Bekijk product
          </Link>
        </div>
      </section>

      <section className="usps">
        {usps.map((usp, index) => (
          <div key={index} className="usp">
            <h3>{usp.title}</h3>
            <p>{usp.text}</p>
          </div>
        ))}
      </section>

      <section className="reviews">
        <h2>Wat klanten zeggen</h2>
        <div className="review-list">
          {reviews.map((review) => (
            <figure key={review.id} className="review">
              <p className="stars">★★★★★</p>
              <blockquote>{review.text}</blockquote>
              <figcaption>{review.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}

/* ===== Productpagina ===== */
function ProductPage({ onAdd }: { onAdd: (quantity: number) => void }) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <main className="product-page">
      <p className="breadcrumb">
        <Link to="/webshop">Home</Link> / {product.name}
      </p>

      <div className="product-layout">
        <div className="gallery">
          <ImagePlaceholder label={product.images[activeImage]} />
          <div className="thumbs">
            {product.images.map((image, index) => (
              <button
                key={image}
                className={`thumb ${index === activeImage ? 'thumb--active' : ''}`}
                onClick={() => setActiveImage(index)}
                aria-label={image}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <Price />
          <p className="rating">★★★★★ <span>(0 reviews)</span></p>
          <p className="description">{product.description}</p>

          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Minder">
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Meer">
                +
              </button>
            </div>
            <button className="shop-btn" onClick={() => onAdd(quantity)}>
              In winkelmand
            </button>
          </div>

          {product.details.map((detail) => (
            <details key={detail.title} className="detail">
              <summary>{detail.title}</summary>
              <p>{detail.text}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  )
}

/* ===== Winkelmandje (schuift in vanaf rechts) ===== */
function CartDrawer({
  cart,
  onClose,
  onChangeQuantity,
}: {
  cart: CartItem[]
  onClose: () => void
  onChangeQuantity: (id: string, change: number) => void
}) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-top">
          <h2>Winkelmand</h2>
          <button className="cart-close" onClick={onClose} aria-label="Sluiten">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Je winkelmand is leeg.</p>
        ) : (
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-thumb" />
                <div>
                  <p>{item.name}</p>
                  <p className="muted">{formatPrice(item.price)}</p>
                  <div className="quantity quantity--small">
                    <button onClick={() => onChangeQuantity(item.id, -1)} aria-label="Minder">
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onChangeQuantity(item.id, 1)} aria-label="Meer">
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-bottom">
          <p className="subtotal">
            <span>Subtotaal</span>
            <span>{formatPrice(subtotal)}</span>
          </p>
          {/* Afrekenen komt later, staat als aparte taak in DevOps */}
          <button className="shop-btn" disabled>
            Afrekenen
          </button>
        </div>
      </aside>
    </div>
  )
}

/* ===== Footer ===== */
function ShopFooter() {
  return (
    <footer className="shop-footer">
      <div>
        <p className="shop-logo">{brandName}</p>
        <p className="muted">Lorem ipsum dolor sit amet.</p>
      </div>
      <div>
        <h4>Klantenservice</h4>
        <a href="#">Contact</a>
        <a href="#">Verzending</a>
        <a href="#">Retourneren</a>
      </div>
      <div>
        <h4>Over ons</h4>
        <a href="#">Ons verhaal</a>
        <a href="#">Algemene voorwaarden</a>
      </div>
      <p className="copyright">© 2026 {brandName}</p>
    </footer>
  )
}

/* ===== Kleine onderdelen ===== */
function Price() {
  return (
    <p className="price">
      {formatPrice(product.price)} <s>{formatPrice(product.oldPrice)}</s>
    </p>
  )
}

function ImagePlaceholder({ label }: { label: string }) {
  return <div className="image-placeholder">{label}</div>
}

export default Webshop
