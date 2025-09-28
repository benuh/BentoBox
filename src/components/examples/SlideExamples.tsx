'use client'

import React from 'react'
import FlexibleSlideContainer, { useSlides } from '../FlexibleSlideContainer'

// Example 1: Basic usage with any content
export function BasicSlideExample() {
  return (
    <FlexibleSlideContainer
      config={{
        effect: 'shuffle',
        showIndicators: true,
        enableScroll: true
      }}
    >
      {/* Slide 1 - Simple text */}
      <div className="bg-blue-500 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome!</h1>
        <p className="text-xl mt-4">This is slide 1</p>
      </div>

      {/* Slide 2 - Complex layout */}
      <div className="bg-green-500 text-white p-8 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Features</h2>
            <ul className="mt-4 space-y-2">
              <li>• Unlimited slides</li>
              <li>• Any content</li>
              <li>• Multiple effects</li>
            </ul>
          </div>
          <div className="w-32 h-32 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Slide 3 - Image with text */}
      <div className="bg-purple-500 text-white p-8 rounded-lg">
        <div className="text-center">
          <div className="w-64 h-32 bg-white rounded-lg mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold">Image Placeholder</h3>
          <p className="mt-2">Add any images, videos, or components</p>
        </div>
      </div>

      {/* Slide 4 - Form */}
      <div className="bg-red-500 text-white p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Contact Form</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 rounded text-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 rounded text-black"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 rounded text-black h-20"
          />
          <button className="bg-white text-red-500 px-4 py-2 rounded font-bold">
            Send
          </button>
        </div>
      </div>

      {/* Slide 5 - Data visualization */}
      <div className="bg-yellow-500 text-black p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded text-center">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-sm">Users</div>
          </div>
          <div className="bg-white p-4 rounded text-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm">Projects</div>
          </div>
          <div className="bg-white p-4 rounded text-center">
            <div className="text-3xl font-bold">99%</div>
            <div className="text-sm">Satisfaction</div>
          </div>
          <div className="bg-white p-4 rounded text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
    </FlexibleSlideContainer>
  )
}

// Example 2: Dynamic slide management
export function DynamicSlideExample() {
  const { slides, addSlide, removeSlide, slideCount } = useSlides()

  const createNewSlide = () => {
    const slideNumber = slideCount + 1
    addSlide(
      <div
        className={`bg-gradient-to-br from-blue-400 to-purple-600 text-white p-8 rounded-lg`}
        key={slideNumber}
      >
        <h2 className="text-3xl font-bold">Dynamic Slide {slideNumber}</h2>
        <p className="mt-4">Created at {new Date().toLocaleTimeString()}</p>
        <button
          onClick={() => removeSlide(slideNumber - 1)}
          className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Remove This Slide
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Control Panel */}
      <div className="absolute top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg">
        <button
          onClick={createNewSlide}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Slide ({slideCount})
        </button>
      </div>

      <FlexibleSlideContainer
        config={{
          effect: 'fade',
          showIndicators: true,
          enableScroll: true
        }}
      >
        {/* Default slide if no slides exist */}
        {slideCount === 0 && (
          <div className="bg-gray-500 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold">No Slides Yet</h2>
            <p className="mt-4">Click "Add Slide" to create your first slide!</p>
          </div>
        )}

        {slides}
      </FlexibleSlideContainer>
    </div>
  )
}

// Example 3: Different transition effects
export function EffectDemoExample() {
  const effects = ['shuffle', 'fade', 'slide', 'scale', 'none'] as const
  const [currentEffect, setCurrentEffect] = React.useState<typeof effects[number]>('shuffle')

  return (
    <div className="relative">
      {/* Effect Selector */}
      <div className="absolute top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg">
        <label className="block text-sm font-bold mb-2">Effect:</label>
        <select
          value={currentEffect}
          onChange={(e) => setCurrentEffect(e.target.value as typeof effects[number])}
          className="border rounded p-2"
        >
          {effects.map(effect => (
            <option key={effect} value={effect}>
              {effect.charAt(0).toUpperCase() + effect.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <FlexibleSlideContainer
        config={{
          effect: currentEffect,
          showIndicators: true,
          enableScroll: true,
          scrollSensitivity: 80
        }}
      >
        <div className="bg-red-500 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold">Effect Demo</h1>
          <p className="text-xl mt-4">Current effect: {currentEffect}</p>
        </div>

        <div className="bg-green-500 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold">Second Slide</h1>
          <p className="text-xl mt-4">Scroll or use indicators to navigate</p>
        </div>

        <div className="bg-blue-500 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold">Third Slide</h1>
          <p className="text-xl mt-4">Try different effects from the dropdown</p>
        </div>

        <div className="bg-purple-500 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold">Fourth Slide</h1>
          <p className="text-xl mt-4">Each effect has unique animations</p>
        </div>
      </FlexibleSlideContainer>
    </div>
  )
}