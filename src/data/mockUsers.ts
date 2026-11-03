import daanVisser from '../Pages/Sandbox/Insta/assets/daan-visser.png'
import emmaDeVries from '../Pages/Sandbox/Insta/assets/emma-de-vries.png'
import finnDeBoer from '../Pages/Sandbox/Insta/assets/finn-de-boer.png'
import liamJansen from '../Pages/Sandbox/Insta/assets/liam-jansen.png'
import milaVanDijk from '../Pages/Sandbox/Insta/assets/mila-van-dijk.png'
import noahBakker from '../Pages/Sandbox/Insta/assets/noah-bakker.png'
import oliviaSmit from '../Pages/Sandbox/Insta/assets/olivia-smit.png'
import sofiaNovak from '../Pages/Sandbox/Insta/assets/sofia-novak.png'
import sofiaVale from '../Pages/Sandbox/Insta/assets/sofia-vale.png'
import tessWillems from '../Pages/Sandbox/Insta/assets/tess-willems.png'
import yaraElAmrani from '../Pages/Sandbox/Insta/assets/yara-el-amrani.png'

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
    avatar: sofiaVale,
  },
  {
    id: 2,
    name: 'Sofia Novak',
    username: 'sofianovak',
    bio: 'Coffee first ☕',
    followers: 863,
    avatar: sofiaNovak,
  },
  {
    id: 3,
    name: 'Liam Jansen',
    username: 'liamj',
    bio: 'Football & fitness',
    followers: 2310,
    avatar: liamJansen,
  },
  {
    id: 4,
    name: 'Emma de Vries',
    username: 'emma.devries',
    bio: 'Art student 🎨',
    followers: 5421,
    avatar: emmaDeVries,
  },
  {
    id: 5,
    name: 'Noah Bakker',
    username: 'noahbkr',
    bio: 'Gaming 🎮',
    followers: 312,
    avatar: noahBakker,
  },
  {
    id: 6,
    name: 'Olivia Smit',
    username: 'oliviasmit',
    bio: 'Music & concerts 🎶',
    followers: 19087,
    verified: true,
    avatar: oliviaSmit,
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
    avatar: milaVanDijk,
  },
  {
    id: 9,
    name: 'Daan Visser',
    username: 'daanvisser',
    bio: 'Coder by day, gamer by night',
    followers: 954,
    avatar: daanVisser,
  },
  {
    id: 10,
    name: 'Yara El Amrani',
    username: 'yara.ea',
    bio: 'Fashion & design ✂️',
    followers: 15230,
    verified: true,
    avatar: yaraElAmrani,
  },
  {
    id: 11,
    name: 'Finn de Boer',
    username: 'finndb',
    bio: 'Cycling 🚴',
    followers: 421,
    avatar: finnDeBoer,
  },
  {
    id: 12,
    name: 'Tess Willems',
    username: 'tessw',
    bio: 'Dog mom 🐶',
    followers: 2087,
    avatar: tessWillems,
  },
]
