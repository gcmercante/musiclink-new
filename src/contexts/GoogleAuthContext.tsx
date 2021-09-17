import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string,
    name: string,
    avatar: string,
}

type GoogleAuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>,
}

type GoogleAuthContextProviderProps = {
    children: ReactNode
}

export const GoogleAuthContext = createContext({} as GoogleAuthContextType);

export function GoogleAuthContextProvider(props: GoogleAuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                if (user) {
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
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;
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
    
    return (
        <GoogleAuthContext.Provider value={{ user, signInWithGoogle }}>
            { props.children }
        </GoogleAuthContext.Provider>
    );
}