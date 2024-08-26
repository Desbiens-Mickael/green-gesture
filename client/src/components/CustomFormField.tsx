import { useState } from "react";
import { Control } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CustomFormFieldProps {
  control: Control<any[] | any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  isPassword?: boolean;
}

function CustomFormField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  hint,
  isPassword = false,
  ...props
}: CustomFormFieldProps) {
  const [inputType, setInputType] = useState(type);

  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                {...props}
                className={`${isPassword ? "pr-10" : ""}`}
              />
              {isPassword && (
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={handleInputType}
                  className="absolute top-[5px] right-[10px] h-8 w-8"
                >
                  {inputType === "password" ? <Eye /> : <EyeOff />}
                </Button>
              )}
            </div>
          </FormControl>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
