import { Link } from "react-router-dom";

import { useGoogleAuth } from "../hooks/useGoogleAuth";

export function Feed() {
    const { user } = useGoogleAuth();
    return (
        <div>
            <div>{ user?.id }</div>
            <Link to="/">Voltar</Link>
        </div>
    );
}