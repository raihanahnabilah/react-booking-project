import { type ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never;
    textOnly?: boolean;
};

type LinkProps = ComponentPropsWithoutRef<typeof Link> & {
    textOnly?: boolean;
} 

function isLinkProps(props: ButtonProps | LinkProps): props is LinkProps {
    return 'to' in props;
}

export default function Button(props: ButtonProps | LinkProps) {
    const textOnlyClass = props.textOnly ? " button--text-only" : "";


    // If it has the "to" props
    if (isLinkProps(props)){
        return <Link className={`button ${textOnlyClass}`} {...props} />
        // return <Link className={props.textOnly ? "button button--text-only" : "button"} {...props} />
    }

    const disabledClass = props.disabled ? " button--disabled" : "";

    // If it doesn't have the "to" props
    return <button className={`button${textOnlyClass}${disabledClass}`}  {...props}></button>
}