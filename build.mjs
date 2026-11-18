// Zero-dependency static build: renders pages from src/ and copies static assets into dist/.
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { products, news } from './src/data.mjs';
import { layout } from './src/layout.mjs';
import * as pages from './src/pages.mjs';

const OUT = 'dist';
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const all = [
  pages.home(), pages.about(), pages.areasPage(), pages.productsPage(),
  ...products.map(pages.productPage),
  pages.quality(), pages.careerPage(), pages.newsPage(), ...news.map(pages.newsDetail),
  pages.contact(), pages.notFound(),
];

for (const page of all) {
  await writeFile(`${OUT}/${page.file}`, layout(page));
}
for (const dir of ['css', 'js', 'assets']) await cp(dir, `${OUT}/${dir}`, { recursive: true });
await writeFile(`${OUT}/.nojekyll`, '');
console.log(`Built ${all.length} pages → ${OUT}/`);
