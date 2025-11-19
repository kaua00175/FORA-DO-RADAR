import { ArrowRight, Music2, Users, Headphones } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { Page } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NjM1Mjc2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Music Studio"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            FORA DO RADAR
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Drum Kits, Beats e Melodias Premium para Produtores Profissionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={() => onNavigate("products")}
            >
              Explorar Produtos
              <ArrowRight className="size-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted"
              onClick={() => onNavigate("affiliate")}
            >
              Programa de Afiliados
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border text-center">
              <Music2 className="size-12 mx-auto mb-4" />
              <h3 className="text-3xl mb-2">50+</h3>
              <p className="text-muted-foreground">Produtos Premium</p>
            </Card>
            <Card className="p-8 bg-card border-border text-center">
              <Headphones className="size-12 mx-auto mb-4" />
              <h3 className="text-3xl mb-2">1000+</h3>
              <p className="text-muted-foreground">Produtores Ativos</p>
            </Card>
            <Card className="p-8 bg-card border-border text-center">
              <Users className="size-12 mx-auto mb-4" />
              <h3 className="text-3xl mb-2">30%</h3>
              <p className="text-muted-foreground">Comissão de Afiliado</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">FORA DO RADAR Vol.1</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Nosso drum kit principal com sons cuidadosamente selecionados para trap e rap. 
                808s pesados, snares crispy, hi-hats variados e muito mais.
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl">R$ 49,90</span>
                <span className="text-muted-foreground line-through">R$ 79,90</span>
              </div>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
                onClick={() => onNavigate("products")}
              >
                Ver Detalhes
              </Button>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1725016935000-3a9661531f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwc291bmQlMjBiYXNzfGVufDF8fHx8MTc2MzUyNzY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Featured Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}