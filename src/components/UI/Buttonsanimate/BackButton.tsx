import React from 'react';

interface ButtonProps {
  label: string;
  color?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const BackButton: React.FC<ButtonProps> = ({
  label,
  color = 'bg-green-400',
  onClick,
  icon
}) => {
  return (
    <button
      className="bg-white text-center w-28 rounded-lg h-8 relative text-black text-sm font-semibold group"
      type="button"
      onClick={onClick}
    >
      <div
        className={`${color} rounded-md h-7 w-1/4 flex items-center justify-center absolute left-1 top-[2px] group-hover:w-[105px] z-10 duration-500`}
      >
        {icon ? (
          icon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="14px"
            width="14px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            />
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            />
          </svg>
        )}
      </div>
      <p className="translate-x-1">{label}</p>
    </button>
  );
};

export default BackButton;
