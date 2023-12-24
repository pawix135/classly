import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface Props {
  text: string;
  name: string;
  type: React.ComponentProps<"input">["type"] | "textarea";
  error?: string | undefined | null;
  placeholder?: string;
  testId?: string;
  className?: {
    input?: React.ComponentProps<"input">["className"];
    label?: React.ComponentProps<"label">["className"];
  };
}

const InputGroup: React.FC<Props> = ({ text, name, type, error, placeholder, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Label htmlFor={name} className={cn("font-bold", props.className?.label)} data-testid={`${name}-label`}>
          {text}
        </Label>
        {error && <span className="text-red-500">{error}</span>}
      </div>
      {type == "textarea" ? (
        <Textarea
          rows={10}
          name={name}
          id={name}
          placeholder={placeholder}
          data-testid={name + "-textarea"}
          className={cn(
            {
              "border-red-500": error,
            },
            props.className?.input
          )}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={type == "password" ? "current-password" : "off"}
          data-testid={name + "-input"}
          className={cn(
            {
              "border-red-500": error,
            },
            props.className?.input
          )}
        />
      )}
    </div>
  );
};

export default InputGroup;
