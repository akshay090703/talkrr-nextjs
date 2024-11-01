import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ToggleTheme";

export function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-background border-b border-border">
      <Logo />
      <ModeToggle />
    </header>
  );
}
