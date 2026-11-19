import type { Lang } from "./i18n";

export type Example = {
  name: string;
  site: string;
  description: string;
};

export const examples: Record<Lang, Example> = {
  pt: {
    name: "O teu site",
    site: "https://www.exemplo.com",
    description: "Descrição do teu site.",
  },
  en: {
    name: "Your Site",
    site: "https://www.example.com",
    description: "Description of your site.",
  },
};

export function memberSnippet({ name, site, description }: Example): string {
  return `{
  "name": "${name}",
  "url": "${site}",
  "feed": "${site}/feed.xml",
  "description": "${description}",
  "languages": ["pt", "en"],
  "banner": "${site}/88x31.png"
}`;
}
