# Reverse image search catalog

The search uses its own catalog in `data.ts`; it does not read the webshop's
product data. Each record describes an image and the sandbox page where its
result should lead.

To add an image:

1. Put the image in `assets/` (supported formats: JPG, JPEG, PNG, and WEBP).
2. Add a record to the `records` list in `data.ts`:

```ts
{
  id: 'mila-profile',
  title: 'Mila van Dijk',
  source: 'Instagram',
  image: './assets/mila-profile.webp',
  href: '/sandbox/instagram',
  kind: 'person',
}
```

Use a unique `id`, an `image` path relative to this folder, and an `href` for
the sandbox page the result should open. `kind` is descriptive metadata; use
`product`, `person`, `place`, `post`, or `other`. The initial jewelry entries reuse existing image files from `Webshop/assets/`,
and the Instagram people entries reuse profile pictures from `Insta/assets/`;
images are not duplicated.

The image matcher automatically compares every record in the catalog. It
creates small visual fingerprints in the browser and ranks catalog entries by
similarity. It does not search the internet or use filenames to match images.
