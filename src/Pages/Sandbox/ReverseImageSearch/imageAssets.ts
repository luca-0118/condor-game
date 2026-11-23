const imageAssets: Record<string, string> = {
  ...import.meta.glob<string>('./assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob<string>('../Webshop/assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
  ...import.meta.glob<string>('../Insta/assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
  }),
}

export function getImageSearchAsset(path: string): string {
  const imageUrl = imageAssets[path]
  if (!imageUrl) {
    throw new Error(`Image search asset "${path}" could not be found.`)
  }

  return imageUrl
}
