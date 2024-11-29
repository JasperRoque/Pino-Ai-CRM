import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface SearchResult {
  title: string;
  url: string;
  type: 'doc' | 'blog';
  preview: string;
}

export default function Search(): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  // Debounce search to avoid too many re-renders
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Search function
  const performSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);

      // Get all available content from window.__searchIndex
      // This will be populated at build time
      const searchIndex = (window as any).__searchIndex || [];
      
      const searchResults = searchIndex.filter((item: any) => {
        const searchable = `${item.title} ${item.content}`.toLowerCase();
        return searchable.includes(searchQuery.toLowerCase());
      }).map((item: any) => ({
        title: item.title,
        url: item.url,
        type: item.type,
        preview: item.content.substring(0, 150) + '...',
      }));

      setResults(searchResults);
      setIsSearching(false);
    }, 300),
    []
  );

  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  return (
    <div className="tw-relative">
      <div className="tw-relative">
        <input
          type="search"
          className="tw-w-full tw-px-4 tw-py-2 tw-text-gray-900 tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary-500"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && (
          <div className="tw-absolute tw-right-3 tw-top-2.5">
            <div className="tw-animate-spin tw-h-5 tw-w-5 tw-border-2 tw-border-primary-500 tw-border-t-transparent tw-rounded-full" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="tw-absolute tw-z-10 tw-w-full tw-mt-2 tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-200">
          <ul className="tw-divide-y tw-divide-gray-200">
            {results.map((result, index) => (
              <li key={index}>
                <a
                  href={result.url}
                  className="tw-block tw-px-4 tw-py-3 hover:tw-bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(result.url);
                    setQuery('');
                  }}>
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <span className="tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">
                      {result.type}
                    </span>
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-900">
                      {result.title}
                    </h4>
                  </div>
                  <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
                    {result.preview}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
