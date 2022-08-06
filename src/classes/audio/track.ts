export default class Track {
    url: string;
    title: string;
    requestedBy: any;
    thumbnail: string;
    duration: any;
    id: string;

    constructor({ url, title, requestedBy, thumbnail, duration }: { url: string; title: string; requestedBy: any; thumbnail: string; duration: any }) {
        this.url = url;
        this.title = title;
        this.requestedBy = requestedBy;
        this.thumbnail = thumbnail;
        this.duration = duration;
        //this.id is a custom id generated from the data and Math.random() that gives the track a unique identifier. Used to find a specific track in the array and delete it (/queue delete delect menu)
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}
