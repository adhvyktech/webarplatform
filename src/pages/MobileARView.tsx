import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
      const arToolkitSource = new ARToolkitSource({ sourceType: 'webcam' });
      const arToolkitContext = new ARToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono',
      });

      arToolkitSource.init(() => {
        arToolkitContext.init(() => {
          camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });
      });

      // Render loop
      const render = () => {
        requestAnimationFrame(render);
        if (arToolkitSource.ready) {
          arToolkitContext.update(arToolkitSource.domElement);
          context?.clearRect(0, 0, canvas.width, canvas.height);
          // Render AR content here using arData
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
      <canvas ref={canvasRef} className="ar-canvas" />
      {arData ? (
        <div className="ar-content">
          {/* Render AR content based on arData */}
          <img src={arData.contentUrl} alt="AR Content" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${arData.scale}) rotate(${arData.rotation}deg)`,
          }} />
        </div>
      ) : (
        <p>Loading AR experience...</p>
      )}
    </div>
  );
};

export default MobileARView;