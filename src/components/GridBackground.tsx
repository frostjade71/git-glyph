import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 grid-background-pattern opacity-60 dark:opacity-20" />
    </div>
  );
};

export default GridBackground;
