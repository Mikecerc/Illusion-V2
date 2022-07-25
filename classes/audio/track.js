export default class Track {
	constructor({ url, title, requestedBy, thumbnail }) {
		this.url = url;
		this.title = title;
		this.requestedBy = requestedBy; 
		this.thumbnail = thumbnail;
	}
}