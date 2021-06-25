import { seed } from "./seed";
import { getLinkPreview } from "./index";

async function bootstrap() {
  const initialData = await seed();
  const promises: ReturnType<typeof getLinkPreview>[] = [];
  for (let i = 0; i < initialData.length; i++) {
    promises.push(getLinkPreview(initialData[i]));
    console.log("Pushing " + i + "to the stacks");
  }
  const sl = promises.slice(0, 10);
  sl.forEach((s) => {
    Promise.resolve(s)
      .then((x) => {
        console.log("X", x);
      })
      .catch((err) => console.error(err));
  });
}
bootstrap();
