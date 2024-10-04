import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ARExperience: React.FC = () => {
  const [markerImage, setMarkerImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (keep your existing submit logic here)
  };

  return (
    <div className="content ar-experience">
      <h1>Create AR Experience</h1>
      <form onSubmit={handleSubmit} className="ar-form">
        <div className="form-group">
          <label htmlFor="markerImage">Marker Image:</label>
          <input
            type="file"
            id="markerImage"
            accept="image/*"
            onChange={(e) => setMarkerImage(e.target.files?.[0] || null)}
            required
            aria-required="true"
            aria-describedby="markerImageDescription"
          />
          <p id="markerImageDescription" className="sr-only">Upload an image to use as the AR marker</p>
        </div>
        <div className="form-group">
          <label htmlFor="targetImage">Target Image:</label>
          <input
            type="file"
            id="targetImage"
            accept="image/*"
            onChange={(e) => setTargetImage(e.target.files?.[0] || null)}
            required
            aria-required="true"
            aria-describedby="targetImageDescription"
          />
          <p id="targetImageDescription" className="sr-only">Upload an image to display in the AR experience</p>
        </div>
        <div className="form-group">
          <label htmlFor="scale">Scale:</label>
          <input
            type="number"
            id="scale"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            step="0.1"
            min="0.1"
            max="5"
            required
            aria-required="true"
            aria-valuemin={0.1}
            aria-valuemax={5}
            aria-valuenow={scale}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rotation">Rotation:</label>
          <input
            type="number"
            id="rotation"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            step="1"
            min="0"
            max="360"
            required
            aria-required="true"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={rotation}
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          aria-label="Generate AR Experience"
        >
          Generate AR Experience
        </button>
      </form>
      {generatedUrl && (
        <div className="generated-url" aria-live="polite">
          <h2>Generated AR Experience URL:</h2>
          <a 
            href={generatedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Open generated AR experience in new tab"
          >
            {generatedUrl}
          </a>
          <button 
            onClick={() => navigate(generatedUrl)} 
            className="view-btn"
            aria-label="View AR Experience in current tab"
          >
            View AR Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ARExperience;