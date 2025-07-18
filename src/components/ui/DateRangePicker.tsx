import React, { useState } from 'react';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date range",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { label: 'Today', getValue: () => {
      const today = new Date().toISOString().split('T')[0];
      return { start: today, end: today };
    }},
    { label: 'Yesterday', getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const date = yesterday.toISOString().split('T')[0];
      return { start: date, end: date };
    }},
    { label: 'Last 7 days', getValue: () => {
      const end = new Date().toISOString().split('T')[0];
      const start = new Date();
      start.setDate(start.getDate() - 7);
      return { start: start.toISOString().split('T')[0], end };
    }},
    { label: 'Last 30 days', getValue: () => {
      const end = new Date().toISOString().split('T')[0];
      const start = new Date();
      start.setDate(start.getDate() - 30);
      return { start: start.toISOString().split('T')[0], end };
    }},
    { label: 'This month', getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const end = new Date().toISOString().split('T')[0];
      return { start, end };
    }}
  ];

  const formatDateRange = (range: DateRange) => {
    if (!range.start && !range.end) return placeholder;
    if (range.start === range.end) return range.start;
    return `${range.start} - ${range.end}`;
  };

  const clearRange = () => {
    onChange({ start: '', end: '' });
  };

  const hasValue = value.start || value.end;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          <span className={hasValue ? 'text-gray-900' : 'text-gray-500'}>
            {formatDateRange(value)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {hasValue && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearRange();
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="h-3 w-3 text-gray-400" />
            </button>
          )}
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={value.start}
                  onChange={(e) => onChange({ ...value, start: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={value.end}
                  onChange={(e) => onChange({ ...value, end: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <p className="text-xs font-medium text-gray-700 mb-2">Quick Select</p>
              <div className="grid grid-cols-2 gap-1">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      onChange(preset.getValue());
                      setIsOpen(false);
                    }}
                    className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
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

export default DateRangePicker;