export default class Track {
	constructor({ url, title, requestedBy, thumbnail, duration }) {
		this.url = url;
		this.title = title;
		this.requestedBy = requestedBy; 
		this.thumbnail = thumbnail;
		this.duration = duration;
		this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
	}
}
