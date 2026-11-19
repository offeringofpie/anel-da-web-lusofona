import { ring } from "./members";

export const ringUrl = `${ring.url.replace(/\/$/, "")}/`;
export const badgeWidth = 88;
export const badgeHeight = 31;
export const barSnippet = `<a href="${ringUrl}"><img src="${ringUrl}pt.gif" alt="${ring.name}" width="${badgeWidth}" height="${badgeHeight}"></a>`;
