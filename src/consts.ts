// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = '八生建設株式会社';
export const SITE_DESCRIPTION =
	'埼玉・東京・関東近郊のオフィス・店舗・工場・公共施設を手がける総合建設会社。八生建設は常に高水準の品質と安心感を提供し、お客様の理想を実現します。';

export const COMPANY = {
	name: '八生建設株式会社',
	nameEn: 'HASSEI CO.,LTD.',
	postalCode: '〒338-0002',
	address: '埼玉県さいたま市中央区下落合7丁目3番6号',
	addressShort: '埼玉県さいたま市中央区下落合 7丁目3番6号',
	tel: '048-852-2631',
	fax: '048-854-2531',
	copyright: '©HASSEI CO.,LTD. All Rights Reserved.',
};

export const NAV = [
	{ href: '/works/', label: '施工事例' },
	{
		href: '/company/',
		label: '企業情報',
		children: [
			{ href: '/company/', label: '企業情報' },
			{ href: '/company/philosophy/', label: '企業理念' },
			{ href: '/company/outline/', label: '会社概要' },
		],
	},
	{ href: '/recruit/', label: '採用情報' },
	{ href: '/information/', label: 'インフォメーション' },
	{ href: '/contact/', label: 'お問い合わせ' },
	{ href: '/entry/', label: 'エントリーフォーム' },
];

// 施工事例の用途分類（元サイトの絞り込みと同じ並び）
export const CLASSIFICATIONS = [
	'オフィス',
	'住宅施設',
	'カーディーラー',
	'工場',
	'倉庫',
	'医療・福祉施設',
	'文化・教育施設',
] as const;
