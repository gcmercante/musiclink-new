import { ReactNode } from "react";
import { firebase } from "./firebase";

export type User = {
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

export type AuthContextType = {
    user: User | undefined,
    signIn: (provider: firebase.auth.AuthProvider, providerType: string, user?: EmailUser) => Promise<void>,
    signUp: ({ email, password }: EmailUser) => Promise<void>,
    signOut: () => Promise<void>
}

export type AuthContextProviderProps = {
    children: ReactNode
}

export type AuthProvidersType = {
    [key: string]: (user: firebase.User) => void;
}

export type AlertPropsType = {
    text: string,
};

export type LoginType = {
    email?: string,
    password?: string,
};

export type ErrorHandlerType = {
    text: object
}

export type ProvidersType = {
    [key: string]: string
}