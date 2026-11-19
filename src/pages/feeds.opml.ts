import type { APIRoute } from "astro";
import { members, ring } from "../lib/members";

const contentType = "text/x-opml; charset=utf-8";

const xmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    return xmlEntities[char];
  });
}

export const GET: APIRoute = () => {
  const outlines = members.flatMap((member) => {
    if (!member.feed) {
      return [];
    }

    const name = escapeXml(member.name);

    return [`    <outline type="rss" text="${name}" title="${name}" xmlUrl="${escapeXml(member.feed)}" htmlUrl="${escapeXml(member.url)}"/>`];
  });

  const opml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<opml version="2.0">`,
    `  <head>`,
    `    <title>${escapeXml(ring.name)}</title>`,
    `  </head>`,
    `  <body>`,
    ...outlines,
    `  </body>`,
    `</opml>`,
    "",
  ].join("\n");

  return new Response(opml, { headers: { "Content-Type": contentType } });
};
