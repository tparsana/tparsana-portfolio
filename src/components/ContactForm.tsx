
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    const newHistory = [...commandHistory, `> ${command}`];
    setCommandHistory(newHistory);
    
    // Process command
    if (command.toLowerCase().includes("help")) {
      setCommandHistory([
        ...newHistory,
        "Available commands:",
        "- help: Show this help message",
        "- clear: Clear the terminal",
        "- email: Start composing an email",
        "- submit: Submit the form",
      ]);
    } else if (command.toLowerCase().includes("clear")) {
      setCommandHistory([]);
    } else if (command.toLowerCase().includes("email")) {
      setCommandHistory([
        ...newHistory,
        "Compose your message below:",
        "Name: _______",
        "Email: _______",
        "Message: _______",
      ]);
    } else if (command.toLowerCase().includes("submit")) {
      if (name && email && message) {
        handleSubmit();
        setCommandHistory([
          ...newHistory,
          "Submitting your message...",
          "Message sent successfully!",
        ]);
      } else {
        setCommandHistory([
          ...newHistory,
          "Error: Please fill out all fields before submitting.",
        ]);
      }
    } else {
      setCommandHistory([
        ...newHistory,
        `Command not recognized: ${command}`,
        "Type 'help' for available commands.",
      ]);
    }
    
    setCommand("");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    // Initialize command history
    setCommandHistory([
      "Welcome to the terminal!",
      "Type 'help' for available commands.",
      "> _"
    ]);
  }, []);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-muted/40 border rounded-lg p-4 h-40 md:h-60 overflow-y-auto font-mono text-sm mb-4">
        {commandHistory.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}
        <form onSubmit={handleCommandSubmit} className="flex gap-2 mt-2">
          <span>&gt;</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-transparent flex-grow focus:outline-none terminal-text"
            aria-label="Command input"
          />
        </form>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="split-flap-display"
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="split-flap-display"
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="split-flap-display min-h-[120px]"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full relative overflow-hidden group"
          disabled={isSubmitting}
        >
          <span className="group-hover:animate-flap-out inline-block">
            {isSubmitting ? "Sending..." : "Send Message"}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
