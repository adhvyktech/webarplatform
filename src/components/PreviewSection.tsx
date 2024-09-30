import React from 'react';

interface PreviewSectionProps {
  markerUrl: string;
  contentUrl: string;
  scale: number;
  rotation: number;
  onScaleChange: (scale: number) => void;
  onRotationChange: (rotation: number) => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  markerUrl,
  contentUrl,
  scale,
  rotation,
  onScaleChange,
  onRotationChange,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">AR Preview</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="border-2 border-gray-300 rounded-lg p-4 h-96 flex items-center justify-center relative">
            <img src={markerUrl} alt="Marker" className="max-h-full max-w-full object-contain" />
            <img
              src={contentUrl}
              alt="AR Content"
              className="absolute max-h-full max-w-full object-contain"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Adjust Content</h3>
            <div className="mb-4">
              <label htmlFor="scale" className="block text-sm font-medium text-gray-700">
                Scale
              </label>
              <input
                type="range"
                id="scale"
                min="0.1"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rotation" className="block text-sm font-medium text-gray-700">
                Rotation
              </label>
              <input
                type="range"
                id="rotation"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => onRotationChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;