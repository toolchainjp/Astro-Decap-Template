import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getNews } from '../lib/collections';
import { findNewsCategory, newsPermalink } from '../lib/taxonomy';

export async function GET(context) {
	const posts = await getNews();

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			categories: [findNewsCategory(post.data.category).label, ...post.data.tags],
			link: newsPermalink(post),
		})),
	});
}
