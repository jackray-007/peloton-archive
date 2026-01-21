'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-light text-black mb-4 tracking-tight">
              Something went wrong
            </h2>
            <p className="text-sm text-black/50 font-light mb-8">
              We encountered an error. Please try again or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-black text-white hover:bg-black/90 font-light text-sm tracking-wider uppercase transition-all"
              >
                Reload Page
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-black/20 text-black hover:border-black/40 font-light text-sm tracking-wider uppercase transition-all"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

