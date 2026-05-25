import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'default' | 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type = 'default', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`
        animate-toast-in px-4 py-3 shadow-lg text-sm font-medium max-w-sm w-full
        ${type === 'success' ? 'bg-black text-white' :
          type === 'error' ? 'bg-red-600 text-white' :
          'bg-white border border-gray-200 text-black'}
      `}
    >
      {message}
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: number; message: string; type?: 'default' | 'success' | 'error' }>;
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-20 inset-x-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto w-full max-w-sm">
          <Toast message={t.message} type={t.type} onClose={() => onDismiss(t.id)} />
        </div>
      ))}
    </div>
  );
}

export interface ToastMessage {
  id: number;
  message: string;
  type?: 'default' | 'success' | 'error';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function show(message: string, type: ToastMessage['type'] = 'default') {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }

  function dismiss(id: number) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return { toasts, show, dismiss };
}
