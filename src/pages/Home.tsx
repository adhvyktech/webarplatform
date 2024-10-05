import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-content">
        <h1 className="text-4xl font-bold mb-8">Welcome to Web AR Platform</h1>
        <p className="text-xl mb-8">Create and experience augmented reality on the web.</p>
        <Link href="/ar-experience">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create AR Experience
          </a>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;