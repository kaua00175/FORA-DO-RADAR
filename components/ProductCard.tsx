import { ShoppingCart, Play, Music2, Drum, Star } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import type { Product, User } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  user: User | null;
}

export function ProductCard({ product, onAddToCart, user }: ProductCardProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const getTypeIcon = () => {
    switch (product.type) {
      case "drum-kit":
        return <Drum className="size-4" />;
      case "beat":
        return <Play className="size-4" />;
      case "melody":
        return <Music2 className="size-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (product.type) {
      case "drum-kit":
        return "Drum Kit";
      case "beat":
        return "Beat";
      case "melody":
        return "Melodia";
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: `R$ ${product.price.toFixed(2)}`,
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para avaliar");
      return;
    }
    
    toast.success("Avaliação enviada para aprovação!", {
      description: "Nossa equipe irá analisar em breve.",
    });
    
    setIsReviewOpen(false);
    setReview({ rating: 5, comment: "" });
  };

  return (
    <>
      <Card className="bg-card border-border overflow-hidden group hover:border-foreground/20 transition-colors">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Button
            size="icon"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background hover:bg-foreground/90 rounded-full size-14"
          >
            <Play className="size-6 fill-background" />
          </Button>

          <Badge className="absolute top-3 right-3 bg-card/90 border-border">
            <span className="flex items-center gap-1">
              {getTypeIcon()}
              {getTypeLabel()}
            </span>
          </Badge>
        </div>

        <div className="p-5">
          <h3 className="text-lg mb-2 line-clamp-1">{product.name}</h3>
          
          {product.rating && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-foreground text-foreground" />
                <span className="text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewsCount} avaliações)
              </span>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          {product.bpm && (
            <div className="text-xs text-muted-foreground mb-3">
              BPM: {product.bpm}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <p className="text-2xl">R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-border hover:bg-muted"
                onClick={() => setIsReviewOpen(true)}
              >
                <Star className="size-4" />
              </Button>
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="size-4 mr-2" />
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="bg-popover border-border">
          <DialogHeader>
            <DialogTitle>Avaliar Produto</DialogTitle>
          </DialogHeader>
          
          {!user ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Você precisa estar logado para avaliar produtos
              </p>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Fazer Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label>Nota</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReview({ ...review, rating: star })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`size-8 ${
                          star <= review.rating
                            ? "fill-foreground text-foreground"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Comentário (opcional)</Label>
                <Textarea
                  id="comment"
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  className="mt-2 bg-input border-border"
                  placeholder="Compartilhe sua experiência com este produto..."
                />
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ⚠️ Sua avaliação será analisada por nossa equipe antes de ser publicada. 
                  Este processo ajuda a garantir avaliações autênticas e de qualidade.
                </p>
              </div>
              
              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                Enviar Avaliação
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}