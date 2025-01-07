import { useAlertStore } from '@/shared/model/alertStore.ts';

const Alert = () => {
  const { message, type, isVisible } = useAlertStore();

  const alertClassName = [
    'alert',
    'fixed right-24 top-24 w-fit h-fit opacity-70',
    isVisible ? '' : 'hidden',
    type === 'info' ? 'alert-info' : '',
    type === 'success' ? 'alert-success' : '',
    type === 'warning' ? 'alert-warning' : '',
    type === 'error' ? 'alert-error' : '',
  ].join(' ');

  return (
    <div role="alert" className={alertClassName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span className="text-sm text-gray-900">{message}</span>
    </div>
  );
};

export default Alert;