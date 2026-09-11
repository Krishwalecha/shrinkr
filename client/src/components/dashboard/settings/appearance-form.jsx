import { Moon, Sun, SunMoon } from "lucide-react";
import { cn } from "cn";

import { useTheme } from "@/context/ThemeContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: SunMoon },
];

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>

        <CardDescription>
          Choose how Shrinkr looks on your device.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {options.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors",
                theme === value
                  ? "border-primary bg-accent text-primary"
                  : "border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
