import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 施工事例（Works）
const works = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		// 用途分類
		classification: z.enum([
			'オフィス',
			'住宅施設',
			'カーディーラー',
			'工場',
			'倉庫',
			'医療・福祉施設',
			'文化・教育施設',
		]),
		location: z.string(), // 所在地
		locationEn: z.string(), // 一覧カード用（Saitama / Tokyo）
		structure: z.string(), // 構造
		scale: z.string(), // 規模
		completion: z.string(), // 竣工（YYYY年MM月）
		completionDate: z.coerce.date(), // 並び替え用
		images: z.array(z.string()).default([]),
		order: z.number().default(0),
	}),
});

// インフォメーション（お知らせ / 採用情報 / 施工事例）
const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(['おしらせ', '採用情報', '施工事例（Works）']),
		// 元サイトのパス（/news/... /recruit/... /work/...）を維持するため
		permalink: z.string(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { works, news };
