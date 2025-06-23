import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences?: {
    deliveryMethod: string;
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users database (in a real app, this would be handled by a backend)
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "123456",
    phone: "+52 55 1234 5678",
    address: {
      street: "Av. Polanco 123",
      city: "México",
      state: "CDMX",
      postalCode: "11550",
      country: "México",
    },
    preferences: {
      deliveryMethod: "express",
      notifications: true,
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("quickgo_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("quickgo_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (mockUser) {
      const { password: _, ...userData } = mockUser;
      setUser(userData);
      localStorage.setItem("quickgo_user", JSON.stringify(userData));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: "Email o contraseña incorrectos" };
    }
  };

  const register = async (
    userData: RegisterData,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: "Este email ya está registrado" };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      preferences: {
        deliveryMethod: "express",
        notifications: true,
      },
    };

    // Add to mock database
    mockUsers.push({ ...newUser, password: userData.password });

    setUser(newUser);
    localStorage.setItem("quickgo_user", JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quickgo_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("quickgo_user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
