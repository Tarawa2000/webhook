# webhookrequire('./config.js');

const   request = require('request'),
        snooCore = require('snoocore');

//
// Start with reddit stuff here
//
console.log('starting snoocore');
let reddit = new snooCore(lemmingPrefs.redditConfig);

//
// Used for debugging, probably should do error handling as well.
//
reddit.on('error', function(error) {
    console.error('REDDIT ERROR:');
    console.error(error);
});
reddit.on('ENOTFOUND', function(error) {
    console.error('REDDIT ERROR:');
    console.error(error);
});


// Needed to unescape some json stuff
function unescapeJSON(val) {
    if (typeof(val) == "string") {
        val = val.replace(/&quot;/g, '"')
            .replace(/&gt;/g, ">").replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&");
    }
    return val;
}

// This is used to determine if an annoucement should be made. Naturally this is something that should be filled from a file or database on script start to prevent channel spam. 
let latestSubmission = 0;

// function that waits for a minute before calling fetch again.
function waitFunction(subreddit) {
    setTimeout(function(){
        fetchAnnounce(subreddit)
    }, 60000);
}

// Fetch function
function fetchAnnounce(subreddit) {
    reddit(`/r/${subreddit}/new`).get({
        limit: 1
    }).then(function (result) {

        if (result.data.children.length === 0) {
            console.log('ERROR:');
            console.log(result);
        } else {
            const submissionsNew = result.data.children.reverse();

            submissionsNew.forEach(function (value, index) {
                // This shizzle we need.
                const submissionID = value.data.id
                const requestBody = {
                    embeds:[
                        {
                            title: unescapeJSON(value.data.title),
                            url: `https://redd.it/${submissionID}`,
                            image: {
                                thumbnail: value.data.thumbnail ? value.data.thumbnail : "https://a.thumbs.redditmedia.com/cgfaT2eh3dEkaf-smovl78lAiT_MF_xHB0-AfI5UJ70.png",
                                width: 70,
                                height: 70
                            },
                            author:{
                                name: `New post from /u/${value.data.author}`,
                                url:`https://reddit.com/user/${value.data.author}`
                            },
                            description: `In /r/${value.data.subreddit}`
                        }
                    ]};

                const postRequest = {
                    url: lemmingPrefs.webhookUrl,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                };
                
                

                // this converts reddit base36 ids to base10 so we van easily check.
                var intID = parseInt(submissionID, 36);

                // If the submission id is higher than the latest we checked it is new.
                if (intID > latestSubmission) {
                    request.post(postRequest, function(error, response, body) {
                        if (error) {
                          return console.error('Announce failed:', error);
                        }
                        latestSubmission = intID;
                    });
                
                }
            });
        }


        waitFunction(subreddit);
    }).catch(function (error) {
        // log the error
        console.log('reddit error:', error);
        // continue anyway, most likely reddit borking so eventually it will work again.
        waitFunction(subreddit);
    });


}


// First time start of checking.
fetchAnnounce(lemmingPrefs.checkSub);



