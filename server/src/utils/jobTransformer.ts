export const transformJob = (item: any) => ({
  jobId: item.guid || item.link,
  title: item.title,
  company: item["job:company"] || "",
  location: item["job:location"] || "",
  description: item.description || "",
  sourceUrl: item.link,
  updatedAt: new Date(item.pubDate),
});
