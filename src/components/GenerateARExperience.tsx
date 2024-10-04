import React from 'react';

interface GenerateARExperienceProps {
  onGenerate: () => void;
}

const GenerateARExperience: React.FC<GenerateARExperienceProps> = ({ onGenerate }) => {
  return (
    <div className="generate-ar-experience">
      <button 
        onClick={onGenerate}
        className="generate-btn"
        aria-label="Generate AR Experience"
      >
        Generate AR Experience
      </button>
    </div>
  );
};

export default GenerateARExperience;