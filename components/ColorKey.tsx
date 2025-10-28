import React from 'react';
import { POS_COLORS, POS_BACKGROUND_COLORS, POS_DESCRIPTIONS } from '../constants';
import { type PosTag } from '../types';

export const ColorKey: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Color Legend</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {(Object.keys(POS_COLORS) as PosTag[]).map((pos) => (
          <div key={pos} className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded font-bold text-xs w-28 text-center flex-shrink-0 ${POS_COLORS[pos]} ${POS_BACKGROUND_COLORS[pos]}`}
            >
              {pos}
            </span>
            <span className="text-sm text-gray-600">{POS_DESCRIPTIONS[pos]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};