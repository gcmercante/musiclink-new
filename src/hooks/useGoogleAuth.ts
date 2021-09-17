import { useContext } from 'react';
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

export function useGoogleAuth() {
    return useContext(GoogleAuthContext);
}