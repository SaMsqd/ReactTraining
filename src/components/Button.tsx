import React from 'react';

interface ButtonProps {
  id?: string;
  text: string;
  onclick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  additionalStyle?: React.CSSProperties;
}

export function Button({ text, onclick, className, id, additionalStyle }: ButtonProps) {
  return (
    <button
      style={additionalStyle}
      id={id}
      className={className}
      onClick={onclick}
    >
      {text}
    </button>
  );
}
