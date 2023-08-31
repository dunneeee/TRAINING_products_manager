import { useState } from 'react';

const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggle = () => setIsOpen((prev) => !prev);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
};

export default useToggle;
