import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  resetSearch: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, resetSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
        <SearchX size={32} className="text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No prompts found</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
        We couldn't find any prompts matching "{searchQuery}". Try adjusting your search term or clear the filter.
      </p>
      <button
        onClick={resetSearch}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-200 active:scale-95 transform"
      >
        Clear Search
      </button>
    </div>
  );
};

export default EmptyState;