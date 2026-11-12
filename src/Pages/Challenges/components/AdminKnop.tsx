import { useRef } from 'react'

function AdminKnop() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const nextDialogRef = useRef<HTMLDialogElement>(null)

  const openNextDialog = () => {
    dialogRef.current?.close()
    requestAnimationFrame(() => nextDialogRef.current?.showModal())
  }


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
        <button type="button" onClick={openNextDialog}>
          password
        </button>
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Close
        </button>
      </dialog>
      <dialog ref={nextDialogRef} className="ch-admin-dialog">
        <h2>Next Dialog</h2>
        <p>This is the next dialog content.</p>
        <button type="button" onClick={() => nextDialogRef.current?.close()}>
          Close
        </button>
      </dialog>
    </>
  )
}

export default AdminKnop