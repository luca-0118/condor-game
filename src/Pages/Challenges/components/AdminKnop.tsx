import { useRef } from 'react'

function AdminKnop() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        className="ch-admin-knop"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Admin
      </button>
      <dialog ref={dialogRef} className="ch-admin-dialog" aria-labelledby="admin-title">
        <h2 id="admin-title">Admin</h2>
        <p>Admin popup content goes here.</p>
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  )
}

export default AdminKnop