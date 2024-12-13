import React from 'react';

interface StoreButtonProps {
  href: string;
  ariaLabel: string;
  iconUrl: string;
  iconAlt: string;
  storeName: string;
}

const StoreButton: React.FC<StoreButtonProps> = ({
  href,
  ariaLabel,
  iconUrl,
  iconAlt,
  storeName,
}) => (
  <a
    href={href}
    className="inline-flex items-center px-8 py-3 bg-[#1a1b1f] border border-[#1a1b1f] rounded-xl hover:bg-[#2a2b2f] transition-colors"
    role="button"
    aria-label={ariaLabel}
  >
    <div className="flex items-center">
      <img 
        src={iconUrl}
        alt={iconAlt}
        className="h-8 w-8 mr-3"
      />
      <div className="flex flex-col leading-none">
        <span className="text-[0.65rem] text-white opacity-80">Download on</span>
        <span className="text-xl text-white font-medium tracking-wide">{storeName}</span>
      </div>
    </div>
  </a>
);

export default StoreButton;