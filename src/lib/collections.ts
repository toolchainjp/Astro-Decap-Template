import { getCollection, type CollectionEntry } from 'astro:content';
import { newsPermalink } from './taxonomy';

/** draft: true の記事は本番ビルドだけ除外（開発中はプレビューできます）。 */
const publicOnly = ({ data }: { data: { draft: boolean } }) => import.meta.env.PROD !== true || !data.draft;

/** 施工事例。表示順（order 昇順）→ 竣工日の新しい順。 */
export async function getWorks(): Promise<CollectionEntry<'works'>[]> {
	const entries = await getCollection('works', publicOnly);
	return entries.sort(
		(a, b) =>
			a.data.order - b.data.order ||
			(b.data.completionDate?.valueOf() ?? 0) - (a.data.completionDate?.valueOf() ?? 0) ||
			a.data.title.localeCompare(b.data.title, 'ja'),
	);
}

/** インフォメーション。公開日の新しい順。 */
export async function getNews(): Promise<CollectionEntry<'news'>[]> {
	const entries = await getCollection('news', publicOnly);
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * 記事のURLは /news/ ・ /recruit/ ・ /work/ に分かれているため、
 * 接頭辞ごとに getStaticPaths を組み立てます。
 * Prev は1つ古い記事、Next は1つ新しい記事（元サイトと同じ向き）。
 */
export async function newsPathsFor(basePath: string) {
	const posts = await getNews();
	return posts
		.map((entry, index) => ({
			entry,
			permalink: newsPermalink(entry),
			prev: posts[index + 1] ?? null,
			next: posts[index - 1] ?? null,
		}))
		.filter(({ permalink }) => permalink.startsWith(basePath))
		.map(({ entry, permalink, prev, next }) => ({
			params: { slug: permalink.slice(basePath.length).replace(/\/$/, '') },
			props: { entry, prev, next, posts },
		}));
}
