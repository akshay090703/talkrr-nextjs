"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Image, FileText, Users } from "lucide-react";
import { ModeToggle } from "@/components/ToggleTheme";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 text-foreground transition-all duration-300">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <ModeToggle />
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-88px)]">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center animate-fade-in-up">
          Connect Instantly
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl animate-fade-in-up animation-delay-200">
          Experience seamless communication with Talkrr's real-time chat and
          sharing features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full max-w-5xl animate-fade-in-up animation-delay-400">
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8" />}
            title="Real-time Chat"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Group Chats"
          />
          <FeatureCard
            icon={<Image className="w-8 h-8" />}
            title="Photo Sharing"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="File Sharing"
          />
        </div>

        <Link href="/auth" className="animate-fade-in-up animation-delay-600">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full transition-transform hover:scale-105"
            onClick={() => router.push("/auth")}
          >
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <div className="p-6 bg-card rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-center mb-4 text-primary">{icon}</div>
      <h2 className="text-xl font-semibold text-center">{title}</h2>
    </div>
  );
}
