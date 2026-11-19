import ringData from "../data/ring.json";
import membersData from "../data/members.json";
import type { Lang } from "./i18n";
import { hostname } from "./banner";

export type Member = {
  name: string;
  url: string;
  feed?: string;
  description?: string;
  languages?: string[];
  banner?: string;
};

export type Ring = {
  name: string;
  description: Record<Lang, string>;
  url: string;
  repo: string;
  slug: string;
};

const errorPrefix = "[webring] Invalid data";

function fail(message: string): never {
  throw new Error(`${errorPrefix}: ${message}`);
}

function requireString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${label} must be a non-empty string`);
  }
  return value;
}

function requireHttps(value: string, label: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return fail(`${label} is not a valid URL: ${value}`);
  }
  if (parsed.protocol !== "https:") {
    fail(`${label} must use https: ${value}`);
  }
  return value;
}

function requireOrigin(value: string, label: string): string {
  requireHttps(value, label);
  const parsed = new URL(value);
  if (parsed.pathname !== "/" || parsed.search !== "" || parsed.hash !== "") {
    fail(`${label} must be a bare origin with no path, query, or fragment: ${value}`);
  }
  return value;
}

function requireTranslations(value: unknown, label: string): Record<Lang, string> {
  if (typeof value !== "object" || value === null) {
    fail(`${label} must be an object with "pt" and "en" strings`);
  }

  const raw = value as Record<string, unknown>;

  return {
    pt: requireString(raw.pt, `${label}.pt`),
    en: requireString(raw.en, `${label}.en`),
  };
}

const knownLanguages = new Intl.DisplayNames(["en"], { type: "language", fallback: "none" });

function canonicalLanguage(code: string): string | undefined {
  try {
    const [canonical] = Intl.getCanonicalLocales(code);
    return knownLanguages.of(canonical) ? canonical : undefined;
  } catch {
    return undefined;
  }
}

function requireLanguages(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${label} must be a non-empty array of language codes`);
  }

  return value.map((entry, index) => {
    const code = requireString(entry, `${label}[${index}]`);
    const canonical = canonicalLanguage(code);

    if (!canonical) {
      fail(`${label}[${index}] is not a known language code: ${code}`);
    }

    return canonical;
  });
}

function validateRing(data: unknown): Ring {
  if (typeof data !== "object" || data === null) {
    fail("ring.json must be an object");
  }
  const raw = data as Record<string, unknown>;
  return {
    name: requireString(raw.name, "ring.name"),
    description: requireTranslations(raw.description, "ring.description"),
    url: requireHttps(requireString(raw.url, "ring.url"), "ring.url"),
    repo: requireHttps(requireString(raw.repo, "ring.repo"), "ring.repo"),
    slug: requireString(raw.slug, "ring.slug"),
  };
}

function validateMembers(data: unknown): Member[] {
  if (!Array.isArray(data)) {
    fail("members.json must be an array");
  }
  if (data.length === 0) {
    fail("members.json must list at least one member");
  }

  const seen = new Map<string, string>();
  return data.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      fail(`member ${index} must be an object`);
    }
    const raw = entry as Record<string, unknown>;
    const label = `member ${index}`;

    const name = requireString(raw.name, `${label}.name`);
    const url = requireOrigin(requireString(raw.url, `${label}.url`), `${label}.url`);

    const host = hostname(url);
    const clash = seen.get(host);
    if (clash) {
      fail(`members "${clash}" and "${name}" share the hostname ${host}`);
    }
    seen.set(host, name);

    const member: Member = { name, url };

    if (raw.feed !== undefined) {
      member.feed = requireHttps(requireString(raw.feed, `${label}.feed`), `${label}.feed`);
    }
    if (raw.description !== undefined) {
      member.description = requireString(raw.description, `${label}.description`);
    }
    if (raw.languages !== undefined) {
      member.languages = requireLanguages(raw.languages, `${label}.languages`);
    }
    if (raw.banner !== undefined) {
      member.banner = requireHttps(requireString(raw.banner, `${label}.banner`), `${label}.banner`);
    }
    return member;
  });
}

export const ring = validateRing(ringData);
export const members = validateMembers(membersData);

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const left = base.endsWith("/") ? base.slice(0, -1) : base;
  const right = path.startsWith("/") ? path : `/${path}`;
  return `${left}${right}`;
}

function stableHash(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function stableOther(seed: string, selfIndex: number): Member {
  if (members.length === 1) {
    return members[0];
  }
  let index = stableHash(seed) % (members.length - 1);
  if (index >= selfIndex) {
    index++;
  }
  return members[index];
}

export function stableAny(seed: string): Member {
  return members[stableHash(seed) % members.length];
}

export function neighbour(index: number, hop: "next" | "prev"): Member {
  const count = members.length;
  const step = hop === "next" ? 1 : -1;
  return members[(index + step + count) % count];
}

export function otherUrls(selfIndex: number): string[] {
  return members.filter((_, i) => i !== selfIndex).map((member) => member.url);
}
