import { Music, ShoppingCart, User, LogOut, LayoutDashboard, Store, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";
import type { Page, User as UserType } from "../App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: UserType | null;
  onLogout: () => void;
}

export function Header({ cartCount, onCartClick, currentPage, onNavigate, user, onLogout }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Music className="size-7" />
          <h1 className="text-xl tracking-wider">FORA DO RADAR</h1>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate("home")}
            className={`hover:text-foreground transition-colors ${
              currentPage === "home" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onNavigate("products")}
            className={`hover:text-foreground transition-colors ${
              currentPage === "products" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Produtos
          </button>
          <button
            onClick={() => onNavigate("sell")}
            className={`hover:text-foreground transition-colors ${
              currentPage === "sell" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Vender
          </button>
          <button
            onClick={() => onNavigate("affiliate")}
            className={`hover:text-foreground transition-colors ${
              currentPage === "affiliate" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Afiliados
          </button>
          <button
            onClick={() => onNavigate("support")}
            className={`hover:text-foreground transition-colors ${
              currentPage === "support" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Suporte
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-muted"
            onClick={onCartClick}
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-foreground text-background rounded-full flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <div className="px-2 py-2">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => onNavigate("dashboard")}
                  className="cursor-pointer focus:bg-muted"
                >
                  <LayoutDashboard className="size-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                {user.isSeller && (
                  <DropdownMenuItem
                    onClick={() => onNavigate("seller-dashboard")}
                    className="cursor-pointer focus:bg-muted"
                  >
                    <Store className="size-4 mr-2" />
                    Painel de Vendedor
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer focus:bg-muted"
                >
                  <LogOut className="size-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:bg-muted"
              onClick={() => onNavigate("login")}
            >
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
