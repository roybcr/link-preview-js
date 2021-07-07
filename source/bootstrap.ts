import { seed } from './seed';
import { getLinkPreview } from './index';
import jsonfile from 'jsonfile';
import path from 'path';
export async function bootstrap() {
  const initialData = await seed();

  /*   const articles: string[] = [];
  const websites: string[] = [];
  const books: string[] = [];
  const products: string[] = [];
  const objects: string[] = [];
  const videos: string[] = [];
  const movies: string[] = [];
  const other: any[] = []; */

  const types: { url: string; type: string }[] = [];
  const promises: ReturnType<typeof getLinkPreview>[] = [];
  for (let i = 0; i < initialData.length; i++) {
    promises.push(getLinkPreview(initialData[i]));
    console.log('Pushing ' + i + 'to the stack');
  }

  promises.forEach((s) => {
    Promise.resolve(s)
      .then((x) => {
        types.push({ url: x.url, type: x.mediaType });
        /* switch (x.mediaType) {
          case 'article':
            articles.push(x.url);
            return x;
          case 'website':
            websites.push(x.url);
            return x;
          case 'book':
            books.push(x.url);
            return x;
          case 'product':
            products.push(x.url);
            return x;
          case 'object':
            objects.push(x.url);
            return x;
          case 'video':
            videos.push(x.url);
            return x;
          case 'movie':
            movies.push(x.url);
            return x;
          default:
            other.push(x);
            return x;
        } */
      })
      .then(async () => {
        await jsonfile.writeFile(path.join(__dirname, '../output.json'), types, 'utf8');
      })

      .catch((err) => {
        /*  console.log(
          articles.length,
          websites.length,
          books.length,
          products.length,
          objects.length,
          videos.length,
          movies.length,
          other
        ); */
        return err;
      });
  });
}

bootstrap();
