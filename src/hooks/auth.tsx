import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface IProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IProps> = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@my-wallet:logged');
        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if (email === 'fulanodetal@gmail.com' && password === '@123456') {
            localStorage.setItem('@my-wallet:logged', 'true');
            setLogged(true);
        } else {
            alert('Senha ou Usuário inválidos!')
        }
    }

    const signOut = () => {
        localStorage.removeItem('@my-wallet:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
