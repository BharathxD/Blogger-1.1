import { ForwardedRef, forwardRef } from "react";

interface Props {
  input: {
    type: string;
    placeholder: string;
    id?: string;
  };
  ref: ForwardedRef<HTMLInputElement>;
  className?: string;
  value?: string | undefined;
  required?: boolean;
}

const Input: React.FC<Props> = forwardRef(
  ({ input, className, value, required }, ref) => {
    return (
      <>
        {required && (
          <input
            {...input}
            ref={ref}
            className={className}
            defaultValue={value ?? ""}
            required
          />
        )}
        {!required && (
          <input
            {...input}
            ref={ref}
            className={className}
            defaultValue={value ?? ""}
          />
        )}
      </>
    );
  }
);

export default Input;
