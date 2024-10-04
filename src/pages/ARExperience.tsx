import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MarkerUpload from '../components/MarkerUpload';
import OutputUpload from '../components/OutputUpload';
import PreviewSection from '../components/PreviewSection';
import TargetTracking from '../components/TargetTracking';
import GenerateARExperience from '../components/GenerateARExperience';
import '../styles/components.css';

const ARExperience: React.FC = () => {
  const [markerImage, setMarkerImage] = useState<File | null>(null);
  const [outputImage, setOutputImage] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMarkerUpload = (file: File) => {
    setMarkerImage(file);
  };

  const handleOutputUpload = (file: File) => {
    setOutputImage(file);
  };

  const handleScaleChange = (value: number) => {
    setScale(value);
  };

  const handleRotationChange = (value: number) => {
    setRotation(value);
  };

  const handleGenerateExperience = async () => {
    console.log('Generating AR Experience');
    setTimeout(() => {
      const mockGeneratedUrl = `/view/${Date.now()}`;
      setGeneratedUrl(mockGeneratedUrl);
    }, 2000);
  };

  return (
    <div className="ar-experience-container">
      <Header />
      <main className="ar-experience-content">
        <h1>Create AR Experience</h1>
        <MarkerUpload onUpload={handleMarkerUpload} />
        <OutputUpload onUpload={handleOutputUpload} />
        <TargetTracking
          scale={scale}
          rotation={rotation}
          onScaleChange={handleScaleChange}
          onRotationChange={handleRotationChange}
        />
        <PreviewSection
          markerImage={markerImage}
          outputImage={outputImage}
          scale={scale}
          rotation={rotation}
        />
        <GenerateARExperience onGenerate={handleGenerateExperience} />
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
      </main>
      <Footer />
    </div>
  );
};

export default ARExperience;