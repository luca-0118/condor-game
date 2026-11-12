import { useRef, useState, type SubmitEvent } from 'react'
import { useSessie } from '../sessie/sessieContext'


function AdminKnop() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const nextDialogRef = useRef<HTMLDialogElement>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const openNextDialog = () => {
    dialogRef.current?.close()
    setPassword('')
    setError('')
    requestAnimationFrame(() => nextDialogRef.current?.showModal())
  }

  const checkPassword = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (!adminPassword) {
      setError('Admin access is not configured.')
      return
    }

    if (password !== adminPassword) {
      setError('Incorrect password.')
      return
    }

    openNextDialog()
  }

  return (
    <>
      <button
        className="ch-admin-knop"
        type="button"
        onClick={() => {
          setPassword('')
          setError('')
          dialogRef.current?.showModal()
        }}
      >
        Admin
      </button>
      <dialog ref={dialogRef} className="ch-admin-dialog" aria-labelledby="admin-title">
        <h2 id="admin-title">Admin</h2>
        <form onSubmit={checkPassword}>
          <label htmlFor="admin-password">Enter password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'admin-password-error' : undefined}
          />
          {error && <p id="admin-password-error" role="alert">{error}</p>}
          <button type="submit">Continue</button>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </form>
      </dialog>
      <dialog ref={nextDialogRef} className="ch-admin-dialog" aria-labelledby="admin-panel-title">
        <h2 id="admin-panel-title">Admin panel</h2>
        { Tijdaanpassen(5 * -60, 'Verwijder 5 minuten') }
        { Tijdaanpassen(5 * 60, 'Voeg 5 minuten toe') }
        <p>This is the next dialog content.</p>
        <button type="button" onClick={() => nextDialogRef.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  )
}

function Tijdaanpassen(tijd: number, label: string) {
  const { voegTimerTijdToe } = useSessie()
  return (
    <button
      type="button" onClick={() => voegTimerTijdToe(tijd)}>
          {label}
        </button>
  )
}



export default AdminKnop