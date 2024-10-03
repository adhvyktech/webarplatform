import React, { useEffect, useState, useCallback } from 'react';
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

  // Move the initializeAR declaration before the useEffect
  const initializeAR = useCallback(() => {
    if (arData) {
      const markerEl = document.querySelector('a-marker');
      const entityEl = document.querySelector('a-entity');

      if (markerEl && entityEl) {
        markerEl.setAttribute('url', arData.marker_url);
        entityEl.setAttribute('scale', `${arData.scale} ${arData.scale} ${arData.scale}`);
        entityEl.setAttribute('rotation', `0 0 ${arData.rotation}`);
        
        const imageEl = entityEl.querySelector('a-image');
        if (imageEl) {
          imageEl.setAttribute('src', arData.content_url);
        }
      }
    }
  }, [arData]);

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

  useEffect(() => {
    if (arData) {
      // Initialize AR.js scene
      const sceneEl = document.querySelector('a-scene');
      if (sceneEl) {
        if (!(sceneEl as any).hasLoaded) {
          sceneEl.addEventListener('loaded', initializeAR);
        } else {
          initializeAR();
        }
      }
    }
  }, [arData, initializeAR]); // Now initializeAR is declared before it's used here

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
    <div className="ar-view" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
        inspector="url: https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js"
      >
        <a-marker type="pattern" preset="custom" url={arData.marker_url}>
          <a-entity
            position="0 0 0"
            scale={`${arData.scale} ${arData.scale} ${arData.scale}`}
            rotation={`0 0 ${arData.rotation}`}
          >
            <a-image src={arData.content_url} title="AR content"></a-image>
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px' }}>
        Point your camera at the marker image to view the AR content
      </div>
    </div>
  );
};

export default ARView;