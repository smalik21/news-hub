import NewsInfo from "./NewsInfo";

export interface NEWSLIST {
    list: NewsInfo[],
    load(query: string, value: string, cc?: string): Promise<void>,
}

const newsApiKey: string = "5732b3925877480796e4651bf972f1d5"

type source = {
    id: string | null,
    name: string | null,
}

type data = {
    source: source,
    author: string | null,
    title: string | null,
    description: string | null,
    url: string | null,
    urlToImage: string | null,
    publishedAt: string | null,
    content: string | null,
}

export default class NewsList implements NEWSLIST {

    constructor(
        private _list: NewsInfo[] = [],
    ) { }

    get list(): NewsInfo[] {
        return this._list
    }

    // https://newsapi.org/v2/top-headlines?country=us&apiKey=5732b3925877480796e4651bf972f1d5
    // https://newsapi.org/v2/everything?q=bitcoin&apiKey=5732b3925877480796e4651bf972f1d5

    load(query: string, value: string, cc?: string): Promise<void> {
        return new Promise((resolve, reject) => {

            this._list = []

            let url: string

            if (query === "headline") {
                url = `https://newsapi.org/v2/top-headlines?country=${cc}&category=${value}&pageSize=50&apiKey=${newsApiKey}`
            }
            else {
                url = `https://newsapi.org/v2/everything?q=${value}&pageSize=50&apiKey=${newsApiKey}`
            }

            console.log("API request made: News of type:", query, " + ", value)

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.status === "ok") {
                        data.articles.forEach((article: data) => {
                            const newArticle: NewsInfo = new NewsInfo(
                                article.source,
                                article.title,
                                article.author,
                                article.description,
                                article.url,
                                article.urlToImage,
                                article.publishedAt,
                                article.content
                            )
                            if (newArticle.title!.length > 10) {
                                this._list.push(newArticle)
                            }
                        })
                        // console.log(this._list)
                    }
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}