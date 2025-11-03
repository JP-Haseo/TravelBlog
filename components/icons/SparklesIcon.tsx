
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 2.5a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V3.25A.75.75 0 0110 2.5zM7.5 5.66a.75.75 0 00-1.06 1.06l.92.92a.75.75 0 001.06-1.06l-.92-.92zM12.5 5.66a.75.75 0 011.06 1.06l-.92.92a.75.75 0 01-1.06-1.06l.92-.92zM10 8a2 2 0 100 4 2 2 0 000-4zM2.5 10a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5H3.25A.75.75 0 012.5 10zM15 9.25a.75.75 0 00.75.75h1.25a.75.75 0 000-1.5H15.75a.75.75 0 00-.75.75zM7.5 14.34a.75.75 0 011.06-1.06l.92.92a.75.75 0 11-1.06 1.06l-.92-.92zM12.5 14.34a.75.75 0 00-1.06-1.06l-.92.92a.75.75 0 001.06 1.06l.92-.92zM10 17.5a.75.75 0 00-.75-.75v-1.25a.75.75 0 001.5 0V16.75A.75.75 0 0010 17.5z"
      clipRule="evenodd"
    />
  </svg>
);

export default SparklesIcon;
