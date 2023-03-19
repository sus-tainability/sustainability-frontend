import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useCurrentPath = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>('');
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return currentPath;
};

export default useCurrentPath;
