import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { HomePage } from "./components/pages/HomePage";
import { ProductsPage } from "./components/pages/ProductsPage";
import { AffiliatePage } from "./components/pages/AffiliatePage";
import { SupportPage } from "./components/pages/SupportPage";
import { LoginPage } from "./components/pages/LoginPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { SellerPage } from "./components/pages/SellerPage";
import { SellerDashboard } from "./components/pages/SellerDashboard";
import { Cart } from "./components/Cart";
import { Toaster } from "./components/ui/sonner";

export type Product = {
  id: string;
  name: string;
  type: "drum-kit" | "beat" | "melody";
  price: number;
  image: string;
  description: string;
  bpm?: number;
  audioPreview?: string;
  rating?: number;
  reviewsCount?: number;
  sellerId?: string;
  sellerName?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAffiliate: boolean;
  isSeller: boolean;
  affiliateCode?: string;
};

export type Page = "home" | "products" | "affiliate" | "support" | "login" | "dashboard" | "sell" | "seller-dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "products":
        return <ProductsPage onAddToCart={addToCart} user={user} />;
      case "affiliate":
        return <AffiliatePage user={user} />;
      case "support":
        return <SupportPage user={user} />;
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case "dashboard":
        return <DashboardPage user={user} onNavigate={setCurrentPage} />;
      case "sell":
        return <SellerPage user={user} onNavigate={setCurrentPage} />;
      case "seller-dashboard":
        return <SellerDashboard user={user} onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
          onLogout={handleLogout}
        />
        <main className="pt-16">
          {renderPage()}
        </main>
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          total={cartTotal}
        />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
