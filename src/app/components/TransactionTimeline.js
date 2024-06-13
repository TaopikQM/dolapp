import React from 'react';

const TransactionTimeline = ({ steps, activeStepIndex }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <div className={`w-16 h-0.5 bg-gray-300 ${index <= activeStepIndex ? 'bg-blue-500' : ''}`}></div>
          )}
          <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 ${index === activeStepIndex ? 'bg-blue-500 text-white border-blue-500' : ''}`}>
            {index < activeStepIndex ? <i className="fas fa-check"></i> : index + 1}
          </div>
          <div className={`ml-3 text-sm font-medium ${index === activeStepIndex ? 'text-blue-500' : 'text-gray-400'}`}>
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionTimeline;
