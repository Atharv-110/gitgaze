import Image from "next/image";
import { JSX } from "react";

export const ParseEmoji = ({
  emoji,
  size = 14,
}: {
  emoji?: string | null;
  size?: number;
}): JSX.Element | null => {
  if (!emoji) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(emoji, "text/html");
  const img = doc.querySelector("img");
  const text = doc.body.textContent?.trim();

  if (img) {
    return (
      <Image
        src={img.getAttribute("src") ?? ""}
        alt={img.getAttribute("alt") ?? "emoji"}
        title={img.getAttribute("title") ?? ""}
        width={size}
        height={size}
        className="inline-block align-middle"
      />
    );
  }

  if (text) {
    return <span style={{ fontSize: size - 1 }}>{text}</span>;
  }

  return null;
};
