import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { decodeToken } from '../helpers/auth';
import { User, UserContextType } from '../models/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (token: string) => {
        // Decode the token and extract user data
        const decodedToken = decodeToken(token);
        setUser(decodedToken);
        // Store the token in localStorage
        localStorage.setItem('token', token);
    };

    const logout = () => {
        // Clear user data and token from state and localStorage
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        // Check if token exists in localStorage on app start
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            setUser(decodedToken);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
