import { useState } from "react";
import { DollarSign, Users, TrendingUp, Link as LinkIcon, Copy, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import type { User } from "../../App";
import { toast } from "sonner@2.0.3";

interface AffiliatePageProps {
  user: User | null;
}

export function AffiliatePage({ user }: AffiliatePageProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    instagram: "",
    audience: "",
  });
  const [isAffiliate, setIsAffiliate] = useState(user?.isAffiliate || false);
  const affiliateCode = user?.affiliateCode || "RADAR" + Math.random().toString(36).substring(7).toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para se tornar afiliado");
      return;
    }
    
    toast.success("Inscrição enviada com sucesso!", {
      description: "Nossa equipe analisará sua solicitação em até 48 horas.",
    });
    
    setIsAffiliate(true);
  };

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(`https://foradoradar.com/?ref=${affiliateCode}`);
    toast.success("Link copiado!");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-4">Programa de Afiliados</h1>
          <p className="text-gray-400 text-lg mb-12">
            Ganhe 30% de comissão em cada venda que você realizar
          </p>

          {!isAffiliate ? (
            <>
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 bg-card border-border">
                  <DollarSign className="size-10 mb-4" />
                  <h3 className="text-xl mb-2">30% de Comissão</h3>
                  <p className="text-muted-foreground">
                    Receba 30% do valor de cada produto vendido através do seu link
                  </p>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <TrendingUp className="size-10 mb-4" />
                  <h3 className="text-xl mb-2">Dashboard Completo</h3>
                  <p className="text-muted-foreground">
                    Acompanhe suas vendas e comissões em tempo real
                  </p>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <Users className="size-10 mb-4" />
                  <h3 className="text-xl mb-2">Suporte Dedicado</h3>
                  <p className="text-muted-foreground">
                    Nossa equipe está pronta para te ajudar a maximizar vendas
                  </p>
                </Card>
              </div>

              {/* How it Works */}
              <Card className="p-8 bg-card border-border mb-12">
                <h2 className="text-2xl mb-6">Como Funciona?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 mt-1 flex-shrink-0" />
                    <div>
                      <p>1. Preencha o formulário de cadastro abaixo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 mt-1 flex-shrink-0" />
                    <div>
                      <p>2. Aguarde aprovação da nossa equipe (até 48 horas)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 mt-1 flex-shrink-0" />
                    <div>
                      <p>3. Receba seu link personalizado e materiais de divulgação</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 mt-1 flex-shrink-0" />
                    <div>
                      <p>4. Compartilhe com sua audiência e comece a ganhar</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Application Form */}
              <Card className="p-8 bg-card border-border">
                <h2 className="text-2xl mb-6">Cadastro de Afiliado</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 bg-zinc-800 border-white/10"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 bg-zinc-800 border-white/10"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="instagram">Instagram (opcional)</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="@seu_usuario"
                      className="mt-2 bg-zinc-800 border-white/10"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="audience">Tamanho da Audiência</Label>
                    <Input
                      id="audience"
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      placeholder="Ex: 10k seguidores no Instagram"
                      className="mt-2 bg-zinc-800 border-white/10"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                    Enviar Inscrição
                  </Button>
                </form>
              </Card>
            </>
          ) : (
            <>
              {/* Affiliate Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 bg-zinc-900 border-white/10">
                  <p className="text-gray-400 mb-2">Total de Vendas</p>
                  <p className="text-3xl">R$ 2.450,00</p>
                </Card>

                <Card className="p-6 bg-zinc-900 border-white/10">
                  <p className="text-gray-400 mb-2">Comissões Ganhas</p>
                  <p className="text-3xl">R$ 735,00</p>
                </Card>

                <Card className="p-6 bg-zinc-900 border-white/10">
                  <p className="text-gray-400 mb-2">Conversões</p>
                  <p className="text-3xl">24</p>
                </Card>
              </div>

              {/* Affiliate Link */}
              <Card className="p-8 bg-zinc-900 border-white/10 mb-12">
                <h2 className="text-2xl mb-6">Seu Link de Afiliado</h2>
                
                <div className="flex gap-2">
                  <Input
                    value={`https://foradoradar.com/?ref=${affiliateCode}`}
                    readOnly
                    className="bg-zinc-800 border-white/10"
                  />
                  <Button onClick={copyAffiliateLink} className="bg-white text-black hover:bg-gray-200">
                    <Copy className="size-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                
                <p className="text-sm text-gray-400 mt-4">
                  Compartilhe este link nas suas redes sociais para ganhar comissões
                </p>
              </Card>

              {/* Performance */}
              <Card className="p-8 bg-zinc-900 border-white/10">
                <h2 className="text-2xl mb-6">Performance do Mês</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Meta de Vendas</span>
                      <span>R$ 2.450 / R$ 5.000</span>
                    </div>
                    <Progress value={49} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Cliques no Link</span>
                      <span>342</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Taxa de Conversão</span>
                      <span>7.0%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}