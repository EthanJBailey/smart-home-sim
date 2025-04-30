import React, { createContext, useContext, useState } from 'react';

type User = {
  email: string;
  //name: string; // implement in database calls -- during login & signup
  //rooms: [];    // implement in database calls -- during login & signup
  //devices: [];  // implement in database calls -- during login & signup
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
