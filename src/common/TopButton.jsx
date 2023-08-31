import React, { useEffect, useState } from 'react';

const TopButton = () => {
  const [topButton, setTopButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleTopButton = () => {
      if (window.scrollY > 100) {
        setTopButton(true);
      } else {
        setTopButton(false);
      }
    };
    window.addEventListener('scroll', handleTopButton);
    return () => {
      window.removeEventListener('scroll', handleTopButton);
    };
  }, []);

  return (
    topButton && (
      <div>
        <button id="top" onClick={scrollToTop} type="button">
          {' '}
          Top
        </button>
      </div>
    )
  );
};

export default TopButton;
