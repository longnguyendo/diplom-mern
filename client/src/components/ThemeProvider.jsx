import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="dark">
      <div className='min-h-screen text-gray-700 bg-white dark:text-gray-200 dark:bg-black'>
        {children}
      </div>
    </div>
  );
}