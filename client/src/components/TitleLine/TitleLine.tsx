import React from 'react';
export const TitleLine: React.FC<any> = ({ width = 400 }) => {
  return (
    <div key="line" className="title-line-wrapper" style={{ maxWidth: width }}>
      <div className="title-line" style={{ transform: 'translateX(-64px)' }} />
    </div>
  );
};
