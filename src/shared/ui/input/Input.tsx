import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputProps = ReactInputProps & {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className: _className, ...inputProps } = props
  const className = ['appearance-none w-[450px] bg-white text-black', _className].join(' ')
  return <input ref={ref} {...inputProps} className={className} />
})

export default Input;