interface NEWS {
    source: string | null,
    author: string | null,
    title: string | null,
    description: string | null,
    url: string | null,
    imgUrl: string | null,
    published: string | null,
    content: string | null,
}

export default class NewsInfo implements NEWS {

    constructor(
        private _source: string | null,
        private _title: string | null,
        private _author: string | null,
        private _description: string | null,
        private _url: string | null,
        private _imgUrl: string | null,
        private _published: string | null,
        private _content: string | null,
    ) { }

    // Getters
    get source(): string | null {
        return this._source;
    }

    get title(): string | null {
        return this._title;
    }

    get author(): string | null {
        return this._author;
    }

    get description(): string | null {
        return this._description;
    }

    get url(): string | null {
        return this._url;
    }

    get imgUrl(): string | null {
        return this._imgUrl;
    }

    get published(): string | null {
        return this._published;
    }

    get content(): string | null {
        return this._content;
    }

    // Setters
    set source(value: string | null) {
        this._source = value;
    }

    set title(value: string | null) {
        this._title = value;
    }

    set author(value: string | null) {
        this._author = value;
    }

    set description(value: string | null) {
        this._description = value;
    }

    set url(value: string | null) {
        this._url = value;
    }

    set imgUrl(value: string | null) {
        this._imgUrl = value;
    }

    set published(value: string | null) {
        this._published = value;
    }

    set content(value: string | null) {
        this._content = value;
    }
}