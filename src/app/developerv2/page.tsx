'use client'

import PageTransition from '../../components/PageTransition'
import SimpleSlideContainer from '../../components/SimpleSlideContainer'
import SlideOne from '../../components/SlideOne'
import SlideTwo from '../../components/SlideTwo'
import SlideThree from '../../components/SlideThree'

export default function DeveloperV2Page() {
  const slides = [SlideOne, SlideTwo, SlideThree]

  return (
    <PageTransition>
      <SimpleSlideContainer slides={slides} />
    </PageTransition>
  )
}