import jsonfile from 'jsonfile';
import path from 'path';

export async function seed(): Promise<string[]> {
  console.log('Start seeding...');
  const data: Record<string, string> = await jsonfile.readFile(
    path.join(__dirname, '../data.json'),
    'utf8'
  );
  const linksArray = Object.keys(data).map((k) => {
    return data[k];
  });
  console.log('Seeding process completed');
  return linksArray;
}
