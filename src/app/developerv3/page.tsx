'use client'

import PageTransition from '../../components/PageTransition'
import GridHero from '../../components/GridHero'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../utils/theme'
import WhoSlide from '../../components/WhoSlide'
import SkillsSlide from '../../components/SkillsSlide'
import ExperienceSlide from '../../components/ExperienceSlide'
import ProjectsSlide from '../../components/ProjectsSlide'

export default function DeveloperV3Page() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <PageTransition>
      <div className="w-full min-h-screen" style={{ backgroundColor: '#000000' }}>
        {/* Developer Grid Home Page - First Slide */}
        <div className="w-full h-screen flex items-center justify-center">
          <div
            className="rounded-lg shadow-xl flex items-center justify-center relative"
            style={{
              width: '90vw',
              height: '90vh',
              border: '1px solid #e5e5e5',
              backgroundColor: '#473f3f'
            }}
          >
            <GridHero />
          </div>
        </div>

        {/* WHO Slide */}
        <div id="who" className="w-full h-screen flex items-center justify-center">
          <div
            className="rounded-lg shadow-xl bg-white flex items-center justify-center"
            style={{
              width: '90vw',
              height: '90vh',
              border: '1px solid #e5e5e5'
            }}
          >
            <WhoSlide />
          </div>
        </div>

        {/* SKILLS Slide */}
        <div id="skills" className="w-full h-screen flex items-center justify-center">
          <div
            className="rounded-lg shadow-xl bg-white flex items-center justify-center"
            style={{
              width: '90vw',
              height: '90vh',
              border: '1px solid #e5e5e5'
            }}
          >
            <SkillsSlide />
          </div>
        </div>

        {/* EXPERIENCE Slide */}
        <div id="experience" className="w-full h-screen flex items-center justify-center">
          <div
            className="rounded-lg shadow-xl bg-white flex items-center justify-center"
            style={{
              width: '90vw',
              height: '90vh',
              border: '1px solid #e5e5e5'
            }}
          >
            <ExperienceSlide />
          </div>
        </div>

        {/* PROJECTS Slide */}
        <div id="projects" className="w-full h-screen flex items-center justify-center">
          <div
            className="rounded-lg shadow-xl bg-white flex items-center justify-center"
            style={{
              width: '90vw',
              height: '90vh',
              border: '1px solid #e5e5e5'
            }}
          >
            <ProjectsSlide />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}