import React, { useEffect, useRef, useState } from "react";

interface Props {
  force?: boolean;
}

export const PWAInstallPrompt: React.FC<Props> = ({ force = false }) => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(force);

  useEffect(() => {
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      const isInstalled = localStorage.getItem("pwa-is-installed") === "true";
      if (force || !isInstalled) {
        deferredPrompt.current = e as BeforeInstallPromptEvent;
        setShowPrompt(true);
      }
    };

    if (!force) {
      window.addEventListener("beforeinstallprompt", handlePrompt);
      return () =>
        window.removeEventListener("beforeinstallprompt", handlePrompt);
    } else {
      setShowPrompt(true);
    }
  }, [force]);

  const installPWA = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const choiceResult = await deferredPrompt.current.userChoice;
      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("pwa-is-installed", "true");
      }
    }
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;
  if (document.location.pathname === "" || document.location.pathname === "/")
    return null;

  return (
    <div className="fixed top-4 right-4 z-[99999] w-full max-w-xs">
      <div className="bg-base-100 border border-base-300 shadow-xl rounded-xl p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-semibold text-base-content text-sm">
            Instala esta aplicación
          </h2>
          <button
            onClick={dismissPrompt}
            className="btn btn-xs btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-base-content/80 mb-4">
          Instala la app para un acceso más rápido y cómodo
        </p>
        <button onClick={installPWA} className="btn btn-primary btn-sm w-full">
          Instalar
        </button>
      </div>
    </div>
  );
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
