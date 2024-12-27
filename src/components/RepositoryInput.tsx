import React, { useState } from 'react';
import { GitBranch, Lock, Upload } from 'lucide-react';
import type { Repository } from '../types';

interface Props {
  onSubmit: (repo: Repository) => void;
}

export function RepositoryInput({ onSubmit }: Props) {
  const [url, setUrl] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      url,
      name: url.split('/').pop() || '',
      isPrivate,
      accessToken: isPrivate ? accessToken : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Repository URL
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GitBranch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full pl-10 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="private"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="private" className="flex items-center text-sm text-gray-700">
          <Lock className="h-4 w-4 mr-1" />
          Private Repository
        </label>
      </div>

      {isPrivate && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Access Token
          </label>
          <input
            type="password"
            required
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ghp_xxxxxxxxxxxx"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Upload className="h-4 w-4 mr-2" />
          Generate Documentation
        </button>
      </div>
    </form>
  );
}