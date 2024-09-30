import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Web AR Platform</h1>
          <p className="text-xl mb-8">Create immersive AR experiences with AR.js</p>
          <Link
            to="/ar-experience"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Get Started
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Upload Marker</h3>
              <p>Choose an image to serve as your AR marker.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Add Content</h3>
              <p>Upload the content you want to display in AR.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. View in AR</h3>
              <p>Use your device's camera to see your AR creation.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;