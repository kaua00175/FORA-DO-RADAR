import { useState } from "react";
import { DollarSign, Package, TrendingUp, Edit, Trash2, Eye } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { User, Page } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SellerDashboardProps {
  user: User | null;
  onNavigate: (page: Page) => void;
}

type SellerProduct = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  sales: number;
  revenue: number;
  image: string;
};

const MOCK_SELLER_PRODUCTS: SellerProduct[] = [
  {
    id: "1",
    name: "My Trap Kit Vol.1",
    type: "Drum Kit",
    price: 39.90,
    status: "approved",
    sales: 45,
    revenue: 989.55, // 45 * 39.90 * 0.55
    image: "https://images.unsplash.com/photo-1725016935000-3a9661531f59?w=200",
  },
  {
    id: "2",
    name: "Dark Melody Loop",
    type: "Melodia",
    price: 24.90,
    status: "approved",
    sales: 28,
    revenue: 383.46, // 28 * 24.90 * 0.55
    image: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?w=200",
  },
  {
    id: "3",
    name: "Hard Beat #5",
    type: "Beat",
    price: 79.90,
    status: "pending",
    sales: 0,
    revenue: 0,
    image: "https://images.unsplash.com/photo-1688591677634-58dfdc60d62d?w=200",
  },
];

export function SellerDashboard({ user, onNavigate }: SellerDashboardProps) {
  if (!user || !user.isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 bg-card border-border text-center max-w-md">
          <Package className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl mb-4">Acesso Negado</h2>
          <p className="text-muted-foreground mb-6">
            Você precisa ser um vendedor para acessar esta página
          </p>
          <Button
            onClick={() => onNavigate("sell")}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Tornar-se Vendedor
          </Button>
        </Card>
      </div>
    );
  }

  const totalRevenue = MOCK_SELLER_PRODUCTS.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = MOCK_SELLER_PRODUCTS.reduce((sum, p) => sum + p.sales, 0);
  const activeProducts = MOCK_SELLER_PRODUCTS.filter(p => p.status === "approved").length;

  const getStatusBadge = (status: SellerProduct["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aprovado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Pendente</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Rejeitado</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl mb-2">Painel de Vendedor</h1>
            <p className="text-muted-foreground">Gerencie seus produtos e acompanhe suas vendas</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-card border-border">
              <DollarSign className="size-8 mb-3 text-muted-foreground" />
              <p className="text-2xl mb-1">R$ {totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Receita Total (55%)</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <TrendingUp className="size-8 mb-3 text-muted-foreground" />
              <p className="text-2xl mb-1">{totalSales}</p>
              <p className="text-sm text-muted-foreground">Total de Vendas</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <Package className="size-8 mb-3 text-muted-foreground" />
              <p className="text-2xl mb-1">{activeProducts}</p>
              <p className="text-sm text-muted-foreground">Produtos Ativos</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <Eye className="size-8 mb-3 text-muted-foreground" />
              <p className="text-2xl mb-1">1,234</p>
              <p className="text-sm text-muted-foreground">Visualizações</p>
            </Card>
          </div>

          {/* Commission Info */}
          <Card className="p-6 bg-card border-border mb-8">
            <h3 className="text-lg mb-3">Distribuição de Receita</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl mb-1">55%</p>
                <p className="text-sm text-muted-foreground">Você</p>
              </div>
              <div>
                <p className="text-2xl mb-1">30%</p>
                <p className="text-sm text-muted-foreground">Afiliados</p>
              </div>
              <div>
                <p className="text-2xl mb-1">15%</p>
                <p className="text-sm text-muted-foreground">Plataforma</p>
              </div>
            </div>
          </Card>

          {/* Products Table */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">Meus Produtos</h2>
            <Button
              onClick={() => onNavigate("sell")}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Package className="size-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead>Produto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vendas</TableHead>
                  <TableHead>Receita (55%)</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SELLER_PRODUCTS.map((product) => (
                  <TableRow key={product.id} className="border-border hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="size-12 object-cover rounded"
                        />
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>R$ {product.revenue.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Edit className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-muted">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
