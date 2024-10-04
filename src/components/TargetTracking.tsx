import React from 'react';

interface TargetTrackingProps {
  scale: number;
  rotation: number;
  onScaleChange: (value: number) => void;
  onRotationChange: (value: number) => void;
}

const TargetTracking: React.FC<TargetTrackingProps> = ({
  scale,
  rotation,
  onScaleChange,
  onRotationChange,
}) => {
  return (
    <div className="target-tracking">
      <h2>Target Tracking</h2>
      <div className="tracking-controls">
        <div className="control-group">
          <label htmlFor="scale">Scale:</label>
          <input
            type="range"
            id="scale"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
          />
          <span>{scale.toFixed(1)}</span>
        </div>
        <div className="control-group">
          <label htmlFor="rotation">Rotation:</label>
          <input
            type="range"
            id="rotation"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={(e) => onRotationChange(parseInt(e.target.value, 10))}
          />
          <span>{rotation}°</span>
        </div>
      </div>
    </div>
  );
};

export default TargetTracking;