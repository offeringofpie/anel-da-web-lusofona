import { withBase } from "./members";

export type Lang = "pt" | "en";
export type Page = "home" | "members" | "rules" | "join";

type Locale = {
  htmlLang: string;
  name: string;
};

export const langs: Lang[] = ["pt", "en"];

export const locales: Record<Lang, Locale> = {
  pt: { htmlLang: "pt-PT", name: "Português" },
  en: { htmlLang: "en", name: "English" },
};

const paths: Record<Page, Record<Lang, string>> = {
  home: { pt: "/", en: "/en/" },
  members: { pt: "/membros/", en: "/en/members/" },
  rules: { pt: "/regras/", en: "/en/rules/" },
  join: { pt: "/aderir/", en: "/en/join/" },
};

export function route(page: Page, lang: Lang): string {
  return withBase(paths[page][lang]);
}
