import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage: string;
  overlayOpacity?: string;
  height?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  bgImage,
  overlayOpacity = 'bg-black/60',
  height = 'h-[40vh]',
}) => {
  return (
    <div
      className={`relative ${height} bg-cover bg-center flex items-center justify-center overflow-hidden`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;