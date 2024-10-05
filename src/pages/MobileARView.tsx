import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Declare AR.js types
declare global {
  interface Window {
    THREEx: {
      ArToolkitSource: new (params: any) => any;
      ArToolkitContext: new (params: any) => any;
    };
  }
}

const MobileARView: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arData, setArData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch AR experience data
      fetch(`/api/arExperience/${id}`)
        .then(response => response.json())
        .then(data => setArData(data))
        .catch(error => console.error('Error fetching AR data:', error));
    }
  }, [id]);

  useEffect(() => {
    if (arData && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set up video stream
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          video.srcObject = stream;
          video.play();
        })
        .catch(error => console.error('Error accessing camera:', error));

      // Set up AR.js
      const arToolkitSource = new window.THREEx.ArToolkitSource({ sourceType: 'webcam' });
      const arToolkitContext = new window.THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono',
      });

      arToolkitSource.init(() => {
        arToolkitContext.init(() => {
          // camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
          // Note: You'll need to set up a Three.js scene and camera here
        });
      });

      // Render loop
      const render = () => {
        requestAnimationFrame(render);
        if (arToolkitSource.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
          context?.clearRect(0, 0, canvas.width, canvas.height);
          // Render AR content here using arData
          if (context && arData) {
            const img = new Image();
            img.onload = () => {
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = arData.contentUrl;
          }
        }
      };
      render();
    }
  }, [arData]);

  return (
    <div className="mobile-ar-view">
      <Head>
        <title>Mobile AR View</title>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Head>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="ar-canvas" style={{ width: '100%', height: '100vh' }} />
      {!arData && <p>Loading AR experience...</p>}
    </div>
  );
};

export default MobileARView;