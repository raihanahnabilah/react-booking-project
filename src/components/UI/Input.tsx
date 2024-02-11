import { forwardRef, type ComponentPropsWithoutRef } from "react";

// This is essentially a wrapper component
type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithoutRef<'input'>; // error -> requires the related type // add default props of regular input props
// Difference between with ref and without ref-> it adds ref prop to the list of accepted props
// You cant use the ComponentPropsWithRef to pass on Ref to custom compoennt -> need forwardRef

// should provide extra type information
const Input = forwardRef<HTMLInputElement, InputProps> (function Input(
    { label, id, ...props },  
    ref
    ) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} ref={ref} /> {/* Collect the standard javascript props*/}
        </div>
    );
});

export default Input;