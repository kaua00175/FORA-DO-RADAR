import { useState } from "react";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { User, Page } from "../../App";
import { toast } from "sonner@2.0.3";

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: Page) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular login
    const user: User = {
      id: "1",
      name: "Produtor",
      email: loginData.email,
      isAffiliate: false,
    };
    
    toast.success("Login realizado com sucesso!");
    onLogin(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    // Simular registro
    const user: User = {
      id: "1",
      name: registerData.name,
      email: registerData.email,
      isAffiliate: false,
    };
    
    toast.success("Conta criada com sucesso!");
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-card border-border">
        <div className="p-8">
          <h1 className="text-3xl text-center mb-8">FORA DO RADAR</h1>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted">
              <TabsTrigger value="login" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                Cadastrar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">E-mail</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Entrar
                </Button>
                
                <button
                  type="button"
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueci minha senha
                </button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Nome Completo</Label>
                  <div className="relative mt-2">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="register-email">E-mail</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="register-confirm">Confirmar Senha</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="register-confirm"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="pl-10 bg-input border-border"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}