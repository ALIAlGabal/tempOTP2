import React, { useState } from 'react';
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Option {
  id: string;
  name: string;
  color?: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  maxDisplay?: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  className = "",
  maxDisplay = 2
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter(option => value.includes(option.id));

  const toggleOption = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter(id => id !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length <= maxDisplay) {
      return selectedOptions.map(opt => opt.name).join(', ');
    }
    return `${selectedOptions.slice(0, maxDisplay).map(opt => opt.name).join(', ')} +${selectedOptions.length - maxDisplay} more`;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
      >
        <span className={selectedOptions.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
          {getDisplayText()}
        </span>
        <div className="flex items-center space-x-1">
          {selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="h-3 w-3 text-gray-400" />
            </button>
          )}
          <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option) => {
              const isSelected = value.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {option.color && (
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    <span className="text-sm text-gray-900">{option.name}</span>
                  </div>
                  {isSelected && (
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MultiSelect;