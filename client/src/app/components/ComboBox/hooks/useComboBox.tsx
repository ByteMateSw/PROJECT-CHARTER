import { useState, useEffect } from 'react';

export const useComboBox = ({ selectedOptions, setSelectedOptions }: { selectedOptions: unknown, setSelectedOptions: any }) => {

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (selectedOptions: unknown) => {
    setSelectedOptions(selectedOptions);
  };

  return { selectedOptions, isClient, handleChange };
};