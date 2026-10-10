import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF6EE] text-[#2A1B18] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-royal text-2xl font-bold text-[#3D0A14] mb-3">
            Auspicious Invitation
          </h2>
          <p className="font-serif text-stone-700 max-w-md mb-6">
            Please tap below to refresh and load the celebration.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-[#3D0A14] text-[#FAF6EE] font-royal font-semibold tracking-wider shadow-lg"
          >
            Reload Invitation
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
