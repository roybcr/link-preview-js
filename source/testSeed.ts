import jsonfile from 'jsonfile';
import path from 'path';

export async function testSeed(): Promise<string[]> {
  console.log('Start seeding...');
  const data: Record<string, any> = await jsonfile.readFile(
    path.join(__dirname, '../testurls.json'),
    'utf8'
  );
  const linksArray = Object.keys(data)
    .slice(0, 100)
    .map((k) => {
      return /* `https://${ */ data[k].url;
    });
  console.log('Seeding process completed');
  return linksArray;
}
