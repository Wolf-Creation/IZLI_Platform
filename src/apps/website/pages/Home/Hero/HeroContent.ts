import bg001 from '../../../../assets/Website_img/bg_001.png'
import bg002 from '../../../../assets/Website_img/bg_002.png'
import modelFrontView from '../../../../assets/Website_img/model_front_view.png'
import modelBackView from '../../../../assets/Website_img/model_back_view.png'

export type HeroSceneId = 0 | 1

export interface HeroScene {
  id: HeroSceneId
  tag: string
  title: string
  description: string
  image: string
  focus: string
  modelImage: string
  modelAlt: string
}

export const HERO_SCENES: HeroScene[] = [
  {
    id: 0,
    tag: 'Ksar de l\'Atlas',
    title: 'Wear Your Memory',
    description: 'Inspired by Amazigh heritage, crafted for today. Every piece carries the spirit of the Atlas.',
    image: bg001,
    focus: 'center top',
    modelImage: modelFrontView,
    modelAlt: 'Front view model wearing the heritage t-shirt',
  },
  {
    id: 1,
    tag: 'Désert maghrébin',
    title: 'Carry the legacy',
    description: 'Own a limited release, unlock exclusive experiences and become part of the IZLI legacy.',
    image: bg002,
    focus: 'center bottom',
    modelImage: modelBackView,
    modelAlt: 'Back view model wearing the heritage t-shirt',
  },
]

export const HERO_TIMINGS = {
  sceneDuration: 8000,
  transitionDuration: 2000,
  modelFadeDuration: 600,
} as const