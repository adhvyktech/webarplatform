import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ARExperienceData {
  marker_url: string;
  content_url: string;
  scale: number;
  rotation: number;
}

const ARView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [arData, setArData] = useState<ARExperienceData | null>(null);

  useEffect(() => {
    const fetchARExperience = async () => {
      try {
        const response = await fetch(`/api/get-experience?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AR experience');
        }
        const data = await response.json();
        setArData(data);
      } catch (error) {
        console.error('Error fetching AR experience:', error);
      }
    };

    fetchARExperience();
  }, [id]);

  if (!arData) {
    return <div>Loading AR experience...</div>;
  }

  return (
    <div className="ar-view">
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker type="pattern" url={arData.marker_url}>
          <a-entity
            position="0 0 0"
            scale={`${arData.scale} ${arData.scale} ${arData.scale}`}
            rotation={`0 0 ${arData.rotation}`}
          >
            <a-image src={arData.content_url}></a-image>
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARView;