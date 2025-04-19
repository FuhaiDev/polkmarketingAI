import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PromptCard from './components/PromptCard';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { prompts, categories } from './data/prompts';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPrompts, setFilteredPrompts] = useState(prompts);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Filter prompts based on search query and selected category
  useEffect(() => {
    let filtered = prompts;
    
    if (selectedCategory) {
      filtered = filtered.filter(prompt => prompt.category === selectedCategory);
    }
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        prompt =>
          prompt.title.toLowerCase().includes(lowerCaseQuery) ||
          prompt.content.toLowerCase().includes(lowerCaseQuery) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    setFilteredPrompts(filtered);
  }, [searchQuery, selectedCategory]);

  const resetSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Marketing Prompt Library
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse and copy professionally crafted marketing prompts for various channels and purposes.
            </p>
          </div>
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} categories={categories} />
              ))}
            </div>
          ) : (
            <EmptyState searchQuery={searchQuery} resetSearch={resetSearch} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;