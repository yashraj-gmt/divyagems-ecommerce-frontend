import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="section container-app text-center">
      <h2 className="text-primary font-bold text-4xl">404</h2>
      <p className="text-text-secondary mt-4">Page Not Found</p>
      <Link to="/" className="btn-primary mt-6 inline-block">Go Home</Link>
    </div>
  );
}

export default NotFound;
