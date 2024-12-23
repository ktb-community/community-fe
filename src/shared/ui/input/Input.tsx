import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputProps = ReactInputProps & {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className: _className, ...inputProps } = props
  const className = ['w-[450px]', _className].join(' ')
  return <input ref={ref} {...inputProps} className={className} />
})

export default Input;