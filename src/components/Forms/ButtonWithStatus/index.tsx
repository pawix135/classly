"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  error?: object | boolean | undefined;
  testId?: string;
}

const ButtonWithStatus: React.FC<Props> = ({ children, ...props }) => {
  let status = useFormStatus();

  return (
    <Button
      type="submit"
      variant={!props.error ? "default" : "destructive"}
      className={cn("", props.className)}
      disabled={status.pending}
      data-testid={props.testId}
    >
      {children}
    </Button>
  );
};

export default ButtonWithStatus;
