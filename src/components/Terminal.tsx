'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { themes } from '../utils/theme'

interface TerminalProps {
  className?: string
  style?: React.CSSProperties
}

export default function Terminal({ className, style }: TerminalProps) {
  const { theme } = useTheme()
  const currentTheme = themes[theme]
  const [activeTab, setActiveTab] = useState('intro')
  const [skillsInput, setSkillsInput] = useState('')
  const [skillsOutput, setSkillsOutput] = useState('all')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  const [typedContent, setTypedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const tabs = [
    { id: 'intro', name: 'intro.md', active: true },
    { id: 'skills', name: 'skills.py', active: false },
    { id: 'projects', name: 'projects.html', active: false }
  ]

  const skillsData = useMemo(() => ({
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
      "Full Stack", "Cryptography", "Operational Research",
      "Physical Modeling", "OpenGL",
      "Computer Vision", "Computer Graphics"
    ]
  }), [])

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
  const generateSkillsContent = useCallback((outputType: string) => {
    if (outputType === 'all') {
      let content = 'skills = {\n'
      Object.entries(skillsData).forEach(([key, values], index) => {
        // More compact format - all skills on one line per category
        const skillsStr = values.map(skill => `"${skill}"`).join(', ')
        content += `  "${key}": [${skillsStr}]${index < Object.entries(skillsData).length - 1 ? ',' : ''}\n`
      })
      content += '}\n'
      return content
    } else if (outputType !== 'error' && skillsData[outputType as keyof typeof skillsData]) {
      const skills = skillsData[outputType as keyof typeof skillsData]
      const skillsStr = skills.map(skill => `"${skill}"`).join(', ')
      const content = `skills["${outputType}"] = [${skillsStr}]\n`
      return content
    } else if (outputType === 'error') {
      return `KeyError: Invalid key. Available keys: ${Object.keys(skillsData).join(', ')}\n`
    }
    return ''
  }, [skillsData])

  // Typewriter effect
  useEffect(() => {
    if (activeTab === 'skills') {
      const content = generateSkillsContent(skillsOutput)
      setIsTyping(true)
      setTypedContent('')

      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex >= content.length) {
          setIsTyping(false)
          clearInterval(typeInterval)
          return
        }
        setTypedContent(content.slice(0, currentIndex + 1))
        currentIndex += 1
      }, 1) // Adjust speed here (lower = faster)

      return () => clearInterval(typeInterval)
    }
  }, [skillsOutput, activeTab, generateSkillsContent])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSkillsInput(value)

    const options = getAutocompleteOptions()
    setShowAutocomplete(value.length > 0 && options.length > 0)
    setSelectedOption(0)
  }

  return (
    <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'shadow-2xl' : 'shadow-sm'} ${className}`}
         style={{ backgroundColor: currentTheme.terminalBg, border: `1px solid ${currentTheme.terminalBorder}`, ...style }}>
      {/* Terminal Header */}
      <div className="px-4 py-3 flex items-center justify-between"
           style={{ backgroundColor: currentTheme.terminalHeader, borderBottom: `1px solid ${currentTheme.terminalBorder}` }}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.red }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.yellow }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.green }}></div>
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: currentTheme.textMuted
        }}>
          benjamin@portfolio:~
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex" style={{ backgroundColor: currentTheme.terminalHeader, borderBottom: `1px solid ${currentTheme.terminalBorder}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm transition-colors"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              backgroundColor: activeTab === tab.id ? currentTheme.terminalTabActive : currentTheme.terminalTab,
              color: activeTab === tab.id ? currentTheme.textPrimary : currentTheme.textMuted,
              borderRight: `1px solid ${currentTheme.terminalBorder}`,
              borderBottom: activeTab === tab.id ? `2px solid ${currentTheme.textPrimary}` : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.textSecondary
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.textMuted
              }
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-[500px] overflow-y-auto">
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
              color: currentTheme.textPrimary
            }}>
              <div className="mb-4" style={{ color: currentTheme.command }}>
                $ cat intro.md
              </div>

              <div className="space-y-4">
                <div className="text-lg font-medium" style={{ color: currentTheme.variable }}>
                  # Hello! Welcome to my World 👋
                </div>

                <div style={{ color: currentTheme.textSecondary }}>
                  <div className="mb-3">
                    <span style={{ color: currentTheme.keyword }}>const</span>{' '}
                    <span style={{ color: currentTheme.variable }}>philosophy</span> = {'{'}
                  </div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <span style={{ color: currentTheme.command }}>build:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;thoughtful solutions&quot;</span>,
                    </div>
                    <div>
                      <span style={{ color: currentTheme.command }}>create:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;with intention and care&quot;</span>,
                    </div>
                    <div>
                      <span style={{ color: currentTheme.command }}>think:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;from angles and dimensions&quot;</span>
                    </div>
                  </div>
                  <div className="mt-3">{'}'}</div>
                </div>

                <div className="mt-6" style={{ color: currentTheme.textMuted }}>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.comment }}>{'//'}</span> Always learning, always building
                  </div>
                  <div>
                    <span style={{ color: currentTheme.comment }}>{'//'}</span> Let&apos;s create something amazing together
                  </div>
                </div>

                <div className="mt-6" style={{ color: currentTheme.cursor }}>
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
              color: currentTheme.textPrimary
            }}
          >
            <div className="text-green-400 mb-4">
              $ python3 skills.py
            </div>

            <div className="space-y-4">
              <div className="text-gray-400">
                <div className="text-green-300"># Interactive Python Shell</div>
                <div className="text-green-300"># Try: skills[&quot;languages&quot;] or type a key name</div>
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
                        <span className="text-cyan-400">&quot;{option}&quot;</span>
                        {option === 'all' && (
                          <span className="text-gray-500 ml-2"># show all skills</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Typewriter Output */}
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed" style={{ color: currentTheme.textSecondary }}>
                {typedContent.split('\n').map((line, index) => {
                  // Determine line type and apply appropriate styling
                  let styledLine = line

                  if (line.includes('skills') && line.includes('=')) {
                    // Main skills declaration
                    styledLine = line.replace(/^(\s*)skills/, `$1<span style="color: ${currentTheme.variable}; font-weight: 600;">skills</span>`)
                  } else if (line.includes('":') && line.includes('[') && !line.includes('skills')) {
                    // Compact format: "key": [values] on one line
                    // First highlight the key with a distinct color
                    styledLine = line.replace(/"([^"]+)":\s*\[/, `<span style="color: ${currentTheme.variable}; font-weight: 600;">"$1"</span><span style="color: ${currentTheme.textSecondary};">:</span> <span style="color: ${currentTheme.textSecondary};">[</span>`)
                    // Then highlight all the skill values with alternating colors for better readability
                    styledLine = styledLine.replace(/\[([^\]]+)\]/, (match: string, content: string) => {
                      const skills = content.split(',').map((skill: string) => skill.trim())
                      const highlightedSkills = skills.map((skill: string, index: number) => {
                        // Alternate between string color and a slightly different shade for better readability
                        const color = index % 2 === 0 ? currentTheme.string : currentTheme.keyword
                        return skill.replace(/"([^"]+)"/, `<span style="color: ${color}; font-weight: 500;">"$1"</span>`)
                      })
                      return `${highlightedSkills.join('<span style="color: ' + currentTheme.textSecondary + ';">, </span>')}<span style="color: ${currentTheme.textSecondary};">]</span>`
                    })
                  } else if (line.includes('[') && line.includes(']') && line.includes('"') && !line.includes('KeyError') && !line.includes(':')) {
                    // Single line skill arrays (for individual category queries)
                    // Highlight the skills["key"] part first
                    styledLine = line.replace(/skills\["([^"]+)"\]/, `<span style="color: ${currentTheme.variable}; font-weight: 600;">skills</span><span style="color: ${currentTheme.textSecondary};">[</span><span style="color: ${currentTheme.command}; font-weight: 500;">"$1"</span><span style="color: ${currentTheme.textSecondary};">]</span>`)
                    // Then highlight the array content with alternating colors
                    styledLine = styledLine.replace(/=\s*\[([^\]]+)\]/, (match: string, content: string) => {
                      const skills = content.split(',').map((skill: string) => skill.trim())
                      const highlightedSkills = skills.map((skill: string, index: number) => {
                        const color = index % 2 === 0 ? currentTheme.string : currentTheme.keyword
                        return skill.replace(/"([^"]+)"/, `<span style="color: ${color}; font-weight: 500;">"$1"</span>`)
                      })
                      return ` <span style="color: ${currentTheme.textSecondary};">=</span> <span style="color: ${currentTheme.textSecondary};">[</span>${highlightedSkills.join('<span style="color: ' + currentTheme.textSecondary + ';">, </span>')}<span style="color: ${currentTheme.textSecondary};">]</span>`
                    })
                  } else if (line.includes('KeyError') || line.includes('Available keys')) {
                    // Error messages
                    styledLine = `<span style="color: ${currentTheme.error};">${line}</span>`
                  }

                  return (
                    <div key={index} className="min-h-[1.2em]">
                      <span dangerouslySetInnerHTML={{ __html: styledLine || '&nbsp;' }} />
                    </div>
                  )
                })}
                {isTyping && (
                  <span style={{ color: currentTheme.cursor }} className="animate-pulse">▊</span>
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
              color: currentTheme.textPrimary
            }}
          >
            <div className="mb-4" style={{ color: currentTheme.command }}>
              $ open projects.html
            </div>

            <div className="space-y-6">
              {/* Project 1: MiniGPT */}
              <div className="border-l-2 pl-4" style={{ borderColor: currentTheme.cursor }}>
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      MiniGPT
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Active Development
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/MiniGPT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/MiniGPT
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Educational Transformer implementation designed for hands-on learning and experimentation.
                    Provides accessible, modular architecture for understanding attention mechanisms, model scaling, and training dynamics.
                    Features interactive training pipelines with W&B monitoring, enabling learners to experiment with hyperparameters
                    and observe real-time model behavior. Full-stack deployment demonstrates end-to-end ML system development.
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textMuted, fontSize: '11px', fontStyle: 'italic' }}>
                    📚 Detailed architecture documentation and implementation guides available in{' '}
                    <span style={{ color: currentTheme.string, fontFamily: '"JetBrains Mono", monospace' }}>/core</span> directory
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'minigpt' ? null : 'minigpt')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'minigpt' ? '▼' : '▶'}</span>
                    {expandedProject === 'minigpt' ? 'Hide Details' : 'Show Architecture Details'}
                  </button>

                  {expandedProject === 'minigpt' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🏗️ Core Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Multi-head attention</span> with causal masking</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Learned position embeddings</span> for sequence understanding</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>GELU activation</span> functions with layer normalization</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Modular transformer blocks</span> (~87K parameters, 4 layers)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔄 Training Pipeline
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>AdamW optimizer</span> with linear warmup scheduling</li>
                            <li>• <span style={{ color: currentTheme.string }}>Automatic checkpointing</span> and validation tracking</li>
                            <li>• <span style={{ color: currentTheme.string }}>Cross-entropy loss</span> for next-token prediction</li>
                            <li>• <span style={{ color: currentTheme.string }}>Real-time monitoring</span> with Weights & Biases integration</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🚀 Deployment Stack
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>React frontend</span> with interactive parameter controls</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>REST API server</span> for model inference</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Docker containerization</span> with Kubernetes orchestration</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>YAML-based configuration</span> management</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎯 Key Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Temperature & top-k sampling</span> for controlled generation</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Configurable context window</span> management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Device-agnostic deployment</span> (GPU/MPS/CPU)</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Interactive chat interface</span> with real-time inference</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      PyTorch
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Transformers
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      React
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      REST API
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Docker
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      W&B
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Kubernetes
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      YAML
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 2: Unicorn-Explosion */}
              <div className="border-l-2 pl-4" style={{ borderColor: currentTheme.string }}>
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      Unicorn-Explosion
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.keyword,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      🎮 Complete
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/Unicorn-Explosion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/Unicorn-Explosion
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Computer Engineering project featuring a complete arcade game system designed from scratch in Verilog HDL.
                    Demonstrates microcontroller programming principles with custom hardware modules for audio synthesis,
                    VGA graphics rendering, and real-time user interaction. Built on Nexys 4 DDR FPGA to showcase
                    low-level digital system design and embedded hardware architecture.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'unicorn' ? null : 'unicorn')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'unicorn' ? '▼' : '▶'}</span>
                    {expandedProject === 'unicorn' ? 'Hide Technical Details' : 'Show FPGA Architecture'}
                  </button>

                  {expandedProject === 'unicorn' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔧 Computer Engineering Design
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Microcontroller principles</span> applied to FPGA architecture</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Hardware-software co-design</span> methodology</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Digital system integration</span> across multiple subsystems</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Real-time embedded processing</span> constraints and optimization</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🏗️ Verilog Engine Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Audio Engine</span> - Custom sound synthesis and playback</li>
                            <li>• <span style={{ color: currentTheme.string }}>Display Engine</span> - Real-time graphics rendering and scanning</li>
                            <li>• <span style={{ color: currentTheme.string }}>Physics Engine</span> - Collision detection and game mechanics</li>
                            <li>• <span style={{ color: currentTheme.string }}>Map Generator</span> - Dynamic level creation and management</li>
                            <li>• <span style={{ color: currentTheme.string }}>Score Engine</span> - Game state tracking and scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎮 Game Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive gameplay</span> with responsive controls</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Digital audio output</span> with custom sound effects</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Real-time graphics</span> on VGA display interface</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Addictive arcade mechanics</span> with scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            💻 Microcontroller & Digital Systems
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Low-level hardware programming</span> in Verilog HDL</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Finite state machine design</span> for embedded control logic</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Clock domain crossing</span> and timing constraint management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Memory-mapped I/O</span> and peripheral interface design</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Interrupt handling</span> and real-time response systems</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Computer Engineering
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Microcontroller
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Verilog HDL
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      FPGA
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Digital Systems
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Embedded Hardware
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6" style={{ color: currentTheme.textMuted }}>
                <div className="mb-2">
                  <span style={{ color: currentTheme.comment }}>{'//'}</span> More projects coming soon...
                </div>
              </div>

              <div className="mt-6" style={{ color: currentTheme.cursor }}>
                <span className="animate-pulse">▊</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}