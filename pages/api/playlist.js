'use strict';

const handler = async (req, res) => {

    let {key, playlistId, maxResults} = req.query;

    if (maxResults === undefined) maxResults = 10;

    if (key !== undefined && playlistId !== undefined) {
        try {
            
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&type=playlist&playlistId=${playlistId}&part=snippet&maxResults=${maxResults}`);
        
            let videosIds = [];
            
            response.json().then(data => {
                data.items.map((item) => {
                    videosIds.push({
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        publishedAt: item.snippet.publishedAt,
                    });
                });
                res.status(200).json(videosIds);
            });

            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }else{
        res.status(500).json({ error: 'Missing parameters' });
    }

}

module.exports = handler;