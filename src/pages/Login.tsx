import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { googleAuth } from '../services/authProviders';

import { Button } from '../components/Button';

import logoSolo from '../assets/images/musiclink-logo-solo2.svg';
import logoImg from '../assets/images/musiclink-logo2.svg';
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';


export function Login() {
    const history = useHistory();
    const { user, signIn } = useAuth();

    async function handleGoogleLogin() {
        if (!user) {
            await signIn(googleAuth, 'Google');
        }

        history.push('/feed');
    }

    async function handleEmailLogin(event:FormEvent) {
        event.preventDefault();
        history.push('/feed');
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
                    <form onSubmit={handleEmailLogin}>
                        <input 
                            type="text"
                            placeholder="Email"
                        />
                        <input 
                            type="text"
                            placeholder="Senha"
                        />
                        <Button type="submit">
                            Entrar
                        </Button>
                    </form>
                    <div className="separator">ou</div>
                    <button className="google-login-2" onClick={ handleGoogleLogin }>
                        <img src={googleImg} alt="Logo do Google" />
                        Login com a conta Google
                    </button>
                    <p>
                        Não tem uma conta? <Link to="/signup">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}