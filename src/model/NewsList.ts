import NewsInfo from "./NewsInfo";

interface NEWSLIST {
    list: NewsInfo[],
    load(query: string, value: string, cc?: string): Promise<void>,
}

type data = {
    source: string | null,
    author: string | null,
    title: string | null,
    description: string | null,
    url: string | null,
    image: string | null,
    published_at: string | null,
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

            // TODO: Provide more language options

            if (query === "headline") {
                if (value === "home") {
                    value = "general"
                    url = `https://newshub-proxy-server.onrender.com/api/v1/news?access_key=${newsApiKey}&countries=${cc}&categories=${value}&languages=en`
                }
                else {
                    url = `https://newshub-proxy-server.onrender.com/api/v1/news?access_key=${newsApiKey}&categories=${value}&languages=en`
                }
            }
            else {
                url = `https://newshub-proxy-server.onrender.com/api/v1/news?access_key=${newsApiKey}&keywords=${value}&languages=en`
            }

            // console.log("API request made: News of type:", query, " + ", value + " + ", cc)

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Too many requests')
                    }

                    return response.json()
                })
                .then(response => {

                    if(response.data.length === 0) {
                        reject(new Error("Data unavailable"))
                        return
                    }

                    response.data.forEach((article: data) => {
                        const newArticle: NewsInfo = new NewsInfo(
                            article.source,
                            article.title,
                            article.author,
                            article.description,
                            article.url,
                            article.image,
                            article.published_at,
                            article.description
                        )
                        if (newArticle.title!.length > 10) {
                            this._list.push(newArticle)
                        }
                    })
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}