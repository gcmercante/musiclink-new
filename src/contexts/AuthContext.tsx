import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string,
    name: string,
    avatar: string,
}

type AuthContextType = {
    user: User | undefined,
    signIn: (provider: firebase.auth.AuthProvider, providerType: string) => Promise<void>,
}

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthProvidersType = {
    [key: string]: (user: firebase.UserInfo) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    const authProviders: AuthProvidersType = {
        Google: (user: firebase.UserInfo) => {
            const { displayName, photoURL, uid } = user;
            if (!displayName || !photoURL) {
                throw new Error('Missing info from Google Account');
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            });
        }
    }

    const providers = [
        'Google',
        'Email',
    ]

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                providers.forEach(provider => {
                    if(authProviders.hasOwnProperty(provider)) {
                        authProviders[provider](user);
                    }
                });
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signIn(provider: firebase.auth.AuthProvider, providerType: string) {
        const result = await auth.signInWithPopup(provider);
        if (result.user) {
            authProviders[providerType](result.user);
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, signIn }}>
            { props.children }
        </AuthContext.Provider>
    );
}