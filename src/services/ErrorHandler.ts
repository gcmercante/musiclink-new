export function ErrorHandler(error: string): string {
    switch(error) {
        case 'auth/user-not-found':
            return 'Desculpe, não encontramos sua conta';
        case 'auth/wrong-password':
            return 'Senha incorreta';
        case 'auth/email-already-in-use':
            return 'Este email já está sendo usado';
        case 'auth/weak-password':
            return 'Senha com menos de 6 caracteres';
    }
    return '';
}