import { useState, useCallback } from 'react';

const useStepManagement = () => {
  const [step, setStep] = useState({ direction: '', squares: 1 });
  const [resetControlButtons, setResetControlButtons] = useState(false);
  const [resetNumberInput, setResetNumberInput] = useState(false);

  const handleSquares = useCallback((squares) => {
    setStep(prevStep => ({ ...prevStep, squares }));
    setResetNumberInput(false);
  }, []);

  const handleDirection = useCallback((direction) => {
    setStep(prevStep => ({ ...prevStep, direction }));
    setResetControlButtons(false);
    setResetNumberInput(false);
  }, []);

  const resetStep = useCallback(() => {
    setStep({ direction: '', squares: 1 });
  }, []);

  return {
    step,
    resetControlButtons,
    resetNumberInput,
    handleSquares,
    handleDirection,
    resetStep,
    setResetControlButtons,
    setResetNumberInput
  };
};

export default useStepManagement;
