import './GameOverlay.css'

function GameOverlay() {
  return (
    <>
      <TopBar />
      <Sidebar />
    </>
  )
}

function TopBar() {
  return (
    <header className="top-bar">
      <p>Tijdelijke top bar</p>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <p>Tijdelijke sidebar</p>
    </aside>
  )
}

export default GameOverlay
