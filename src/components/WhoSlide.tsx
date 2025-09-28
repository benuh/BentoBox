'use client'

export default function WhoSlide() {
  return (
    <div className="w-full h-full relative p-12">
      {/* Title - Top Left */}
      <div>
        <h1 style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 900,
          color: '#1a1a1a',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          Hi, this is Benjamin
        </h1>
      </div>

      {/* Rectangle Space - Center Gap */}
      <div
        className="absolute left-12 right-12 overflow-hidden"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: '200px',
          backgroundColor: '#ffffff',
          borderRadius: '8px'
        }}
      >
        {/* Pixelated City View */}
        <div
          className="relative w-full h-full"
          style={{
            background: '#ffffff'
          }}
        >
          {/* Sliding city buildings */}
          <div
            className="absolute bottom-0 flex items-end"
            style={{
              animation: 'citySlide 20s linear infinite',
              height: '100%',
              width: '200%'
            }}
          >
            {/* Building blocks - abstract shapes */}
            {[...Array(100)].map((_, i) => {
              const buildingWidth = Math.random() * 80 + 15;
              const buildingHeight = Math.random() * 95 + 20;
              const buildingColor = ['#000000', '#0d1117', '#1a1a1a', '#262626', '#333333', '#404040', '#4d4d4d', '#595959', '#666666'][Math.floor(Math.random() * 9)];
              const marginRight = Math.random() * 20 - 15; // Allow negative margins for overlap
              const windowCount = Math.floor(Math.random() * 16 + 4);
              const buildingType = Math.floor(Math.random() * 10); // More building types
              const zIndex = Math.floor(Math.random() * 10) + 1; // Random depth layering

              const getBuildingShape = () => {
                switch(buildingType) {
                  case 0: // Regular rectangle
                    return {};
                  case 1: // Stepped skyscraper
                    return {
                      clipPath: 'polygon(0 100%, 0 70%, 25% 70%, 25% 50%, 50% 50%, 50% 30%, 75% 30%, 75% 15%, 100% 15%, 100% 100%)'
                    };
                  case 2: // Tower with antenna
                    return {};
                  case 3: // Triangle/pyramid top
                    return {
                      clipPath: 'polygon(0 100%, 0 40%, 50% 0%, 100% 40%, 100% 100%)'
                    };
                  case 4: // Art deco style
                    return {
                      clipPath: 'polygon(0 100%, 0 60%, 20% 50%, 30% 30%, 40% 20%, 60% 20%, 70% 30%, 80% 50%, 100% 60%, 100% 100%)'
                    };
                  case 5: // Dome/rounded top
                    return {
                      clipPath: 'polygon(0 100%, 0 30%, 20% 20%, 30% 10%, 70% 10%, 80% 20%, 100% 30%, 100% 100%)'
                    };
                  case 6: // Modern asymmetric
                    return {
                      clipPath: 'polygon(0 100%, 0 80%, 60% 60%, 80% 40%, 90% 20%, 100% 0%, 100% 100%)'
                    };
                  case 7: // Castle-like
                    return {
                      clipPath: 'polygon(0 100%, 0 40%, 15% 40%, 15% 30%, 25% 30%, 25% 40%, 40% 40%, 40% 25%, 60% 25%, 60% 40%, 75% 40%, 75% 30%, 85% 30%, 85% 40%, 100% 40%, 100% 100%)'
                    };
                  case 8: // L-shaped building
                    return {
                      clipPath: 'polygon(0 100%, 0 50%, 60% 50%, 60% 20%, 100% 20%, 100% 100%)'
                    };
                  case 9: // Complex multi-level
                    return {
                      clipPath: 'polygon(0 100%, 0 85%, 30% 85%, 30% 65%, 50% 65%, 50% 45%, 70% 45%, 70% 25%, 90% 25%, 90% 10%, 100% 10%, 100% 100%)'
                    };
                  default:
                    return {};
                }
              };

              return (
                <div
                  key={i}
                  className="flex-shrink-0 relative"
                  style={{
                    width: `${buildingWidth}px`,
                    height: `${buildingHeight}%`,
                    backgroundColor: buildingColor,
                    marginRight: `${marginRight}px`,
                    boxShadow: 'inset -2px 0 0 rgba(0,0,0,0.5)',
                    imageRendering: 'pixelated',
                    zIndex: zIndex,
                    ...getBuildingShape()
                  }}
                >
                  {/* Antenna for tower buildings */}
                  {buildingType === 2 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '15px',
                        backgroundColor: buildingColor
                      }}
                    />
                  )}

                  {/* Realistic building windows */}
                  <div
                    className="absolute inset-1"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: buildingWidth < 40 ? 'repeat(2, 1fr)' : buildingWidth < 60 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                      gap: '3px',
                      padding: '4px'
                    }}
                  >
                    {[...Array(Math.floor((buildingHeight / 100) * 8))].map((_, floor) => (
                      [...Array(buildingWidth < 40 ? 2 : buildingWidth < 60 ? 3 : 4)].map((_, window) => {
                        const isLit = Math.random() > 0.3;
                        const windowKey = `${floor}-${window}`;

                        return (
                          <div
                            key={windowKey}
                            style={{
                              width: '4px',
                              height: '6px',
                              backgroundColor: isLit ? '#ffffff' : '#404040',
                              border: '1px solid #666666',
                              imageRendering: 'pixelated',
                              opacity: buildingType === 3 && floor < 2 ? 0 : 1 // Hide windows in triangle top area
                            }}
                          />
                        );
                      })
                    )).flat()}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <style jsx>{`
          @keyframes citySlide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      {/* Description - Bottom Right */}
      <div className="absolute bottom-12 right-12 max-w-2xl">
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#333333',
          lineHeight: '1.6',
          margin: 0
        }}>
          I'm a software developer who loves building digital solutions that make a real difference. I work as a full-stack engineer and constantly enjoy learning new technologies to expand my knowledge and skills. My passion lies in creating practical applications that solve real-world problems while exploring the intersection of technology and creativity in every project I work on.
        </p>
      </div>
    </div>
  )
}