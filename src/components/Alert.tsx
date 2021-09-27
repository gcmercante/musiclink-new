import { AlertPropsType } from '../services/types';
import '../styles/alert.scss';

export function Alert(props: AlertPropsType) {
    return (
        <div className="alert-container">
            { props.text }
        </div>
    )
}