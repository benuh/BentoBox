'use client'

import Home from '../components/Home'
import MobileHome from '../components/MobileHome'
import SocialIcons from '../components/SocialIcons'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function Page() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(250, 248, 246)' }}>
        {isMobile ? <MobileHome /> : <Home />}
        <SocialIcons />
      </div>
    </>
  )
}