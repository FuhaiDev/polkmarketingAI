import React, { useState } from 'react';
import { Prompt, PromptCategory } from '../types';
import { Copy, Check, Share2 } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  categories: PromptCategory[];
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, categories }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  
  const category = categories.find(cat => cat.id === prompt.category);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: prompt.title,
        text: prompt.content,
      });
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      console.error('Failed to share: ', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{prompt.title}</h3>
        
        <div className="flex items-center mb-3">
          <span 
            className={`px-2 py-1 text-xs font-medium rounded-full ${category?.color} text-white`}
          >
            {category?.name}
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4">
          {prompt.content}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {prompt.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <div 
        className={`p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 
                   flex justify-end gap-2 ${copied ? 'bg-green-50 dark:bg-green-900/20' : ''} transition-colors duration-200`}
      >
        <button
          onClick={handleShare}
          className={`px-4 py-2 rounded-md text-sm font-medium 
            bg-gray-500 hover:bg-gray-600 text-white
            transition-all duration-200 
            flex items-center gap-2
            active:scale-95 transform`}
        >
          <Share2 size={16} />
          Donate
        </button>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-medium 
            ${copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            } 
            transition-all duration-200 
            flex items-center gap-2
            active:scale-95 transform`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;