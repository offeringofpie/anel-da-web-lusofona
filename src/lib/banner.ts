type Hop = "prev" | "next" | "random";

type Banner = {
  ringUrl: string;
  ringName: string;
  host: string;
};

const hops: Record<Hop, { symbol: string; label: string }> = {
  prev: { symbol: "&larr;", label: "Anterior" },
  next: { symbol: "&rarr;", label: "Seguinte" },
  random: { symbol: "?", label: "Aleat&oacute;rio" },
};

export function hostname(url: string): string {
  return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
}

export function siteOrigin(value: string): string | undefined {
  const url = value.includes("://") ? value : `https://${value}`;

  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

function toEntities(text: string): string {
  return text.replace(/[^\x00-\x7F]/gu, (char) => {
    return `&#x${char.codePointAt(0)!.toString(16).toUpperCase()};`;
  });
}

function hopLink(ringUrl: string, host: string, hop: Hop): string {
  const { symbol, label } = hops[hop];

  return `  <a class="hop" href="${ringUrl}from/${host}/${hop}/" aria-label="${label}" title="${label}">${symbol}</a>`;
}

export function bannerSnippet({ ringUrl, ringName, host }: Banner): string {
  const name = toEntities(ringName);
  const lines = [
    `<link rel="stylesheet" href="${ringUrl}banner.css">`,
    `<nav class="webring" lang="pt-PT" aria-label="${name}">`,
    hopLink(ringUrl, host, "prev"),
    `  <a class="home" href="${ringUrl}">${name}</a>`,
    hopLink(ringUrl, host, "next"),
    hopLink(ringUrl, host, "random"),
    "</nav>",
  ];

  return lines.join("\n");
}
