import { firebase } from './firebase';

export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const emailAuth = new firebase.auth.EmailAuthProvider();