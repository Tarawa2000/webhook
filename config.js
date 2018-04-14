global.lemmingPrefs = {
	redditConfig: {
		userAgent: '/u/yourname and description of what this does.',
		oauth: {
			type: 'script',
			key: '<KEY>',
			secret: '<SECRET>',
			username: '<REDDIT USERNAME>',
			password: '<REDDIT PASSWORD>',
			// make sure to set all the scopes you need.
			scope: ['account', 'creddits', 'edit', 'flair', 'history', 'identity', 'livemanage', 'modconfig', 'modcontributors', 'modflair', 'modlog', 'modmail', 'modothers', 'modposts', 'modself', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread']
		}
	},
  checkSub: 'subreddit',
  webhookUrl: 'webhookUrl'
} 
