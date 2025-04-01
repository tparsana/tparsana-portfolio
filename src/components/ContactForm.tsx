import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Terminal, Send, Mail, Copy, Trash, Search, FileText } from "lucide-react";
import { sendEmail } from "@/utils/EmailService";

interface ContactFormProps {
  className?: string;
}

type TerminalTheme = "dark" | "light" | "matrix" | "retro";

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState<TerminalTheme>("dark");
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const getThemeClasses = () => {
    switch (terminalTheme) {
      case "light":
        return "bg-gray-100 text-gray-800";
      case "matrix":
        return "bg-black text-green-500";
      case "retro":
        return "bg-amber-950 text-amber-300";
      default:
        return "bg-slate-900 text-gray-300";
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    const newHistory = [...commandHistory, `> ${command}`];
    setCommandHistory(newHistory);
    
    const lowerCommand = command.toLowerCase();
    
    // Process command
    if (lowerCommand === "help" || lowerCommand.includes("help")) {
      setCommandHistory([
        ...newHistory,
        "Available commands:",
        "- help: Show this help message",
        "- clear: Clear the terminal",
        "- email: Start composing an email",
        "- submit: Submit the form",
        "- about: Show information about this terminal",
        "- theme [dark|light|matrix|retro]: Change terminal theme",
        "- echo [text]: Echo text",
        "- date: Display current date and time",
        "- whoami: Display visitor info",
        "- ls: List available sections",
        "- open [section]: Navigate to a section",
        "- contact: Show contact info",
      ]);
    } else if (lowerCommand === "clear" || lowerCommand.includes("clear")) {
      setCommandHistory([]);
    } else if (lowerCommand === "email" || lowerCommand.includes("email")) {
      setCommandHistory([
        ...newHistory,
        "Compose your message below:",
        `Name: ${name || "_______"}`,
        `Email: ${email || "_______"}`,
        `Message: ${message || "_______"}`,
        "",
        "Use 'submit' to send your message once all fields are filled."
      ]);
    } else if (lowerCommand === "submit" || lowerCommand.includes("submit")) {
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
          "Missing fields:",
          !name ? "- Name" : "",
          !email ? "- Email" : "",
          !message ? "- Message" : "",
        ].filter(Boolean));
      }
    } else if (lowerCommand === "about" || lowerCommand.includes("about")) {
      setCommandHistory([
        ...newHistory,
        "Terminal v1.0",
        "Created by Tanish Parsana",
        "A retro-inspired interactive terminal for portfolio website",
        "Type 'help' for available commands"
      ]);
    } else if (lowerCommand.startsWith("theme ")) {
      const requestedTheme = lowerCommand.split(" ")[1] as TerminalTheme;
      if (["dark", "light", "matrix", "retro"].includes(requestedTheme)) {
        setTerminalTheme(requestedTheme);
        setCommandHistory([
          ...newHistory,
          `Theme changed to ${requestedTheme}`
        ]);
      } else {
        setCommandHistory([
          ...newHistory,
          "Invalid theme. Available themes: dark, light, matrix, retro"
        ]);
      }
    } else if (lowerCommand.startsWith("echo ")) {
      const text = command.substring(5);
      setCommandHistory([
        ...newHistory,
        text
      ]);
    } else if (lowerCommand === "date") {
      setCommandHistory([
        ...newHistory,
        new Date().toString()
      ]);
    } else if (lowerCommand === "whoami") {
      setCommandHistory([
        ...newHistory,
        `Visitor from: ${window.navigator.userAgent}`,
        `Language: ${window.navigator.language}`,
        `Screen: ${window.screen.width}x${window.screen.height}`,
      ]);
    } else if (lowerCommand === "ls") {
      setCommandHistory([
        ...newHistory,
        "Available sections:",
        "- home",
        "- about",
        "- projects",
        "- experience",
        "- contact"
      ]);
    } else if (lowerCommand.startsWith("open ")) {
      const section = lowerCommand.split(" ")[1];
      if (["home", "about", "projects", "experience", "contact"].includes(section)) {
        window.location.href = `#${section}`;
        setCommandHistory([
          ...newHistory,
          `Navigating to ${section}...`
        ]);
      } else {
        setCommandHistory([
          ...newHistory,
          `Section '${section}' not found. Use 'ls' to see available sections.`
        ]);
      }
    } else if (lowerCommand === "contact") {
      setCommandHistory([
        ...newHistory,
        "Contact Information:",
        "Email: tanish.parsana2004@gmail.com",
        "GitHub: github.com/tparsana",
        "LinkedIn: linkedin.com/in/tanish-parsana"
      ]);
    } else {
      setCommandHistory([
        ...newHistory,
        `Command not recognized: ${command}`,
        "Type 'help' for available commands.",
      ]);
    }
    
    setCommand("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Send email using our EmailService
      const result = await sendEmail({
        name,
        email,
        message,
        subject: `Portfolio Contact: ${name}`,
      });
      
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Initialize command history
    setCommandHistory([
      "Welcome to the terminal!",
      "Type 'help' for available commands.",
      "> _"
    ]);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [commandHistory]);

  return (
    <div className={cn("space-y-6", className)}>
      <div 
        ref={terminalRef}
        className={cn(
          "border rounded-lg p-4 h-40 md:h-60 overflow-y-auto font-mono text-sm mb-4",
          getThemeClasses()
        )}
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <Terminal className="h-4 w-4" />
          <span className="text-xs">terminal@tanish-portfolio ~ </span>
        </div>
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
            autoComplete="off"
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
          className="w-full relative overflow-hidden group flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          <Send className="h-4 w-4" />
          <span className="group-hover:animate-flap-out inline-block">
            {isSubmitting ? "Sending..." : "Send Message"}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
