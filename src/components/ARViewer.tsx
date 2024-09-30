import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'ar.js/aframe/build/aframe-ar';

interface ARViewerProps {
  markerUrl: string;
  contentUrl: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ markerUrl, contentUrl }) => {
  const sceneRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.addEventListener('loaded', () => {
        console.log('A-Frame scene has loaded');
        const aframeScene = sceneRef.current as any;
        const arToolkitContext = aframeScene.systems['arjs']?.arToolkitContext;
        if (arToolkitContext) {
          console.log('AR.js context found');
          if (arToolkitContext.arController && typeof arToolkitContext.arController.addEventListener === 'function') {
            arToolkitContext.arController.addEventListener('getMarker', (event: any) => {
              console.log('Marker detected:', event);
            });
          } else {
            console.error('AR controller or addEventListener not available');
          }
        } else {
          console.error('AR.js context not found');
        }
      });
    }
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      vr-mode-ui="enabled: false"
    >
      <a-marker type="pattern" url={markerUrl}>
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model={contentUrl}
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARViewer;