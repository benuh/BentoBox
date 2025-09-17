'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TerminalProps {
  className?: string
}

export default function Terminal({ className }: TerminalProps) {
  const [activeTab, setActiveTab] = useState('intro')
  const [skillsInput, setSkillsInput] = useState('')
  const [skillsOutput, setSkillsOutput] = useState('all')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  const [typedContent, setTypedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0)

  const tabs = [
    { id: 'intro', name: 'intro.md', active: true },
    { id: 'skills', name: 'skills.py', active: false },
    { id: 'projects', name: 'projects.html', active: false }
  ]

  const skillsData = {
    languages: [
      "Python", "JavaScript", "TypeScript",
      "C", "C++", "C#", "Java", "Swift",
      "Go", "R", "Verilog"
    ],
    frontend: [
      "React", "Vue.js", "Angular", "Redux",
      "Three.js", "Tailwind CSS", "Vite"
    ],
    backend: [
      "Node.js", "Django", "Flask",
      "SpringBoot", "ASP.NET"
    ],
    databases: [
      "MySQL", "PostgreSQL", "MongoDB"
    ],
    cloud_devops: [
      "AWS", "Google Cloud",
      "Kubernetes", "Docker"
    ],
    ai_ml: [
      "TensorFlow", "PyTorch", "OpenCV"
    ],
    specialized: [
      "Cryptography", "Operational Research",
      "Physical Modeling", "OpenGL",
      "Computer Vision", "Computer Graphics"
    ]
  }

  // Get filtered autocomplete options
  const getAutocompleteOptions = () => {
    const availableKeys = [...Object.keys(skillsData), 'all']
    if (!skillsInput) return availableKeys
    return availableKeys.filter(key =>
      key.toLowerCase().includes(skillsInput.toLowerCase())
    )
  }

  const handleSkillsSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const options = getAutocompleteOptions()

    if (e.key === 'Enter') {
      e.preventDefault()
      let input = skillsInput.toLowerCase().trim()

      // If there are autocomplete options and user hasn't typed a complete match
      if (showAutocomplete && options.length > 0 && selectedOption < options.length) {
        input = options[selectedOption].toLowerCase()
      }

      if (input === '' || input === 'skills' || input === 'all') {
        setSkillsOutput('all')
      } else if (skillsData[input as keyof typeof skillsData]) {
        setSkillsOutput(input)
      } else {
        setSkillsOutput('error')
      }
      setSkillsInput('')
      setShowAutocomplete(false)
      setSelectedOption(0)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (showAutocomplete && selectedOption < options.length - 1) {
        setSelectedOption(selectedOption + 1)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (showAutocomplete && selectedOption > 0) {
        setSelectedOption(selectedOption - 1)
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (showAutocomplete && options.length > 0) {
        setSkillsInput(options[selectedOption])
        setShowAutocomplete(false)
        setSelectedOption(0)
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false)
      setSelectedOption(0)
    }
  }

  // Generate content string for typewriter effect
  const generateSkillsContent = (outputType: string) => {
    if (outputType === 'all') {
      let content = 'skills = {\n'
      Object.entries(skillsData).forEach(([key, values], index) => {
        content += `  "${key}": [\n`
        values.forEach((skill, skillIndex) => {
          content += `    "${skill}"${skillIndex < values.length - 1 ? ',' : ''}\n`
        })
        content += `  ]${index < Object.entries(skillsData).length - 1 ? ',' : ''}\n`
      })
      content += '}\n'
      return content
    } else if (outputType !== 'error' && skillsData[outputType as keyof typeof skillsData]) {
      let content = `skills["${outputType}"] = [\n`
      skillsData[outputType as keyof typeof skillsData].forEach((skill, index) => {
        content += `  "${skill}"${index < skillsData[outputType as keyof typeof skillsData].length - 1 ? ',' : ''}\n`
      })
      content += ']\n'
      return content
    } else if (outputType === 'error') {
      return `KeyError: Invalid key. Available keys: ${Object.keys(skillsData).join(', ')}\n`
    }
    return ''
  }

  // Typewriter effect
  useEffect(() => {
    if (activeTab === 'skills') {
      const content = generateSkillsContent(skillsOutput)
      setIsTyping(true)
      setCurrentTypingIndex(0)
      setTypedContent('')

      const typeInterval = setInterval(() => {
        setCurrentTypingIndex((prevIndex) => {
          if (prevIndex >= content.length) {
            setIsTyping(false)
            clearInterval(typeInterval)
            return prevIndex
          }
          setTypedContent(content.slice(0, prevIndex + 1))
          return prevIndex + 1
        })
      }, 1) // Adjust speed here (lower = faster)

      return () => clearInterval(typeInterval)
    }
  }, [skillsOutput, activeTab])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSkillsInput(value)

    const options = getAutocompleteOptions()
    setShowAutocomplete(value.length > 0 && options.length > 0)
    setSelectedOption(0)
  }

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: 'rgb(156, 163, 175)'
        }}>
          benjamin@portfolio:~
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-gray-800 border-b border-gray-700 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm border-r border-gray-700 transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-750'
            }`}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Terminal Content */}
      <div className="p-6 min-h-[500px]">
        {activeTab === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgb(248, 250, 252)'
            }}>
              <div className="text-green-400 mb-4">
                $ cat intro.md
              </div>

              <div className="space-y-4">
                <div className="text-cyan-300 text-lg font-medium">
                  # Hello! Welcome to my World 👋
                </div>

                <div className="text-gray-300">
                  <div className="mb-3">
                    <span className="text-yellow-400">const</span>{' '}
                    <span className="text-blue-400">philosophy</span> = {'{'}
                  </div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <span className="text-green-400">build:</span>{' '}
                      <span className="text-orange-300">"thoughtful solutions"</span>,
                    </div>
                    <div>
                      <span className="text-green-400">create:</span>{' '}
                      <span className="text-orange-300">"with intention and care"</span>,
                    </div>
                    <div>
                      <span className="text-green-400">think:</span>{' '}
                      <span className="text-orange-300">"from angles and dimensions"</span>
                    </div>
                  </div>
                  <div className="mt-3">{'}'}</div>
                </div>

                <div className="text-gray-400 mt-6">
                  <div className="mb-2">
                    <span className="text-purple-400">//</span> Always learning, always building
                  </div>
                  <div>
                    <span className="text-purple-400">//</span> Let's create something amazing together
                  </div>
                </div>

                <div className="mt-6 text-green-400">
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              color: 'rgb(248, 250, 252)'
            }}
          >
            <div className="text-green-400 mb-4">
              $ python3 skills.py
            </div>

            <div className="space-y-4">
              <div className="text-gray-400">
                <div className="text-green-300"># Interactive Python Shell</div>
                <div className="text-green-300"># Try: skills["languages"] or type a key name</div>
              </div>

              <div className="mb-4 relative">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">&gt;&gt;&gt; skills[</span>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleInputChange}
                    onKeyDown={handleSkillsSubmit}
                    className="bg-transparent text-orange-300 outline-none flex-1"
                    placeholder="key_name # type 'all' for all skills"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  />
                  <span className="text-green-400">]</span>
                </div>

                {/* Autocomplete Dropdown */}
                {showAutocomplete && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                    {getAutocompleteOptions().map((option, index) => (
                      <div
                        key={option}
                        className={`px-3 py-2 cursor-pointer transition-colors ${
                          index === selectedOption
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '12px'
                        }}
                        onClick={() => {
                          setSkillsInput(option)
                          setShowAutocomplete(false)
                          setSelectedOption(0)
                        }}
                      >
                        <span className="text-cyan-400">"{option}"</span>
                        {option === 'all' && (
                          <span className="text-gray-500 ml-2"># show all skills</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Typewriter Output */}
              <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {typedContent.split('\n').map((line, index) => {
                  // Determine line type and apply appropriate styling
                  let styledLine = line

                  if (line.includes('skills') && line.includes('=')) {
                    // Main skills declaration
                    styledLine = line.replace('skills', '<span class="text-purple-400">skills</span>')
                  } else if (line.includes('":') && !line.includes('skills')) {
                    // Key-value pairs - find the key between quotes
                    const keyMatch = line.match(/"([^"]+)":/)
                    if (keyMatch) {
                      styledLine = line.replace(`"${keyMatch[1]}"`, `<span class="text-cyan-400">"${keyMatch[1]}"</span>`)
                    }
                  } else if (line.includes('"') && !line.includes(':') && !line.includes('skills') && !line.includes('KeyError')) {
                    // Skill items
                    styledLine = `<span class="text-orange-300">${line}</span>`
                  } else if (line.includes('KeyError') || line.includes('Available keys')) {
                    // Error messages
                    styledLine = `<span class="text-red-400">${line}</span>`
                  }

                  return (
                    <div key={index} className="min-h-[1.2em]">
                      <span dangerouslySetInnerHTML={{ __html: styledLine || '&nbsp;' }} />
                    </div>
                  )
                })}
                {isTyping && (
                  <span className="text-green-400 animate-pulse">▊</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              color: 'rgb(248, 250, 252)'
            }}
          >
            <div className="text-green-400 mb-4">
              $ open projects.html
            </div>
            <div className="text-gray-300">
              Loading project portfolio...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}