import React, { useEffect, useState } from 'react';
import { listPosts, createPost, updatePost, deletePost } from './adminApi';
import { slugify } from './slugify';

const BLANK = {
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  body: '',
  seoTitle: '',
  seoDescription: '',
  published: false,
};

function PostForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial || BLANK);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleTitleChange(value) {
    set('title', value);
    if (!slugTouched) set('slug', slugify(value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (initial?.id) {
        await updatePost(initial.id, form);
      } else {
        await createPost(form);
      }
      onSaved();
    } catch (err) {
      setError(err.message || 'Could not save the post.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form admin-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="p-title">Title</label>
        <input
          id="p-title"
          required
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="p-slug">URL slug</label>
        <input
          id="p-slug"
          required
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set('slug', slugify(e.target.value));
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="p-category">Category</label>
        <input id="p-category" value={form.category} onChange={(e) => set('category', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="p-excerpt">Short excerpt (shown on the blog list)</label>
        <textarea id="p-excerpt" required value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="p-body">Article body (leave a blank line between paragraphs)</label>
        <textarea
          id="p-body"
          rows={10}
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="p-seo-title">SEO title (optional, defaults to the title above)</label>
        <input id="p-seo-title" value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="p-seo-desc">SEO description (optional, defaults to the excerpt)</label>
        <textarea id="p-seo-desc" value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} />
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => set('published', e.target.checked)}
        />
        Published (visible on the live site)
      </label>

      <div className="btn-row">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save post'}
        </button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && (
        <p className="form__status" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default function AdminPosts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | post object

  async function refresh() {
    try {
      setPosts(await listPosts());
    } catch (err) {
      setError(err.message || 'Could not load posts.');
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDelete(post) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await deletePost(post.id);
    refresh();
  }

  if (editing) {
    return (
      <PostForm
        initial={editing === 'new' ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <div>
      <div className="admin__toolbar">
        <button className="btn btn--primary" type="button" onClick={() => setEditing('new')}>
          New post
        </button>
      </div>

      {error && <p className="form__status" role="alert">{error}</p>}
      {posts === null && !error && <p>Loading…</p>}
      {posts && posts.length === 0 && <p>No blog posts yet — add the first one.</p>}

      <ul className="admin-list">
        {posts?.map((p) => (
          <li key={p.id} className="admin-list__row">
            <div>
              <strong>{p.title}</strong>
              <span className={`admin-status admin-status--${p.published ? 'live' : 'draft'}`}>
                {p.published ? 'Published' : 'Draft'}
              </span>
              <p className="admin-list__meta">/blog/{p.slug}/</p>
            </div>
            <div className="btn-row" style={{ marginTop: 0 }}>
              <button className="btn btn--outline btn--small" type="button" onClick={() => setEditing(p)}>
                Edit
              </button>
              <button className="btn btn--outline btn--small" type="button" onClick={() => handleDelete(p)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
