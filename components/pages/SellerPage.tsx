import { useState } from "react";
import { Upload, DollarSign, Package, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { User, Page } from "../../App";
import { toast } from "sonner@2.0.3";

interface SellerPageProps {
  user: User | null;
  onNavigate: (page: Page) => void;
}

export function SellerPage({ user, onNavigate }: SellerPageProps) {
  const [productData, setProductData] = useState({
    name: "",
    type: "",
    price: "",
    bpm: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para vender produtos");
      return;
    }
    
    toast.success("Produto cadastrado com sucesso!", {
      description: "Ele será analisado e aprovado em até 24 horas.",
    });
    
    setProductData({
      name: "",
      type: "",
      price: "",
      bpm: "",
      description: "",
      imageUrl: "",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <Package className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl mb-4">Venda Seus Produtos</h2>
          <p className="text-muted-foreground mb-6">
            Faça login para começar a vender seus beats, drum kits e melodias
          </p>
          <Button
            onClick={() => onNavigate("login")}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Fazer Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-4">Vender Produtos</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Liste seus produtos no marketplace e ganhe dinheiro com suas criações
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card border-border">
              <DollarSign className="size-10 mb-4" />
              <h3 className="text-xl mb-2">Ganhe 55%</h3>
              <p className="text-muted-foreground">
                Você recebe 55% de cada venda. A plataforma fica com 15% e 30% vai para afiliados.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <TrendingUp className="size-10 mb-4" />
              <h3 className="text-xl mb-2">Alcance Global</h3>
              <p className="text-muted-foreground">
                Seus produtos serão vistos por milhares de produtores
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <Package className="size-10 mb-4" />
              <h3 className="text-xl mb-2">Fácil de Usar</h3>
              <p className="text-muted-foreground">
                Cadastre produtos em poucos minutos e comece a vender
              </p>
            </Card>
          </div>

          {/* Commission Breakdown */}
          <Card className="p-6 bg-card border-border mb-12">
            <h2 className="text-2xl mb-4">Como Funciona a Comissão?</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Você (Vendedor)</span>
                <span className="text-xl">55%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Afiliado (se houver)</span>
                <span className="text-xl">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Plataforma FORA DO RADAR</span>
                <span className="text-xl">15%</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Exemplo: Se você vender um produto por R$ 100,00, você receberá R$ 55,00. 
                Se a venda vier de um afiliado, ele ganha R$ 30,00 e a plataforma R$ 15,00.
              </p>
            </div>
          </Card>

          {/* Upload Form */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl mb-6">Cadastrar Novo Produto</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  className="mt-2 bg-input border-border"
                  placeholder="Ex: Trap Essentials Vol.1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Tipo de Produto *</Label>
                <Select
                  value={productData.type}
                  onValueChange={(value) => setProductData({ ...productData, type: value })}
                >
                  <SelectTrigger className="mt-2 bg-input border-border">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="drum-kit">Drum Kit</SelectItem>
                    <SelectItem value="beat">Beat</SelectItem>
                    <SelectItem value="melody">Melodia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    className="mt-2 bg-input border-border"
                    placeholder="49.90"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bpm">BPM (opcional)</Label>
                  <Input
                    id="bpm"
                    type="number"
                    value={productData.bpm}
                    onChange={(e) => setProductData({ ...productData, bpm: e.target.value })}
                    className="mt-2 bg-input border-border"
                    placeholder="140"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  className="mt-2 bg-input border-border min-h-[120px]"
                  placeholder="Descreva seu produto em detalhes..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">URL da Imagem *</Label>
                <Input
                  id="image"
                  type="url"
                  value={productData.imageUrl}
                  onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
                  className="mt-2 bg-input border-border"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Cole a URL de uma imagem hospedada (Recomendado: 1000x1000px)
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="mb-2">Antes de enviar:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Certifique-se que possui os direitos autorais do produto</li>
                  <li>✓ Produtos serão analisados antes de serem publicados</li>
                  <li>✓ Mantenha uma descrição clara e honesta</li>
                  <li>✓ Use imagens de alta qualidade</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                <Upload className="size-4 mr-2" />
                Cadastrar Produto
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
