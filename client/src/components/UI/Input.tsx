import { ForwardedRef, RefObject, forwardRef } from "react";

interface Props {
  input: {
    type: string;
    placeholder: string;
    id?: string;
  };
  ref: ForwardedRef<HTMLInputElement>;
  className?: string;
  value?: string | undefined;
}

const Input: React.FC<Props> = forwardRef(
  ({ input, className, value }, ref) => {
    return (
      <input
        {...input}
        ref={ref}
        className={className}
        defaultValue={value ?? ""}
        required
      />
    );
  }
);

export default Input;
