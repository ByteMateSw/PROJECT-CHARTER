import { useState, useEffect } from 'react';

export const useComboBox = () => {
  const [selectedOptions, setSelectedOptions] = useState<unknown>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (selectedOptions: unknown) => {
    setSelectedOptions(selectedOptions);
  };

  return { selectedOptions, isClient, handleChange };
};