
"use client";

import { useEffect, useState } from "react";

export default function IntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("thuliragam-intro-seen") === "yes") {
      setShowIntro(false);
    }
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem("thuliragam-intro-seen", "yes");
    setShowIntro(false);
  };

  return (
    <>
      {children}

      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-[#064E3B]">
          <video
            className="h-full w-full object-cover"
            src="/videos/thuliragam-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finishIntro}
            onError={finishIntro}
          />

          <button
            onClick={finishIntro}
            className="absolute bottom-8 right-8 rounded-full border border-white/70 bg-black/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-[#064E3B]"
          >
            Skip Intro →
          </button>
        </div>
      )}
    </>
  );
}
