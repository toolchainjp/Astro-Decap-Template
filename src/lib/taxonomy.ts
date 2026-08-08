import taxonomy from '../data/taxonomy.json';

export interface Term {
	slug: string;
	label: string;
}

export interface NewsCategory extends Term {
	/** 記事URLの接頭辞（/news/ ・ /recruit/ ・ /work/） */
	basePath: string;
	/** アイキャッチ未設定時に使う画像 */
	defaultImage: string;
}

export const workClassifications: Term[] = taxonomy.workClassifications;
export const newsCategories: NewsCategory[] = taxonomy.newsCategories;

/**
 * 用語を引く。taxonomy.json に未登録の値でもページが壊れないよう、
 * 見つからなければ slug をそのままラベルとして返す。
 */
export function findClassification(slug: string): Term {
	return workClassifications.find((t) => t.slug === slug) ?? { slug, label: slug };
}

export function findNewsCategory(slug: string): NewsCategory {
	return (
		newsCategories.find((t) => t.slug === slug) ?? {
			slug,
			label: slug,
			basePath: `/${slug}/`,
			defaultImage: '/uploads/eye-catch_news.svg',
		}
	);
}

/**
 * 記事の公開URL。permalink が明示されていればそれを優先し、
 * なければカテゴリーの basePath + スラッグから組み立てる。
 */
export function newsPermalink(entry: { id: string; data: { category: string; permalink?: string } }): string {
	if (entry.data.permalink) return entry.data.permalink;
	return `${findNewsCategory(entry.data.category).basePath}${entry.id}/`;
}

/** タグは自由入力（日本語可）。URLでは百分率エンコードして使う。 */
export function tagPath(base: '/works' | '/information', tag: string): string {
	return `${base}/tag/${encodeURIComponent(tag)}/`;
}

/** 重複を除いたタグ一覧を、出現回数の多い順に返す。 */
export function collectTags(entries: { data: { tags?: string[] } }[]): { tag: string; count: number }[] {
	const counts = new Map<string, number>();
	for (const entry of entries) {
		for (const tag of entry.data.tags ?? []) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ja'));
}

/** 一覧カードのサムネイル。明示指定 > 1枚目の写真 > 既定画像。 */
export function worksThumbnail(data: { thumbnail?: string; images?: string[] }): string {
	return data.thumbnail ?? data.images?.[0] ?? '/uploads/eye-catch_news.svg';
}

export const formatDate = (d: Date): string =>
	`${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

/** 一覧のカウンタ表示（007 のようなゼロ埋め3桁）。 */
export const pad3 = (n: number): string => String(n).padStart(3, '0');
