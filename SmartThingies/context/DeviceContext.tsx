// context/DeviceContext.tsx
import React, { createContext, useContext, useState } from 'react';

type DeviceState = {
  [deviceId: number]: {
    isOn: boolean;
    automationRules: { type: 'on' | 'off'; time: string }[];
  };
};

type DeviceContextType = {
  deviceState: DeviceState;
  toggleDevice: (id: number) => void;
};

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceState, setDeviceState] = useState<DeviceState>({});

  const toggleDevice = (id: number) => {
    setDeviceState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOn: !prev[id]?.isOn,
        automationRules: prev[id]?.automationRules || [],
      },
    }));
  };

  return (
    <DeviceContext.Provider value={{ deviceState, toggleDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
};
