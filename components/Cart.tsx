import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import type { CartItem } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  total: number;
}

export function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity, total }: CartProps) {
  const handleCheckout = () => {
    toast.success("Pedido finalizado!", {
      description: "Você será redirecionado para o pagamento.",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-background border-border w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingBag className="size-16 text-muted mb-4" />
            <p className="text-muted-foreground mb-2">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">
              Adicione produtos para começar suas compras
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="size-20 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate mb-1">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      R$ {item.product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 border-border hover:bg-muted"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 border-border hover:bg-muted"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-muted"
                    onClick={() => onRemove(item.product.id)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <Separator className="bg-border" />
                <div className="flex justify-between text-xl">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                size="lg"
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}