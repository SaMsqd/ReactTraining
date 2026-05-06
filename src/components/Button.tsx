import React from 'react';

interface ButtonProps {
  id?: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({ text, onClick, className, id }: ButtonProps) {
  return (
    <button
      id={id}
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
