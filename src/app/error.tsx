'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-red-900/30 border border-red-700/50">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Something went wrong!
          </h1>

          <p className="text-gray-300 mb-8">
            We encountered an unexpected error. Please try again or return to the home page.
          </p>

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Try again
            </button>

            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {error.digest && (
            <p className="mt-6 text-xs text-gray-500">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
