import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

export async function fetchJobsFromUrl(feedUrl: string) {
  const { data } = await axios.get(feedUrl);
  const parsed = parser.parse(data);
  return parsed.rss.channel.item || [];
}
