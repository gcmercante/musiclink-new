import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string,
    name: string | null,
    avatar: string | null,
    providerId?: string
}

export type EmailUser = {
    email?: string,
    password?: string,
    name?: string,
    birthday?: string
}

type AuthContextType = {
    user: User | undefined,
    signIn: (provider: firebase.auth.AuthProvider, providerType: string, user?: EmailUser) => Promise<void>,
    signUp: ({ email, password }: EmailUser) => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthProvidersType = {
    [key: string]: (user: firebase.User) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [ user, setUser ] = useState<User>();

    const authProviders: AuthProvidersType = {
        google: (googleUser: firebase.User) => {
            const { displayName, photoURL, uid } = googleUser;
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                providerId: 'google'
            });
        },
        email: (emailUser: firebase.User) => {
            const { displayName, photoURL, uid } = emailUser;
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                providerId: 'email'
            });
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                const authProvidersEffect: AuthProvidersType = {
                    google: (googleUser: firebase.User) => {
                        const { displayName, photoURL, uid } = googleUser;
                        setUser({
                            id: uid,
                            name: displayName,
                            avatar: photoURL,
                            providerId: 'google'
                        });
                    },
                    email: (emailUser: firebase.User) => {
                        const { displayName, photoURL, uid } = emailUser;
                        setUser({
                            id: uid,
                            name: displayName,
                            avatar: photoURL,
                            providerId: 'email'
                        });
                    }
                }
                const providers = [
                    'google',
                    'email',
                ];
                providers.forEach(provider => {
                    if(authProvidersEffect.hasOwnProperty(provider)) {
                        if(user.providerData[0]?.providerId === provider) {
                            authProvidersEffect[provider](user);
                        }
                    }
                });
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signIn(provider: firebase.auth.AuthProvider, providerType: string, user?: EmailUser) {
        try {
            if(providerType !== 'Email') {
                const result = await auth.signInWithPopup(provider);
                if (result.user) {
                    authProviders[providerType](result.user);
                }
            } else {
                if(user && user.email && user.password) {
                    const result = await auth.signInWithEmailAndPassword(user.email, user.password);
                    if (result.user) {
                        authProviders[providerType](result.user);
                    }
                }
            }
        } catch (error) {
            
        }
    }

    async function signUp({ email, password }: EmailUser) {
        if(email && password) {
            await auth.createUserWithEmailAndPassword(email, password);
        }
    }

    const value = { 
        user, 
        signIn, 
        signUp 
    };
    
    return (
        <AuthContext.Provider value={ value }>
            { props.children }
        </AuthContext.Provider>
    );
}