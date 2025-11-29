import { createContext, useContext, useState, ReactNode } from 'react';
import { initialUser, User } from './data';

interface UserContextType {
  user: User;
  completeHike: (routeId: number, distance: number, elevation: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);

  const completeHike = (routeId: number, distance: number, elevation: number) => {
    if (user.completedHikes.includes(routeId)) return;

    setUser(prev => ({
      ...prev,
      completedHikes: [...prev.completedHikes, routeId],
      totalKm: parseFloat((prev.totalKm + distance).toFixed(1)),
      totalElevation: prev.totalElevation + elevation
    }));
  };

  return (
    <UserContext.Provider value={{ user, completeHike }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
