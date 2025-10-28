
import React from 'react';
import { POS_COLORS, POS_DESCRIPTIONS } from '../constants';
import { type PosTag } from '../types';

export const ColorKey: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Color Legend</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {(Object.keys(POS_COLORS) as PosTag[]).map((pos) => (
          <div key={pos} className="flex items-center space-x-2">
            <span className={`w-4 h-4 rounded-full inline-block ${POS_COLORS[pos].replace('text-', 'bg-')}`}></span>
            <span className={`font-medium ${POS_COLORS[pos]}`}>{pos}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
