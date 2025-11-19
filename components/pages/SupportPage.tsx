import { useState } from "react";
import { MessageSquare, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { User } from "../../App";
import { toast } from "sonner@2.0.3";

interface SupportPageProps {
  user: User | null;
}

type Ticket = {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  lastUpdate: string;
};

const MOCK_TICKETS: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Problema com download do produto",
    status: "in-progress",
    createdAt: "2025-11-18",
    lastUpdate: "2025-11-19",
  },
  {
    id: "TKT-002",
    subject: "Dúvida sobre licenciamento",
    status: "resolved",
    createdAt: "2025-11-15",
    lastUpdate: "2025-11-16",
  },
];

const FAQ_ITEMS = [
  {
    question: "Como faço o download dos produtos após a compra?",
    answer: "Após a confirmação do pagamento, você receberá um e-mail com o link de download. Os arquivos também ficam disponíveis na sua área de 'Meus Produtos' no dashboard.",
  },
  {
    question: "Posso usar os beats para fins comerciais?",
    answer: "Sim! Todos os nossos produtos incluem licença para uso comercial. Você pode usar em suas músicas, lançar em plataformas de streaming e monetizar seu conteúdo.",
  },
  {
    question: "Como funciona o programa de afiliados?",
    answer: "Afiliados ganham 30% de comissão em cada venda realizada através do seu link personalizado. Após aprovação, você recebe acesso ao dashboard de afiliado com estatísticas e materiais de divulgação.",
  },
  {
    question: "Qual o prazo para aprovação como afiliado?",
    answer: "Analisamos todas as inscrições em até 48 horas úteis. Você receberá um e-mail com a resposta e, se aprovado, seu código de afiliado será ativado imediatamente.",
  },
  {
    question: "Posso solicitar reembolso?",
    answer: "Oferecemos garantia de 7 dias. Se não estiver satisfeito com o produto, entre em contato com nosso suporte para solicitar o reembolso.",
  },
  {
    question: "Os produtos são compatíveis com qual DAW?",
    answer: "Nossos drum kits e loops são fornecidos em formato WAV e são compatíveis com todas as DAWs (FL Studio, Ableton, Logic Pro, etc.).",
  },
];

export function SupportPage({ user }: SupportPageProps) {
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    message: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Você precisa estar logado para abrir um ticket");
      return;
    }
    
    toast.success("Ticket criado com sucesso!", {
      description: "Nossa equipe responderá em até 24 horas.",
    });
    
    setNewTicket({ subject: "", category: "", message: "" });
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Aberto</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Em Andamento</Badge>;
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Resolvido</Badge>;
      case "closed":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Fechado</Badge>;
    }
  };

  const filteredFAQ = FAQ_ITEMS.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-4">Suporte</h1>
          <p className="text-gray-400 text-lg mb-12">
            Estamos aqui para ajudar você
          </p>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl mb-6">Perguntas Frequentes</h2>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar nas perguntas frequentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-white/10"
                />
              </div>
            </div>

            <Card className="bg-zinc-900 border-white/10">
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                    <AccordionTrigger className="px-6 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {filteredFAQ.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                Nenhuma pergunta encontrada
              </p>
            )}
          </section>

          {/* My Tickets */}
          {user && (
            <section className="mb-12">
              <h2 className="text-2xl mb-6">Meus Tickets</h2>
              
              <div className="space-y-4">
                {MOCK_TICKETS.map((ticket) => (
                  <Card key={ticket.id} className="p-6 bg-zinc-900 border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg">{ticket.subject}</h3>
                          {getStatusBadge(ticket.status)}
                        </div>
                        <p className="text-sm text-gray-400">Ticket #{ticket.id}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/10">
                        Ver Detalhes
                      </Button>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400">
                      <span>Criado: {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                      <span>Última atualização: {new Date(ticket.lastUpdate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Create New Ticket */}
          <section>
            <h2 className="text-2xl mb-6">Abrir Novo Ticket</h2>
            
            <Card className="p-8 bg-zinc-900 border-white/10">
              {!user ? (
                <div className="text-center py-8">
                  <MessageSquare className="size-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400 mb-4">
                    Você precisa estar logado para abrir um ticket de suporte
                  </p>
                  <Button variant="outline" className="border-white/20">
                    Fazer Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-6">
                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="mt-2 bg-zinc-800 border-white/10"
                      placeholder="Descreva brevemente seu problema"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger className="mt-2 bg-zinc-800 border-white/10">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        <SelectItem value="download">Problemas com Download</SelectItem>
                        <SelectItem value="payment">Pagamento</SelectItem>
                        <SelectItem value="license">Licenciamento</SelectItem>
                        <SelectItem value="affiliate">Programa de Afiliados</SelectItem>
                        <SelectItem value="technical">Suporte Técnico</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      className="mt-2 bg-zinc-800 border-white/10 min-h-[150px]"
                      placeholder="Descreva seu problema em detalhes..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                    <MessageSquare className="size-4 mr-2" />
                    Enviar Ticket
                  </Button>
                  
                  <p className="text-sm text-gray-400 text-center">
                    Nossa equipe responderá em até 24 horas úteis
                  </p>
                </form>
              )}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
