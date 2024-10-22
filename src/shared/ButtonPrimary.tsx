import Button, { ButtonProps } from './Button'
import React from 'react'

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
	className = '',
	...args
}) => {
	return (
		<Button
			className={`ttnc-ButtonPrimary text-slate-100 bg-primary-6000 text-neutral-50 hover:bg-primary-700 disabled:bg-opacity-70 ${className}`}
			{...args}
		/>
	)
}

export default ButtonPrimary
