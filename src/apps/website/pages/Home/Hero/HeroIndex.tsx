interface Props {
  activeSceneIndex: 0 | 1
}

export default function HeroIndex({ activeSceneIndex }: Props) {
  return (
    <div className="hero-index" aria-hidden="true">
      <div className={`hero-index__number ${activeSceneIndex === 0 ? 'is-active' : ''}`}>01</div>
      <div className="hero-index__line" />
      <div className={`hero-index__number ${activeSceneIndex === 1 ? 'is-active' : ''}`}>02</div>
    </div>
  )
}