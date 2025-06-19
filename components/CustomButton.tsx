
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
  size="lg",
  children,
  ...rest
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={className}
      {...rest} 
    >
      {children}
    </Button>
  );
};

export default CustomButton;
