import { auth, firebase } from "../services/firebase";
import { createContext, useEffect, useState } from "react";
import { AuthContextProviderProps, AuthContextType, AuthProvidersType, EmailUser, ProvidersType, User } from "../services/types";

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

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

                const providers: ProvidersType = {
                    'google': 'google.com',
                    'email': 'password'
                }

                for(const provider in providers) {
                    if(authProvidersEffect.hasOwnProperty(provider)) {
                        if(user.providerData[0]?.providerId === providers[provider]) {
                            authProvidersEffect[provider](user);
                        }
                    }
                }
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signIn(provider: firebase.auth.AuthProvider, providerType: string, user?: EmailUser) {
        if (providerType !== 'email') {
            const result = await auth.signInWithPopup(provider);
            if (result.user) {
                authProviders[providerType](result.user);
            }
        } else {
            if (user && user.email && user.password) {
                const result = await auth.signInWithEmailAndPassword(user.email, user.password);
                if (result.user) {
                    authProviders[providerType](result.user);
                }
            }
        }
    }

    async function signUp({ email, password }: EmailUser) {
        if (email && password) {
            await auth.createUserWithEmailAndPassword(email, password);
        }
    }

    async function signOut() {
        try {
            await auth.signOut();
            setUser(undefined);
        } catch (err: any) {
            console.log(err.message);
        }
    }

    const value = {
        user,
        signIn,
        signUp,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}