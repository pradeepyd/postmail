
import { Button } from "./ui/button"
import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  size?:string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  className = "",
  disabled = false,
  children,
  size="lg",
  ...rest
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={className}
      size="lg"
      {...rest} 
    >
      {children}
    </Button>
  );
};

export default CustomButton;
