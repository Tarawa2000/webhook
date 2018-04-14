global.configuration = {
    DEBUG: true,
    modmailChannelWebhook: 'webhook url goes here',
	// States go here, colors are hex colors with # replaced with 0x
    modmailStates: [
        {
            'state': 'mod',
            'color': '0x46d160',
            'subreddits': 'history'
        },{
            'state': 'new',
            'color': '0x0dd3bb',
            'subreddits': 'history'
        },{
            'state': 'highlighted',
            'color': '0xffb000',
            'subreddits': 'history'
        },{
            'state': 'notifications',
            'color': '0x24a0ed',
            'subreddits': 'history'
        }
    ],
    redditConfig: {
        userAgent: '/u/FILLINYOURNAMEHERE discord modmail feed',
        oauth: {
            type: 'script',
            key: 'YOURKEY',
            secret: 'YOURSECRET',
            username: 'USERNAME',
            password: 'PASSWORD',
            // make sure to set all the scopes you need. We are lazy so we do ALLTHESCOPES
            scope: ['account', 'creddits', 'edit', 'flair', 'history', 'identity', 'livemanage', 'modconfig', 'modcontributors', 'modflair', 'modlog', 'modmail', 'modothers', 'modposts', 'modself', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread']
        }
    }
};
