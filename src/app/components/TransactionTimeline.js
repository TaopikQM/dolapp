import React from 'react';

const TransactionTimeline = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Langkah 1 */}
      <div className="flex flex-col items-center relative">
        <div className={`flex justify-center items-center h-12 w-12 rounded-full border-4 ${currentStep >= 0 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-black'}`}>
          1
        </div>
        <p className={`${currentStep === 0 ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>{steps[0]}</p>
      </div>

      {/* Garis horizontal antara langkah 1 dan 2 */}
      <div className={`flex-1 h-0.5 ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

      {/* Langkah 2 */}
      <div className="flex flex-col items-center relative">
        <div className={`flex justify-center items-center h-12 w-12 rounded-full border-4 ${currentStep >= 1 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-black'}`}>
          2
        </div>
        <p className={`${currentStep === 1 ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>{steps[1]}</p>
      </div>

      {/* Garis horizontal antara langkah 2 dan 3 */}
      <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

      {/* Langkah 3 */}
      <div className="flex flex-col items-center relative">
        <div className={`flex justify-center items-center h-12 w-12 rounded-full border-4 ${currentStep >= 2 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-black'}`}>
          3
        </div>
        <p className={`${currentStep === 2 ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>{steps[2]}</p>
      </div>
    </div>
  );
};

export default TransactionTimeline;
