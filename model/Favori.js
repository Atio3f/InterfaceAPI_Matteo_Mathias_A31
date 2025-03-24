// format du JSON : {title : {"artist" : ..., "cover_url" : ...}}
class Favori {
    title; 
    artists = [];
    cover_url;
    shortTitle;
    constructor(full_title, artist_names, header_image_thumbnail_url, lyrics_url){
        this.title = full_title;
        this.artists = artist_names;
        this.cover_url = header_image_thumbnail_url;
        this.lyrics_url = lyrics_url;
        const shortTitle = full_title.replace(/\s+/g, " ");
        this.shortTitle = shortTitle.substring(0, shortTitle.lastIndexOf(" by "));
    }

    get_title(){
        return this.title;
    }
    get_artist(){
        return this.artists;
    }
    get_cover_url(){
        return this.cover_url;
    }
    get_shortTitle(){
        return this.shortTitle;
    }
}