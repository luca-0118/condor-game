import { useCallback, useEffect, useMemo, useState, type FormEvent, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import './adminPage.css'

type Platform = 'instagram' | 'facebook'

type AdminUser = {
  id: number
  username: string
  name: string
  bio: string
  profilePicFilename: string | null
  location: string | null
  isPrivate: boolean
}

type AdminPost = {
  id: number
  userId: number
  text: string
  location: string | null
  postedAt: string
}

type UserForm = {
  id?: number
  username: string
  name: string
  bio: string
  location: string
  isPrivate: boolean
  profileImage: string | null
  removeProfilePicture: boolean
}

type PostForm = {
  id?: number
  text: string
  location: string
  postedAt: string
}

type AdminData = {
  users: AdminUser[]
  posts: AdminPost[]
}

const profileAssets = import.meta.glob<string>('../Sandbox/Insta/assets/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
})

function localDateTime() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

function profileImageUrl(filename: string | null) {
  return filename ? profileAssets[`../Sandbox/Insta/assets/${filename}`] : undefined
}

async function readApiJson<T>(response: Response): Promise<T> {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error(
      'The SQL editor is available only while the local Vite development server is running.',
    )
  }
  return (await response.json()) as T
}

async function postJson(url: string, value: unknown) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  })
  const result = await readApiJson<{ error?: string; id?: number }>(response)
  if (!response.ok) throw new Error(result.error ?? 'The change could not be saved.')
  return result
}

