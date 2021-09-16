import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    function navigate(path: string) {
        history.push(path);
    }

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
                    <button className="google-login" onClick={handleGoogleLogin}>
                        <img src={googleImg} alt="Logo do Google" />
                        Login com a conta Google
                    </button>
                    <Button onClick={() => navigate('/login')}>
                        Login com email e senha
                    </Button>
                    <div className="separator">ou crie uma conta</div>
                    <Button onClick={() => navigate('/signup')}>
                        Criar conta
                    </Button>
                </div>
            </main>
        </div>
    );
}