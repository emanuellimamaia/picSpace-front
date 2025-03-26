import React, { InputHTMLAttributes } from 'react';
import MaskedInput, { Mask } from 'react-text-mask';
import { NumericFormat } from 'react-number-format';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  preppend?: string | React.ReactNode;
  append?: string | React.ReactNode;
  mask?: Mask;
  inputClassName?: string;
  label?: string;
  errorMessage?: string;
  currency?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      append,
      mask,
      preppend,
      inputClassName,
      currency,
      label,
      errorMessage: error,
      disabled,
      ...props
    },
    ref,
  ) => {
    const renderInput = () => {
      if (currency) {
        return (
          <NumericFormat
            value={props.value as number}
            allowNegative={false}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            getInputRef={ref}
            placeholder={props.placeholder}
            disabled={disabled}
            className={`peer w-full border-none bg-transparent text-sm font-medium placeholder:text-opacity-100  ${
              inputClassName ?? ''
            }`}
            onValueChange={(values) => {
              props.onChange?.({
                target: { name: props.name, value: values.value },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          />
        );
      }
      if (mask) {
        return (
          <MaskedInput
            {...props}
            disabled={disabled}
            className={`peer w-full border-none bg-transparent text-sm font-medium outline-none placeholder:text-xs placeholder:leading-tight placeholder:text-muted-foreground  ${
              inputClassName ?? ''
            }`}
            mask={mask}
            render={(innerRef, innerProps) => (
              <input
                ref={(node) => {
                  if (node) {
                    innerRef(node);
                    if (ref) {
                      if (typeof ref === 'function') {
                        ref(node);
                      } else if (ref) {
                        ref.current = node;
                      }
                    }
                  }
                }}
                {...innerProps}
              />
            )}
          />
        );
      }
      return (
        <input
          {...props}
          disabled={disabled}
          ref={ref}
          className={` w-full border-none bg-transparent text-sm font-medium focus:bg-none outline-none placeholder:text-gray-300  ${
            inputClassName ?? ''
          }`}
        />
      );
    };

    return (
      <div
        className={`block ${error ? 'border-red-500' : ''} ${
          props.className ?? ''
        }`}
      >
        {label && (
          <label
            className={`text-sm font-medium leading-tight   ${
              error ? 'text-red-500' : 'text-neutral-900'
            }`}
          >
            {label}
          </label>
        )}

        <div
          className={`flex items-center overflow-hidden rounded-sm border bg-white ${
            error ? 'border-red-500' : ''
          } ${props.className ?? ''}`}
        >
          {preppend && (
            <div className="flex h-full items-center justify-center pl-2">
              {preppend}
            </div>
          )}
          <div
            className={`flex-grow px-2 py-2 placeholder:text-red-600  ${
              disabled ? 'opacity-50' : ''
            }`}
          >
            {renderInput()}
          </div>
          {append && (
            <div className="flex h-full items-center justify-center pr-4">
              {append}
            </div>
          )}
        </div>
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);

Input.displayName = 'Input';
