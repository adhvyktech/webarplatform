import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ARExperienceData {
  id: string;
  markerUrl: string;
  contentUrl: string;
  scale: number;
  rotation: number;
}

const ARView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [arData, setArData] = useState<ARExperienceData | null>(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const storedData = localStorage.getItem(`arExperience_${id}`);
    if (storedData) {
      setArData(JSON.parse(storedData));
    }
  }, [id]);

  if (!arData) {
    return <div>Loading AR experience...</div>;
  }

  return (
    <div className="ar-view">
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker type="pattern" url={arData.markerUrl}>
          <a-entity
            position="0 0 0"
            scale={`${arData.scale} ${arData.scale} ${arData.scale}`}
            rotation={`0 0 ${arData.rotation}`}
          >
            <a-image src={arData.contentUrl}></a-image>
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARView;