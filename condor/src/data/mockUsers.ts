// Mock user data shared by the social-media simulations (Instagram, Facebook, ...).
export type MockUser = {
  id: number
  name: string
  username: string
  bio: string
  followers: number
  verified?: boolean
  // Optional profile picture URL; initials are shown when missing.
  avatar?: string
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: 'Sofia Vale',
    username: 'sofia.vale',
    bio: 'Photographer 📸 | Travel lover',
    followers: 12840,
    verified: true,
    avatar: '/sofia-vale.png',
  },
  {
    id: 2,
    name: 'Sofia Novak',
    username: 'sofianovak',
    bio: 'Coffee first ☕',
    followers: 863,
    avatar: '/sofia-novak.png',
  },
  {
    id: 3,
    name: 'Liam Jansen',
    username: 'liamj',
    bio: 'Football & fitness',
    followers: 2310,
    avatar: '/liam-jansen.png',
  },
  {
    id: 4,
    name: 'Emma de Vries',
    username: 'emma.devries',
    bio: 'Art student 🎨',
    followers: 5421,
    avatar: '/emma-de-vries.png',
  },
  {
    id: 5,
    name: 'Noah Bakker',
    username: 'noahbkr',
    bio: 'Gaming 🎮',
    followers: 312,
    avatar: '/noah-bakker.png',
  },
  {
    id: 6,
    name: 'Olivia Smit',
    username: 'oliviasmit',
    bio: 'Music & concerts 🎶',
    followers: 19087,
    verified: true,
    avatar: '/olivia-smit.png',
  },
  {
    id: 7,
    name: 'Luca Klomp',
    username: 'luca-0118',
    bio: 'Coder by day, gamer by night',
    followers: 180199,
    verified: true,
  },
  {
    id: 8,
    name: 'Mila van Dijk',
    username: 'milavdijk',
    bio: 'Foodie 🍕 recipes every week',
    followers: 7654,
    avatar: '/mila-van-dijk.png',
  },
  {
    id: 9,
    name: 'Daan Visser',
    username: 'daanvisser',
    bio: 'Coder by day, gamer by night',
    followers: 954,
    avatar: '/daan-visser.png',
  },
  {
    id: 10,
    name: 'Yara El Amrani',
    username: 'yara.ea',
    bio: 'Fashion & design ✂️',
    followers: 15230,
    verified: true,
    avatar: '/yara-el-amrani.png',
  },
  {
    id: 11,
    name: 'Finn de Boer',
    username: 'finndb',
    bio: 'Cycling 🚴',
    followers: 421,
    avatar: '/finn-de-boer.png',
  },
  {
    id: 12,
    name: 'Tess Willems',
    username: 'tessw',
    bio: 'Dog mom 🐶',
    followers: 2087,
    avatar: '/tess-willems.png',
  },
]
