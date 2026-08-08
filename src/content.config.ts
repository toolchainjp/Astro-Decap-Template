import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 分類・カテゴリーは src/data/taxonomy.json で管理しています。
// ここでは enum に固定せず slug 文字列として受け取ることで、
// 用語を増やしてもコード修正が不要になるようにしています。

/** 表形式で自由に足せる項目（敷地面積・用途 など） */
const specs = z
	.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	)
	.default([]);

// 施工事例（Works）
const works = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		/** 用途分類の slug（taxonomy.json の workClassifications） */
		classification: z.string(),
		/** 自由入力タグ */
		tags: z.array(z.string()).default([]),
		location: z.string().optional(), // 所在地
		locationEn: z.string().optional(), // 一覧カード用（Saitama / Tokyo）
		structure: z.string().optional(), // 構造
		scale: z.string().optional(), // 規模
		completion: z.string().optional(), // 竣工（表示用・YYYY年MM月）
		completionDate: z.coerce.date().optional(), // 並び替え用
		/** 追加のスペック行 */
		specs,
		images: z.array(z.string()).default([]),
		/** 一覧カードのサムネイル。未指定なら images[0] を使います。 */
		thumbnail: z.string().optional(),
		order: z.number().default(99),
		draft: z.boolean().default(false),
	}),
});

// インフォメーション（おしらせ / 採用情報 / 施工事例）
const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		/** カテゴリーの slug（taxonomy.json の newsCategories） */
		category: z.string(),
		/** 自由入力タグ */
		tags: z.array(z.string()).default([]),
		/**
		 * 公開URL。未指定ならカテゴリーの basePath + ファイル名から自動生成されます。
		 * 既存記事のURLを維持したい場合だけ明示してください。
		 */
		permalink: z.string().optional(),
		heroImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { works, news };
