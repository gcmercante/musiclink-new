import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';


export function Login() {
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
                    <form>
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