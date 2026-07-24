'use client';

import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-orange-900/30 border border-orange-700/50">
              <Search className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            404
          </h1>

          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