function AdminPage() {
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [data, setData] = useState<AdminData>({ users: [], posts: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [userForm, setUserForm] = useState<UserForm | null>(null)
  const [postForm, setPostForm] = useState<PostForm | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/admin/data?platform=${platform}`, {
      cache: 'no-store',
    })
    const result = await readApiJson<AdminData & { error?: string }>(response)
    if (!response.ok) {
      throw new Error(result.error ?? 'Could not load the SQL data.')
    }
    return result
  }, [platform])

  const loadData = useCallback(async () => {
    try {
      const result = await fetchData()
      setData(result)
      setSelectedUserId((current) =>
        result.users.some((user) => user.id === current) ? current : (result.users[0]?.id ?? null),
      )
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Could not connect to the local SQL editor.',
      )
    } finally {
      setLoading(false)
    }
  }, [fetchData])

  useEffect(() => {
    let active = true
    void fetchData().then(
      (result) => {
        if (!active) return
        setData(result)
        setSelectedUserId((current) =>
          result.users.some((user) => user.id === current)
            ? current
            : (result.users[0]?.id ?? null),
        )
        setLoading(false)
      },
      (loadError: unknown) => {
        if (!active) return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Could not connect to the local SQL editor.',
        )
        setLoading(false)
      },
    )
    return () => {
      active = false
    }
  }, [fetchData])

  const selectedUser = data.users.find((user) => user.id === selectedUserId) ?? null
  const selectedPosts = useMemo(
    () =>
      data.posts
        .filter((post) => post.userId === selectedUserId)
        .sort((a, b) => b.postedAt.localeCompare(a.postedAt)),
    [data.posts, selectedUserId],
  )
  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return data.users
    return data.users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search),
    )
  }, [data.users, query])

  const switchPlatform = (value: Platform) => {
    setPlatform(value)
    setLoading(true)
    setError(null)
    setSelectedUserId(null)
    setUserForm(null)
    setPostForm(null)
    setQuery('')
    setNotice('')
  }

  const editUser = (user: AdminUser) => {
    setSelectedUserId(user.id)
    setPostForm(null)
    setUserForm({
      id: user.id,
      username: user.username,
      name: user.name,
      bio: user.bio,
      location: user.location ?? '',
      isPrivate: user.isPrivate,
      profileImage: null,
      removeProfilePicture: false,
    })
  }

  const addUser = () => {
    setUserForm({
      username: '',
      name: '',
      bio: '',
      location: '',
      isPrivate: false,
      profileImage: null,
      removeProfilePicture: false,
    })
    setPostForm(null)
    setNotice('')
  }

  const selectProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) return
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError('Choose a PNG or JPEG image.')
      event.currentTarget.value = ''
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Profile images must be 2 MB or smaller.')
      event.currentTarget.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const image = reader.result
      if (typeof image === 'string') {
        setUserForm((current) =>
          current
            ? { ...current, profileImage: image, removeProfilePicture: false }
            : current,
        )
        setError(null)
      }
    }
    reader.onerror = () => setError('The selected image could not be read.')
    reader.readAsDataURL(file)
  }

  const saveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userForm) return
    setSaving(true)
    setError(null)
    try {
      const result = await postJson(`/api/admin/users?platform=${platform}`, {
        action: 'save',
        ...userForm,
      })
      await loadData()
      if (result.id !== undefined) setSelectedUserId(result.id)
      setUserForm(null)
      setNotice('User saved to the SQL file. Publish the updated app to share it.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The user could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  const deleteUser = async (user: AdminUser) => {
    if (
      !window.confirm(
        `Delete ${user.name} and their posts? This cannot be undone from this page.`,
      )
    ) {
      return
    }
    setSaving(true)
    setError(null)
    try {
      await postJson(`/api/admin/users?platform=${platform}`, {
        action: 'delete',
        id: user.id,
      })
      setUserForm(null)
      setPostForm(null)
      setNotice('User and their posts were removed from the SQL file.')
      await loadData()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The user could not be deleted.')
    } finally {
      setSaving(false)
    }
  }

  const editPost = (post: AdminPost) => {
    setPostForm({
      id: post.id,
      text: post.text,
      location: post.location ?? '',
      postedAt: post.postedAt.replace(' ', 'T').slice(0, 16),
    })
    setUserForm(null)
  }

  const addPost = () => {
    setPostForm({ text: '', location: '', postedAt: localDateTime() })
    setUserForm(null)
    setNotice('')
  }

  const savePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!postForm || !selectedUser) return
    setSaving(true)
    setError(null)
    try {
      await postJson(`/api/admin/posts?platform=${platform}`, {
        action: 'save',
        userId: selectedUser.id,
        ...postForm,
      })
      setPostForm(null)
      setNotice('Post saved to the SQL file. Publish the updated app to share it.')
      await loadData()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The post could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  const deletePost = async (post: AdminPost) => {
    if (!window.confirm('Delete this post? This cannot be undone from this page.')) return
    setSaving(true)
    setError(null)
    try {
      await postJson(`/api/admin/posts?platform=${platform}`, {
        action: 'delete',
        id: post.id,
      })
      setNotice('Post removed from the SQL file.')
      await loadData()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'The post could not be deleted.')
    } finally {
      setSaving(false)
    }
  }

  const formImage =
    userForm?.profileImage ??
    (userForm?.removeProfilePicture || !userForm?.id
      ? undefined
      : profileImageUrl(selectedUser?.profilePicFilename ?? null))

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Admin</p>
          <h1>Social accounts</h1>
          <p>
            Edit users and posts for the Facebook and Instagram sandboxes.
          </p>
        </div>
        <nav className="admin-links" aria-label="Main navigation">
          <Link to="/challenge">Back to challenges</Link>
        </nav>
      </header>

      <div className="admin-platform-bar">
        <div className="admin-platform-tabs" role="tablist" aria-label="Social network">
          {(['instagram', 'facebook'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={platform === value}
              className={platform === value ? 'active' : ''}
              onClick={() => switchPlatform(value)}
            >
              {value === 'instagram' ? 'Instagram' : 'Facebook'}
            </button>
          ))}
        </div>
        <button type="button" className="admin-button primary" onClick={addUser} disabled={loading}>
          Add user
        </button>
      </div>

      {error && <p className="admin-message error" role="alert">{error}</p>}
      {notice && <p className="admin-message success" role="status">{notice}</p>}

      <div className="admin-workspace">
        <aside className="admin-user-list" aria-label="Users">
          <label className="admin-search">
            <span>Find a user</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name or username"
            />
          </label>
          {loading ? (
            <p className="admin-muted" role="status">Loading users…</p>
          ) : filteredUsers.length ? (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  <button
                    type="button"
                    className={`admin-user-row${selectedUserId === user.id ? ' selected' : ''}`}
                    aria-pressed={selectedUserId === user.id}
                    onClick={() => {
                      setSelectedUserId(user.id)
                      setUserForm(null)
                      setPostForm(null)
                      setNotice('')
                    }}
                  >
                    <span className="admin-avatar">
                      {profileImageUrl(user.profilePicFilename) ? (
                        <img src={profileImageUrl(user.profilePicFilename)} alt="" />
                      ) : (
                        user.name.slice(0, 1).toUpperCase()
                      )}
                    </span>
                    <span className="admin-user-copy">
                      <strong>{user.name}</strong>
                      <span>@{user.username}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-muted">{query ? 'No matching users.' : 'No users yet.'}</p>
          )}
        </aside>

        <main className="admin-details">
          {loading && <p className="admin-muted" role="status">Loading account data…</p>}
          {!loading && !error && !selectedUser && !userForm && (
            <div className="admin-empty">
              <h2>Select a user</h2>
              <p>Choose an account from the list or add a new one.</p>
            </div>
          )}

          {selectedUser && !userForm && (
            <section className="admin-card">
              <div className="admin-profile-heading">
                <span className="admin-avatar large">
                  {profileImageUrl(selectedUser.profilePicFilename) ? (
                    <img src={profileImageUrl(selectedUser.profilePicFilename)} alt="" />
                  ) : (
                    selectedUser.name.slice(0, 1).toUpperCase()
                  )}
                </span>
                <div>
                  <p className="admin-eyebrow">{platform} account · ID {selectedUser.id}</p>
                  <h2>{selectedUser.name}</h2>
                  <p>@{selectedUser.username}{selectedUser.isPrivate ? ' · Private' : ''}</p>
                </div>
                <div className="admin-actions">
                  <button type="button" className="admin-button" onClick={() => editUser(selectedUser)}>
                    Edit user
                  </button>
                  <button
                    type="button"
                    className="admin-button danger"
                    disabled={saving}
                    onClick={() => void deleteUser(selectedUser)}
                  >
                    Delete user
                  </button>
                </div>
              </div>
              <p className="admin-bio">{selectedUser.bio || 'No bio'}</p>
              {selectedUser.location && <p className="admin-muted">📍 {selectedUser.location}</p>}

              <div className="admin-post-heading">
                <div>
                  <h3>Posts</h3>
                  <span>{selectedPosts.length} total</span>
                </div>
                <button type="button" className="admin-button primary" onClick={addPost}>
                  Add post
                </button>
              </div>
              {selectedPosts.length ? (
                <ul className="admin-post-list">
                  {selectedPosts.map((post) => (
                    <li key={post.id} className="admin-post">
                      <div>
                        <p>{post.text || 'No caption'}</p>
                        <span>
                          {post.postedAt}
                          {post.location ? ` · ${post.location}` : ''}
                        </span>
                      </div>
                      <div className="admin-actions">
                        <button type="button" className="admin-button" onClick={() => editPost(post)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-button danger"
                          disabled={saving}
                          onClick={() => void deletePost(post)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="admin-muted">This account has no posts yet.</p>
              )}
            </section>
          )}

          {userForm && (
            <section className="admin-card">
              <div className="admin-form-heading">
                <div>
                  <p className="admin-eyebrow">{platform} account</p>
                  <h2>{userForm.id ? 'Edit user' : 'Add user'}</h2>
                </div>
                <button type="button" className="admin-button" onClick={() => setUserForm(null)}>
                  Cancel
                </button>
              </div>
              <form className="admin-form" onSubmit={(event) => void saveUser(event)}>
                <label>
                  Username
                  <input
                    required
                    maxLength={50}
                    value={userForm.username}
                    onChange={(event) =>
                      setUserForm({ ...userForm, username: event.target.value })
                    }
                    placeholder="username"
                  />
                </label>
                <label>
                  Full name
                  <input
                    required
                    maxLength={100}
                    value={userForm.name}
                    onChange={(event) => setUserForm({ ...userForm, name: event.target.value })}
                    placeholder="Name"
                  />
                </label>
                <label>
                  Bio
                  <textarea
                    maxLength={500}
                    rows={3}
                    value={userForm.bio}
                    onChange={(event) => setUserForm({ ...userForm, bio: event.target.value })}
                    placeholder="A short bio"
                  />
                </label>
                <label>
                  Location
                  <input
                    maxLength={100}
                    value={userForm.location}
                    onChange={(event) =>
                      setUserForm({ ...userForm, location: event.target.value })
                    }
                    placeholder="City"
                  />
                </label>
                {platform === 'instagram' && (
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={userForm.isPrivate}
                      onChange={(event) =>
                        setUserForm({ ...userForm, isPrivate: event.target.checked })
                      }
                    />
                    Private account
                  </label>
                )}
                <div className="admin-photo-field">
                  <span>Profile picture</span>
                  <div className="admin-photo-control">
                    <span className="admin-avatar large">
                      {formImage ? (
                        <img
                          src={formImage}
                          alt="Profile picture preview"
                          onError={() => setError('The current profile image could not be loaded.')}
                        />
                      ) : (
                        userForm.name.slice(0, 1).toUpperCase() || '?'
                      )}
                    </span>
                    <div>
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={selectProfileImage}
                      />
                      <small>PNG or JPEG, up to 2 MB.</small>
                      {(formImage ||
                        (!userForm.removeProfilePicture &&
                          userForm.id &&
                          selectedUser?.profilePicFilename)) && (
                        <button
                          type="button"
                          className="admin-text-button"
                          onClick={() =>
                            setUserForm({
                              ...userForm,
                              profileImage: null,
                              removeProfilePicture: true,
                            })
                          }
                        >
                          Remove picture
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="admin-button primary" disabled={saving}>
                    {saving ? 'Saving…' : 'Save user'}
                  </button>
                  {userForm.id && selectedUser && (
                    <button
                      type="button"
                      className="admin-button danger"
                      disabled={saving}
                      onClick={() => void deleteUser(selectedUser)}
                    >
                      Delete user
                    </button>
                  )}
                </div>
              </form>
            </section>
          )}

          {postForm && selectedUser && (
            <section className="admin-card admin-post-editor">
              <div className="admin-form-heading">
                <div>
                  <p className="admin-eyebrow">Post by @{selectedUser.username}</p>
                  <h2>{postForm.id ? 'Edit post' : 'Add post'}</h2>
                </div>
                <button type="button" className="admin-button" onClick={() => setPostForm(null)}>
                  Cancel
                </button>
              </div>
              <form className="admin-form" onSubmit={(event) => void savePost(event)}>
                <label>
                  {platform === 'instagram' ? 'Caption' : 'Post text'}
                  <textarea
                    required
                    maxLength={10000}
                    rows={5}
                    value={postForm.text}
                    onChange={(event) => setPostForm({ ...postForm, text: event.target.value })}
                  />
                </label>
                <label>
                  Location
                  <input
                    maxLength={200}
                    value={postForm.location}
                    onChange={(event) =>
                      setPostForm({ ...postForm, location: event.target.value })
                    }
                  />
                </label>
                <label>
                  Posted at
                  <input
                    type="datetime-local"
                    required
                    value={postForm.postedAt}
                    onChange={(event) =>
                      setPostForm({ ...postForm, postedAt: event.target.value })
                    }
                  />
                </label>
                <div className="admin-form-actions">
                  <button type="submit" className="admin-button primary" disabled={saving}>
                    {saving ? 'Saving…' : 'Save post'}
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminPage
