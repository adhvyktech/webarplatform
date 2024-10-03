import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ARExperience {
  id: string;
  marker_url: string;
  content_url: string;
  scale: number;
  rotation: number;
}

const ARView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [arData, setArData] = useState<ARExperience | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchARExperience = async () => {
      try {
        const response = await fetch(`/.netlify/functions/get-experience?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AR experience');
        }
        const data = await response.json();
        console.log('Fetched AR experience:', data);
        setArData(data);
      } catch (error) {
        console.error('Error fetching AR experience:', error);
        setError('Failed to load AR experience. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchARExperience();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading AR experience...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!arData) {
    return <div className="text-center mt-8">AR experience not found.</div>;
  }

  return (
    <div className="ar-view" style={{ height: '100vh', width: '100vw' }}>
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