import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import logo from '../assets/images/musiclink-logo2-white.svg';
import testeLogo from '../assets/images/like.svg';
import { Button } from "../components/Button";
import { useState } from "react";
import Post from "../components/Post";

import '../styles/feed.scss';

export function Feed() {
    const history = useHistory();
    const { user, signOut } = useAuth();
    const [ post, setNewPost ] = useState<string>();

    async function handleClick() {
        await signOut();
        history.push('/');
    }

    return (
        <div id="feed-page">
            <header>
                <div className="content">
                    <img src={logo} alt="Logo Musiclink" />
                    <input type="text" name="search-box" placeholder="Pesquisar"/>
                    <div className="header-menu">
                        <Link to="www.google.com"><img src={testeLogo} alt="" /></Link>
                        <Link to="www.google.com"><img src={testeLogo} alt="" /></Link>
                        <Link to="www.google.com"><img src={testeLogo} alt="" /></Link>
                        <Link to="www.google.com"><img src={testeLogo} alt="" /></Link>
                        <Button onClick={handleClick} buttonColor="#EB9D0E">Log out</Button>
                    </div>
                </div>
            </header>
            <div className="main-content">
                <main>
                    <form>
                        <textarea
                            placeholder="O que você quer postar?"
                            onChange={event => setNewPost(event.target.value)}
                            value={post}
                        />
                        <div className="form-footer">
                            <Link to="www.google.com"><img src={testeLogo} alt="" /></Link>
                            <Button type="submit">Postar</Button>
                        </div>
                    </form>
                    <Post />
                    <Post />
                    <Post />
                </main>
                <aside>
                    <div className="secondary-content">
                    </div>
                    <footer>
                        &copy; 2021 MUSICLINK BY GABRIEL MERCANTE
                    </footer>
                </aside>
            </div>
        </div>
    );
}