import { useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Product, User } from "../../App";
import { ProductCard } from "../ProductCard";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "FORA DO RADAR Vol.1",
    type: "drum-kit",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1725016935000-3a9661531f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBiYXNzfGVufDF8fHx8MTc2MzUyNzY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Drum kit completo com 808s pesados, snares crispy e hi-hats variados. Perfeito para trap e rap moderno.",
    rating: 4.8,
    reviewsCount: 124,
  },
  {
    id: "2",
    name: "Dark Vibes Kit",
    type: "drum-kit",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NjM1Mjc2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Sons escuros e atmosféricos para criar batidas pesadas de trap.",
    rating: 4.6,
    reviewsCount: 89,
  },
  {
    id: "3",
    name: "Trap Essentials",
    type: "drum-kit",
    price: 44.90,
    image: "https://images.unsplash.com/photo-1688591677634-58dfdc60d62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMGRhbmNpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NjM1Mjc2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Kit essencial com todos os sons necessários para começar suas produções.",
    rating: 4.7,
    reviewsCount: 156,
  },
  {
    id: "4",
    name: "Street Beat #1",
    type: "beat",
    price: 99.90,
    bpm: 140,
    image: "https://images.unsplash.com/photo-1725016935000-3a9661531f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBiYXNzfGVufDF8fHx8MTc2MzUyNzY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Beat pronto para uso com 808 pesado e melodia envolvente.",
    rating: 4.9,
    reviewsCount: 78,
  },
  {
    id: "5",
    name: "Midnight Trap",
    type: "beat",
    price: 89.90,
    bpm: 145,
    image: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NjM1Mjc2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Atmosfera noturna com vibes obscuras. Perfeito para trap melódico.",
    rating: 4.8,
    reviewsCount: 92,
  },
  {
    id: "6",
    name: "Hard Drill Type",
    type: "beat",
    price: 119.90,
    bpm: 150,
    image: "https://images.unsplash.com/photo-1688591677634-58dfdc60d62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMGRhbmNpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NjM1Mjc2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Beat agressivo estilo drill com hi-hats rápidos e 808 distorcido.",
    rating: 5.0,
    reviewsCount: 64,
  },
  {
    id: "7",
    name: "Melodic Loop #1",
    type: "melody",
    price: 29.90,
    bpm: 140,
    image: "https://images.unsplash.com/photo-1725016935000-3a9661531f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBiYXNzfGVufDF8fHx8MTc2MzUyNzY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Melodia emotiva pronta para adicionar às suas produções.",
    rating: 4.5,
    reviewsCount: 45,
  },
  {
    id: "8",
    name: "Space Keys",
    type: "melody",
    price: 34.90,
    bpm: 135,
    image: "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NjM1Mjc2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Melodia espacial com keys atmosféricos e pads envolventes.",
    rating: 4.7,
    reviewsCount: 58,
  },
  {
    id: "9",
    name: "Guitar Trap Loop",
    type: "melody",
    price: 39.90,
    bpm: 142,
    image: "https://images.unsplash.com/photo-1688591677634-58dfdc60d62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMGRhbmNpbmclMjBwYXJ0eXxlbnwxfHx8fDE3NjM1Mjc2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Loop de guitarra processado, perfeito para trap melódico.",
    rating: 4.6,
    reviewsCount: 71,
  },
];

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
  user: User | null;
}

export function ProductsPage({ onAddToCart, user }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || product.type === activeTab;
    return matchesSearch && matchesTab;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // popular (default order)
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl mb-8 text-center">Produtos</h1>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar drum kits, beats, melodias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-card border-border focus:border-foreground/40 rounded-full"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
                <TabsTrigger value="all" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="drum-kit" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Kits
                </TabsTrigger>
                <TabsTrigger value="beat" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Beats
                </TabsTrigger>
                <TabsTrigger value="melody" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
                  Melodias
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
                <SlidersHorizontal className="size-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="popular">Mais Popular</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}