import { useState, useEffect } from 'react';

export const useIsValidName = (initialName = '') => {
  const [name, setName] = useState(initialName);
  const [isValidName, setIsValidName] = useState(false);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    validateName(name);
  }, [name]);

  useEffect(() => {
    if (initialName) {
      validateName(initialName);
    }
  }, [initialName]);

  const validateName = (value) => {
    setIsValidName(false);
    setNameError('');

    if (!value || value.trim() === '') {
      setNameError('');
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      setNameError('Name should contain only letters and spaces');
      return;
    }

    if (value.trim().length < 2) {
      setNameError('Name should be at least 2 characters');
      return;
    }

    setIsValidName(true);
  };

  return {
    name,
    setName,
    isValidName,
    nameError,
    validateName
  };
};