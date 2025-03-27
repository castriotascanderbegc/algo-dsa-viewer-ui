import React, { useState, useEffect } from 'react';
import { RiCheckLine, RiAlertLine, RiInformationLine, RiCloseLine } from 'react-icons/ri';
import './Toast.css';

const VARIANTS = {
  success: {
    icon: RiCheckLine,
    bgClass: 'bg-success-50 dark:bg-success-900/20',
    borderClass: 'border-success-500/20',
    textClass: 'text-success-700 dark:text-success-300',
    iconClass: 'text-success-500'
  },
  error: {
    icon: RiAlertLine,
    bgClass: 'bg-danger-50 dark:bg-danger-900/20',
    borderClass: 'border-danger-500/20',
    textClass: 'text-danger-700 dark:text-danger-300',
    iconClass: 'text-danger-500'
  },
  info: {
    icon: RiInformationLine,
    bgClass: 'bg-primary-50 dark:bg-primary-900/20',
    borderClass: 'border-primary-500/20',
    textClass: 'text-primary-700 dark:text-primary-300',
    iconClass: 'text-primary-500'
  }
};

export const Toast = ({ message, variant = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const variantConfig = VARIANTS[variant] || VARIANTS.info;
  const IconComponent = variantConfig.icon;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div 
      className={`
        toast-content
        rounded-lg shadow-xl border-2 p-4
        transform transition-all duration-300 
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
        ${variantConfig.bgClass} 
        ${variantConfig.borderClass}
      `}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${variantConfig.iconClass} mr-3 mt-0.5`}>
          <IconComponent className="text-2xl" />
        </div>
        <div className={`${variantConfig.textClass} flex-1 font-medium text-base`}>
          <p>{message}</p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 -mt-1 -mr-1 p-1.5 rounded-lg hover:bg-black/10 transition-colors"
          aria-label="Dismiss"
        >
          <RiCloseLine className={`${variantConfig.textClass} text-2xl`} />
        </button>
      </div>
    </div>
  );
};

// Toast manager component for handling multiple toasts
export const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div id="toast-container" className="p-4 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div key={toast.id} className="toast-item" style={{ marginTop: index > 0 ? '0.5rem' : 0 }}>
          <Toast
            message={toast.message}
            variant={toast.variant}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 