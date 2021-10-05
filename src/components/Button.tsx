import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { buttonColor?: string };

export function Button(props: ButtonProps) {
    return (
        <button className="button" { ...props } style={ props.buttonColor ? { backgroundColor: props.buttonColor } : undefined }/>
    )
}