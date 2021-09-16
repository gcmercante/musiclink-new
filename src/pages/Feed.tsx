import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function Feed() {
    const { user } = useAuth();
    return (
        <div>
            <div>{ user?.id }</div>
            <Link to="/">Voltar</Link>
        </div>
    );
}