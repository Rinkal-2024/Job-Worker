import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

export const parseXml = (xml: string) => {
  const json = parser.parse(xml);
  return json?.rss?.channel?.item || [];
};