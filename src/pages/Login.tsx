import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { googleAuth } from '../services/authProviders';
import { emailAuth } from '../services/authProviders';

import { Button } from '../components/Button';

import logoSolo from '../assets/images/musiclink-logo-solo2.svg';
import logoImg from '../assets/images/musiclink-logo2.svg';
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';

type LoginType = {
    email?: string,
    password?: string,
};


export function Login() {
    const history = useHistory();
    const { user, signIn } = useAuth();
    const [ login, setLogin ] = useState<LoginType>();
    const [ doing, setDoing ] = useState<boolean>();
    const [ error, setError ] = useState<boolean>();
    const [ emailError, setEmailError ] = useState<boolean>();

    async function handleGoogleLogin() {
        try {
            if (!user) {
                setError(false);
                await signIn(googleAuth, 'google');
            }
    
            history.push('/feed');
        } catch {
            setError(true);
        }
    }

    async function handleEmailLogin(event:FormEvent) {
        event.preventDefault();
        try {
            if(!user) {
                setEmailError(false);
                setDoing(true);
                await signIn(emailAuth, 'email', login);
            }
            history.push('/feed');
        } catch {
            setEmailError(true);
        }
        setDoing(false);        
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
                            type="email"
                            placeholder="Email"
                            style={ emailError ? { borderColor: "red" } : {}}
                            onChange={e => setLogin({ ...login, email: e.target.value })}
                            required
                        />
                        <input 
                            type="password"
                            placeholder="Senha"
                            style={ emailError ? { borderColor: "red" } : {}}
                            onChange={e => setLogin({ ...login, password: e.target.value })}
                            required
                        />
                        <Button disabled={ doing } type="submit">
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