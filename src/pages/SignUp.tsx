import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { EmailUser } from '../services/types';
import { googleAuth } from '../services/authProviders';
import { ErrorHandler } from '../services/ErrorHandler';

import { Alert } from '../components/Alert';
import { Button } from '../components/Button';

import googleImg from '../assets/images/google-icon.svg'
import logoImg from '../assets/images/musiclink-logo2.svg';
import logoSolo from '../assets/images/musiclink-logo-solo2.svg';

import '../styles/auth.scss';

export function SignUp() {
    const history = useHistory();
    const { user, signIn, signUp } = useAuth();
    const [ info, setInfo ] = useState<EmailUser>();
    const [ doing, setDoing ] = useState<boolean>();
    const [ error, setError ] = useState<string>('');

    async function handleGoogleLogin() {
        if (!user) {
            await signIn(googleAuth, 'google');
        }

        history.push('/feed');
    }

    async function handleSubmit(e:FormEvent) {
        e.preventDefault();
        try {
            if(!user && info) {
                setError('');
                setDoing(true);
                await signUp(info);
            }
    
            history.push('/feed');
        } catch(err: any) {
            setError(ErrorHandler(err.code));
            setDoing(false);
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
                    { error !== '' ? <Alert text={ error }/> : false }
                    <button className="google-login-2" onClick={ handleGoogleLogin }>
                        <img src={googleImg} alt="Logo do Google" />
                        Criar conta com a conta Google
                    </button>
                    <div className="separator-2">ou</div>
                    <form className="signup-form" onSubmit={ handleSubmit }>
                        <input 
                            type="email"
                            placeholder="Email *"
                            style={ error ? { borderColor: "red" } : {}}
                            onChange={e => setInfo({ ...info, email: e.target.value })}
                            required
                        />
                        <input 
                            type="password"
                            placeholder="Senha *"
                            style={ error ? { borderColor: "red" } : {}}
                            onChange={e => setInfo({ ...info, password: e.target.value })}
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Nome *"
                            style={ error ? { borderColor: "red" } : {}}
                            onChange={e => setInfo({ ...info, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            onFocus={
                                (e)=> {
                                    e.currentTarget.type = "date";
                                    e.currentTarget.focus();
                                    e.currentTarget.placeholder = '';
                                }
                            }
                            onBlur={
                                (e)=> {
                                    e.currentTarget.type = "text";
                                    e.currentTarget.blur();
                                    e.currentTarget.placeholder = 'Data nascimento *';
                                }
                            }
                            placeholder="Data nascimento *"
                            onChange={e => setInfo({ ...info, birthday: e.target.value })}
                            style={ error ? { borderColor: "red" } : {}}
                        />
                        <Button type="submit" disabled={ doing }>
                            Entrar
                        </Button>
                    </form>
                    <p>
                        Já tem uma conta? <Link to="/login">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}