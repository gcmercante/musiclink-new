import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';

export function SignUp() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    async function handleGoogleLogin() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/feed');
    }
    
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Crie sua conta agora mesmo!</strong>
                <p>Entre em uma comunidade única para musicos</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Musiclink" />
                    <button className="google-login-2" onClick={ handleGoogleLogin }>
                        <img src={googleImg} alt="Logo do Google" />
                        Criar conta com a conta Google
                    </button>
                    <div className="separator-2">ou</div>
                    <form className="signup-form">
                        <input 
                            type="text"
                            placeholder="Email"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Confirme seu email"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Senha"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Confirme sua senha"
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Nome"
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
                                    e.currentTarget.placeholder = 'Data nascimento';
                                }
                            }
                            placeholder="Data nascimento"
                        />
                        <Button type="submit">
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