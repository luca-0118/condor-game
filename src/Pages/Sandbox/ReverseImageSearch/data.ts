import { getImageSearchAsset } from './imageAssets'

export type ImageSearchKind = 'product' | 'person' | 'place' | 'post' | 'other'

export type ImageSearchRecord = {
  id: string
  title: string
  source: string
  image: string
  href: string
  kind: ImageSearchKind
}

export type ImageSearchEntry = Omit<ImageSearchRecord, 'image'> & {
  imageUrl: string
}

const records = [
  { id: 'lumi-ring', title: 'Lumi ring gestapeld', source: 'Mona Jewelry', image: '../Webshop/assets/ring-goud.webp', href: '/sandbox/monajewelry/product/lumi-ring', kind: 'product' },
  { id: 'nora-creolen', title: 'Nora creolen goudkleurig', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-hoops.webp', href: '/sandbox/monajewelry/product/nora-creolen', kind: 'product' },
  { id: 'golf-oorbellen', title: 'Golf oorbellen', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-golf.webp', href: '/sandbox/monajewelry/product/golf-oorbellen', kind: 'product' },
  { id: 'ava-hangers', title: 'Ava oorhangers met zirkonia', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-pave.webp', href: '/sandbox/monajewelry/product/ava-hangers', kind: 'product' },
  { id: 'pearl-ketting', title: 'Pearl ketting met hanger', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-schaal.webp', href: '/sandbox/monajewelry/product/pearl-ketting', kind: 'product' },
  { id: 'steen-ringen', title: 'Steen ringen set van drie', source: 'Mona Jewelry', image: '../Webshop/assets/ring-steen.webp', href: '/sandbox/monajewelry/product/steen-ringen', kind: 'product' },
  { id: 'wikkel-armband', title: 'Wikkel armband leer', source: 'Mona Jewelry', image: '../Webshop/assets/armband-stapel.webp', href: '/sandbox/monajewelry/product/wikkel-armband', kind: 'product' },
  { id: 'bloem-oorbellen', title: 'Bloem oorbellen', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-bloem.webp', href: '/sandbox/monajewelry/product/bloem-oorbellen', kind: 'product' },
  { id: 'ovaal-oorbellen', title: 'Ovaal oorbellen', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-ovaal.webp', href: '/sandbox/monajewelry/product/ovaal-oorbellen', kind: 'product' },
  { id: 'pave-oorbellen', title: 'Pavé schakel oorbellen', source: 'Mona Jewelry', image: '../Webshop/assets/oorbel-pave2.webp', href: '/sandbox/monajewelry/product/pave-oorbellen', kind: 'product' },
  { id: 'schakel-set', title: 'Schakelarmband set', source: 'Mona Jewelry', image: '../Webshop/assets/armband-set.webp', href: '/sandbox/monajewelry/product/schakel-set', kind: 'product' },
  { id: 'schakel-doos', title: 'Grove schakelarmband', source: 'Mona Jewelry', image: '../Webshop/assets/armband-doos.webp', href: '/sandbox/monajewelry/product/schakel-doos', kind: 'product' },
  { id: 'duo-armband', title: 'Duo armband fijn', source: 'Mona Jewelry', image: '../Webshop/assets/armband-pols.webp', href: '/sandbox/monajewelry/product/duo-armband', kind: 'product' },
  { id: 'klaver-armband', title: 'Klaver armband', source: 'Mona Jewelry', image: '../Webshop/assets/armband-wit.webp', href: '/sandbox/monajewelry/product/klaver-armband', kind: 'product' },
  { id: 'solitair-ring', title: 'Solitair ring', source: 'Mona Jewelry', image: '../Webshop/assets/ring-diamant.webp', href: '/sandbox/monajewelry/product/solitair-ring', kind: 'product' },
  { id: 'infinity-ring', title: 'Infinity ring', source: 'Mona Jewelry', image: '../Webshop/assets/cat-ring.webp', href: '/sandbox/monajewelry/product/infinity-ring', kind: 'product' },
  { id: 'lina-ketting', title: 'Lina ketting met muntje', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-1.webp', href: '/sandbox/monajewelry/product/lina-ketting', kind: 'product' },
  { id: 'layer-ketting', title: 'Layer ketting drielaags', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-2.webp', href: '/sandbox/monajewelry/product/layer-ketting', kind: 'product' },
  { id: 'platte-ketting', title: 'Platte schakelketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-3.webp', href: '/sandbox/monajewelry/product/platte-ketting', kind: 'product' },
  { id: 'madelief-ketting', title: 'Madelief ketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-4.webp', href: '/sandbox/monajewelry/product/madelief-ketting', kind: 'product' },
  { id: 'hart-ketting', title: 'Twee harten ketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-5.webp', href: '/sandbox/monajewelry/product/hart-ketting', kind: 'product' },
  { id: 'gourmet-ketting', title: 'Gourmet ketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-6.webp', href: '/sandbox/monajewelry/product/gourmet-ketting', kind: 'product' },
  { id: 'cuban-ketting', title: 'Cuban ketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-7.webp', href: '/sandbox/monajewelry/product/cuban-ketting', kind: 'product' },
  { id: 'hartje-ketting', title: 'Open hartje ketting', source: 'Mona Jewelry', image: '../Webshop/assets/ketting-8.webp', href: '/sandbox/monajewelry/product/hartje-ketting', kind: 'product' },
  { id: 'lagen-armband', title: 'Lagen armband', source: 'Mona Jewelry', image: '../Webshop/assets/armband-groen.webp', href: '/sandbox/monajewelry/product/lagen-armband', kind: 'product' },
  { id: 'duo-set', title: 'Duo set met klaver', source: 'Mona Jewelry', image: '../Webshop/assets/armband-armen.webp', href: '/sandbox/monajewelry/product/duo-set', kind: 'product' },
  { id: 'trio-armband', title: 'Trio armband goud', source: 'Mona Jewelry', image: '../Webshop/assets/armband-goud.webp', href: '/sandbox/monajewelry/product/trio-armband', kind: 'product' },
  { id: 'fijne-armband', title: 'Fijne armband met bedel', source: 'Mona Jewelry', image: '../Webshop/assets/armband-fijn.webp', href: '/sandbox/monajewelry/product/fijne-armband', kind: 'product' },
  { id: 'mix-armband', title: 'Mix armbanden set', source: 'Mona Jewelry', image: '../Webshop/assets/armband-mix.webp', href: '/sandbox/monajewelry/product/mix-armband', kind: 'product' },
  { id: 'instagram-sofia-vale', title: 'Sofia Vale (@sofia.vale)', source: 'Instagram · @sofia.vale', image: '../Insta/assets/sofia-vale.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-sofia-novak', title: 'Sofia Novak (@sofianovak)', source: 'Instagram · @sofianovak', image: '../Insta/assets/sofia-novak.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-liam-jansen', title: 'Liam Jansen (@liamj)', source: 'Instagram · @liamj', image: '../Insta/assets/liam-jansen.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-emma-de-vries', title: 'Emma de Vries (@emma.devries)', source: 'Instagram · @emma.devries', image: '../Insta/assets/emma-de-vries.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-noah-bakker', title: 'Noah Bakker (@noahbkr)', source: 'Instagram · @noahbkr', image: '../Insta/assets/noah-bakker.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-olivia-smit', title: 'Olivia Smit (@oliviasmit)', source: 'Instagram · @oliviasmit', image: '../Insta/assets/olivia-smit.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-mila-van-dijk', title: 'Mila van Dijk (@milavdijk)', source: 'Instagram · @milavdijk', image: '../Insta/assets/mila-van-dijk.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-daan-visser', title: 'Daan Visser (@daanvisser)', source: 'Instagram · @daanvisser', image: '../Insta/assets/daan-visser.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-yara-el-amrani', title: 'Yara El Amrani (@yara.ea)', source: 'Instagram · @yara.ea', image: '../Insta/assets/yara-el-amrani.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-finn-de-boer', title: 'Finn de Boer (@finndb)', source: 'Instagram · @finndb', image: '../Insta/assets/finn-de-boer.png', href: '/sandbox/instagram', kind: 'person' },
  { id: 'instagram-tess-willems', title: 'Tess Willems (@tessw)', source: 'Instagram · @tessw', image: '../Insta/assets/tess-willems.png', href: '/sandbox/instagram', kind: 'person' },
] satisfies ImageSearchRecord[]

export const imageSearchEntries: ImageSearchEntry[] = records.map(({ image, ...record }) => ({
  ...record,
  imageUrl: getImageSearchAsset(image),
}))
