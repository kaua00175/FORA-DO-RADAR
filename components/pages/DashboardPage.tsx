import { ShoppingBag, Download, Star, Package } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { User, Page } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DashboardPageProps {
  user: User | null;
  onNavigate: (page: Page) => void;
}

type Purchase = {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  purchaseDate: string;
  downloadLink: string;
};

const MOCK_PURCHASES: Purchase[] = [
  {
    id: "1",
    productName: "FORA DO RADAR Vol.1",
    productImage: "https://images.unsplash.com/photo-1725016935000-3a9661531f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBiYXNzfGVufDF8fHx8MTc2MzUyNzY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 49.90,
    purchaseDate: "2025-11-15",
    downloadLink: "#",
  },
  {
    id: "2",
    productName: "Street Beat #1",
    productImage: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NjM1Mjc2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 99.90,
    purchaseDate: "2025-11-10",
    downloadLink: "#",
  },
];

export function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 bg-zinc-900 border-white/10 text-center max-w-md">
          <Package className="size-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl mb-4">Acesso Negado</h2>
          <p className="text-gray-400 mb-6">
            Você precisa estar logado para acessar o dashboard
          </p>
          <Button
            onClick={() => onNavigate("login")}
            className="bg-white text-black hover:bg-gray-200"
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl mb-2">Dashboard</h1>
            <p className="text-gray-400">Bem-vindo de volta, {user.name}!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-zinc-900 border-white/10">
              <ShoppingBag className="size-8 mb-3 text-gray-400" />
              <p className="text-2xl mb-1">2</p>
              <p className="text-sm text-gray-400">Compras Realizadas</p>
            </Card>

            <Card className="p-6 bg-zinc-900 border-white/10">
              <Download className="size-8 mb-3 text-gray-400" />
              <p className="text-2xl mb-1">8</p>
              <p className="text-sm text-gray-400">Downloads</p>
            </Card>

            <Card className="p-6 bg-zinc-900 border-white/10">
              <Star className="size-8 mb-3 text-gray-400" />
              <p className="text-2xl mb-1">1</p>
              <p className="text-sm text-gray-400">Avaliações Pendentes</p>
            </Card>

            <Card className="p-6 bg-zinc-900 border-white/10">
              <Package className="size-8 mb-3 text-gray-400" />
              <p className="text-2xl mb-1">R$ 149,80</p>
              <p className="text-sm text-gray-400">Total Gasto</p>
            </Card>
          </div>

          {/* My Products */}
          <section>
            <h2 className="text-2xl mb-6">Meus Produtos</h2>
            
            <div className="space-y-4">
              {MOCK_PURCHASES.map((purchase) => (
                <Card key={purchase.id} className="p-6 bg-zinc-900 border-white/10">
                  <div className="flex items-center gap-6">
                    <ImageWithFallback
                      src={purchase.productImage}
                      alt={purchase.productName}
                      className="size-20 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{purchase.productName}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Comprado em {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-lg">R$ {purchase.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="bg-white text-black hover:bg-gray-200">
                        <Download className="size-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="border-white/20">
                        <Star className="size-4 mr-2" />
                        Avaliar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {MOCK_PURCHASES.length === 0 && (
              <Card className="p-12 bg-zinc-900 border-white/10 text-center">
                <Package className="size-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-4">Você ainda não possui produtos</p>
                <Button
                  onClick={() => onNavigate("products")}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Explorar Produtos
                </Button>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
