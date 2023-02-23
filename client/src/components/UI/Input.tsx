import { ForwardedRef, RefObject, forwardRef } from "react";

interface Props {
  input: {
    type: string;
    placeholder: string;
    id?: string;
  };
  ref: ForwardedRef<HTMLInputElement>;
  className?: string;
}

const Input: React.FC<Props> = forwardRef(({ input, className }, ref) => {
  return <input {...input} ref={ref} className={className} />;
});

export default Input;
