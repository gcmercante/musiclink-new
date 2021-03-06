import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { googleAuth } from '../services/authProviders';

import { Button } from '../components/Button';

import logoSolo from '../assets/images/musiclink-logo-solo2.svg';
import logoImg from '../assets/images/musiclink-logo2.svg';
import googleImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signIn } = useAuth();
    const [ loading, setLoading ] = useState<boolean>();

    function navigate(path: string) {
        history.push(path);
    }

    async function handleGoogleLogin() {
        if (!user) {
            setLoading(true);
            await signIn(googleAuth, 'google');
        }

        history.push('/feed');
        setLoading(false);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={logoSolo} alt="Ilustração" />
                <strong>Crie sua conta agora mesmo!</strong>
                <p>Entre em uma comunidade única para musicos</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Musiclink" />
                    <button disabled={loading} className="google-login" onClick={handleGoogleLogin}>
                        <img src={googleImg} alt="Logo do Google" />
                        Login com a conta Google
                    </button>
                    <Button disabled={loading} onClick={() => !user ? navigate('/login') : navigate('/feed')}>
                        Login com email e senha
                    </Button>
                    <div className="separator">ou crie uma conta</div>
                    <Button disabled={loading} onClick={() => navigate('/signup')}>
                        Criar conta
                    </Button>
                </div>
            </main>
        </div>
    );
}