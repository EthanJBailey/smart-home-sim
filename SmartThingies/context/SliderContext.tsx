import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SliderContextType = {
  mainLightValue: number;
  floorLampValue: number;
  setMainLightValue: (value: number) => void;
  setFloorLampValue: (value: number) => void;
};

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mainLightValue, setMainLightValueState] = useState(0.0);
  const [floorLampValue, setFloorLampValueState] = useState(0.0);

  useEffect(() => {
    const loadValues = async () => {
      try {
        const savedMain = await AsyncStorage.getItem("mainLightValue");
        const savedFloor = await AsyncStorage.getItem("floorLampValue");

        if (savedMain !== null) setMainLightValueState(parseFloat(savedMain));
        if (savedFloor !== null) setFloorLampValueState(parseFloat(savedFloor));
      } catch (e) {
        console.error("Failed to load slider values:", e);
      }
    };

    loadValues();
  }, []);

  const setMainLightValue = (value: number) => {
    setMainLightValueState(value);
    AsyncStorage.setItem("mainLightValue", value.toString());
  };

  const setFloorLampValue = (value: number) => {
    setFloorLampValueState(value);
    AsyncStorage.setItem("floorLampValue", value.toString());
  };

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
    throw new Error("useSliderContext must be used within a SliderProvider");
  }
  return context;
};
