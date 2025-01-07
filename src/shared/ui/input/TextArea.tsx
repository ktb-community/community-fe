import React, { FC, useEffect, useRef } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className: string;
}

const TextArea: FC<TextAreaProps> = ({ value, onChange, placeholder, className: _className }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const className = [
    'textarea textarea-bordered resize-none overflow-y-hidden dark:bg-dk-default',
    _className
  ].join(' ');

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      const target = textAreaRef.current;
      target.style.height = `auto`;
      target.style.height = `${target.scrollHeight}px`;
    }
  }, [textAreaRef]);

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default TextArea;