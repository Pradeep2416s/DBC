import React from 'react';
import { X, QrCode, Share2, Check } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { BrandLogo } from './BrandLogo';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://drinkbitecafe.com';
  // Use a reliable QR code generator image URL with the current page URL
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    currentUrl
  )}&color=000000&bgcolor=ffffff&margin=2`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: RESTAURANT_CONFIG.name,
          text: `${RESTAURANT_CONFIG.name} Digital Menu: ${RESTAURANT_CONFIG.tagline}`,
          url: currentUrl,
        });
      } catch {
        // Share cancelled or unavailable
      }
    } else {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-center relative shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-3">
          <BrandLogo size="lg" withGlow />
        </div>

        <h3 className="font-heading font-black text-xl text-neutral-100 uppercase tracking-tight">
          Table QR Code
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Scan with your phone camera to open this digital menu instantly at your table.
        </p>

        {/* QR Code frame */}
        <div className="my-5 p-4 bg-white rounded-2xl inline-block shadow-inner">
          <img
            src={qrImageUrl}
            alt={`${RESTAURANT_CONFIG.name} QR Code`}
            className="w-52 h-52 mx-auto rounded"
            width={208}
            height={208}
          />
        </div>

        <p className="text-[11px] text-amber-400/90 font-medium mb-4">
          {RESTAURANT_CONFIG.name} • {RESTAURANT_CONFIG.tagline}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Share Menu Link'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
