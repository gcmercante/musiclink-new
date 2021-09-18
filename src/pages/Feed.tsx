import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function Feed() {
    const { user } = useAuth();
    return (
        <div>
            <div>{ JSON.stringify(user) }</div>
            <Link to="/">Voltar</Link>
        </div>
    );
}