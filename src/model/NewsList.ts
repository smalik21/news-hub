import NewsInfo from "./NewsInfo";

interface NEWSLIST {
    list: NewsInfo[],
    load(query: string, value: string, cc?: string): Promise<void>,
}

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

const newsApiKey: string | undefined = import.meta.env.VITE_APP_NEWS_API_KEY

export default class NewsList implements NEWSLIST {

    constructor(
        private _list: NewsInfo[] = [],
    ) { }

    get list(): NewsInfo[] {
        return this._list
    }

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

            console.log("API request made: News of type:", query, " + ", value + " + ", cc)

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
                    }
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}