'use client';

import { Facebook, Twitter, Link as LinkIcon, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description = '' }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={shareToFacebook}
        className="p-2 border border-black/10 text-black/60 hover:text-black hover:border-black/30 transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <button
        onClick={shareToTwitter}
        className="p-2 border border-black/10 text-black/60 hover:text-black hover:border-black/30 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <button
        onClick={shareViaEmail}
        className="p-2 border border-black/10 text-black/60 hover:text-black hover:border-black/30 transition-colors"
        title="Share via Email"
      >
        <Mail className="w-4 h-4" strokeWidth={1.5} />
      </button>
      <button
        onClick={copyLink}
        className="p-2 border border-black/10 text-black/60 hover:text-black hover:border-black/30 transition-colors"
        title="Copy Link"
      >
        <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}


