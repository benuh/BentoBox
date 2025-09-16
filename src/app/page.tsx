'use client'

import Home from '../components/Home'
import SocialIcons from '../components/SocialIcons'

export default function Page() {
  return (
    <>

      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(250, 248, 246)' }}>
        <Home />
        <SocialIcons />
      </div>
    </>
  )
}