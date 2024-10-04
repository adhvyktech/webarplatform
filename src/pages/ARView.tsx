import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

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

  useEffect(() => {
    const fetchARExperience = async () => {
      try {
        const response = await fetch(`/.netlify/functions/get-experience?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AR experience');
        }
        const data = await response.json();
        setArData(data);
      } catch (error) {
        console.error('Error fetching AR experience:', error);
        setError('Failed to load AR experience. Please try again.');
      }
    };

    fetchARExperience();
  }, [id]);

  const initAR = useCallback(() => {
    if (!arData) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: document.body },
    });
    document.body.appendChild(arButton);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(arData.content_url);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(arData.scale, arData.scale, 1);
    plane.rotation.z = THREE.MathUtils.degToRad(arData.rotation);
    scene.add(plane);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(renderer.domElement);
      document.body.removeChild(arButton);
    };
  }, [arData]);

  useEffect(() => {
    if (arData) {
      initAR();
    }
  }, [arData, initAR]);

  // Add this function to handle the actions
  const handleAction = (actionNumber: number) => {
    console.log(`Action ${actionNumber} clicked`);
    // Add your action logic here
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!arData) {
    return <div className="loading-message">Loading AR experience...</div>;
  }

  return (
    <div className="ar-view">
      <div className="ar-instructions">
        Point your camera at a flat surface and tap to place the AR content.
      </div>
      {/* Add this inside the return statement of ARView.tsx */}
      <div className="ar-actions">
        <button onClick={() => handleAction(1)}>Action 1</button>
        <button onClick={() => handleAction(2)}>Action 2</button>
      </div>
    </div>
  );
};

export default ARView;