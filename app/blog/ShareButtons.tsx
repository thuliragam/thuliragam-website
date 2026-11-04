
"use client";

export default function ShareButtons({ title }: { title: string }) {
  const share = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    let shareUrl = "";

    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Article link copied!");
    } catch {
      alert("Unable to copy link.");
    }
  }

  return (
    <section className="my-12 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-emerald-950">
        Share this article
      </h2>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => share("whatsapp")} className="rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white">
          WhatsApp
        </button>

        <button onClick={() => share("facebook")} className="rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white">
          Facebook
        </button>

        <button onClick={() => share("linkedin")} className="rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white">
          LinkedIn
        </button>

        <button onClick={copyLink} className="rounded-full bg-gray-800 px-5 py-3 text-sm font-semibold text-white">
          Copy Link
        </button>
      </div>
    </section>
  );
}