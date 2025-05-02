import React, { createContext, useContext, useState } from 'react';

type SliderContextType = {
  mainLightValue: number;
  floorLampValue: number;
  setMainLightValue: (value: number) => void;
  setFloorLampValue: (value: number) => void;
};

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainLightValue, setMainLightValue] = useState(0.0); // default value
  const [floorLampValue, setFloorLampValue] = useState(0.0);

  return (
    <SliderContext.Provider
      value={{
        mainLightValue,
        floorLampValue,
        setMainLightValue,
        setFloorLampValue,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliderContext must be used within a SliderProvider');
  }
  return context;
};
