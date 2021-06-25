import jsonfile from "jsonfile";
import path from "path";

export async function getData(): Promise<string[]> {
  const data: Record<string, string> = await jsonfile.readFile(
    path.join(__dirname, "../data.json"),
    "utf8"
  );
  const linksArray = Object.keys(data).map((k) => {
    return data[k];
  });
  return linksArray;
}
