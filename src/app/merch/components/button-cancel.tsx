import React from "react";

interface button {
  label: string;
}

const Button = ({ label }: button) => {
  return <div>{label}</div>;
};

export default Button;
