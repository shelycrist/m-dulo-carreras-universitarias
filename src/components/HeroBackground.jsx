import { useId } from 'react'

export function HeroBackground(props) {
  let id = useId()

  return (
    <div className="w-full h-[668px]"
      style={{
        backgroundImage: `url(/images/background.svg)`,
      }}
    ></ div>
  )
}
