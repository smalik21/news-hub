import NewsInfo from "../model/NewsInfo"
import NewsList from "../model/NewsList"

interface CARDS {
    cardSection: HTMLDivElement | null,
    selectedNews: NewsInfo | null,
    clear(): void,
    render(newsList: NewsList): void,
}

export default class CardsTemplate implements CARDS {

    cardSection!: HTMLDivElement | null

    constructor(
        private _selectedNews: NewsInfo | null = null
    ) {
        this.cardSection = document.querySelector("#cardSection") as HTMLDivElement
    }

    get selectedNews(): NewsInfo | null {
        return this._selectedNews
    }

    set selectedNews(news: NewsInfo) {
        this._selectedNews = news
    }

    clear(): void {
        this.cardSection!.innerHTML = ''
    }

    render(newsList: NewsList): void {

        this.clear()

        newsList.list.forEach((news: NewsInfo) => {

            const card = document.createElement("div") as HTMLDivElement
            card.className = 'newsCard'

            const img = document.createElement("img") as HTMLImageElement
            img.src = news.imgUrl ?? ''
            img.alt = `${news.title}-image`
            img.className = 'cardImage'

            const detail = document.createElement("div") as HTMLDivElement
            detail.className = 'cardDetail'

            const source = document.createElement("p") as HTMLParagraphElement
            source.textContent = "Source: " + news.source.name
            source.className = 'cardSource'
            detail.append(source)

            const title = document.createElement("h2") as HTMLHeadingElement
            title.textContent = news.title
            title.className = 'cardTitle'
            detail.append(title)

            const description = document.createElement("p") as HTMLParagraphElement
            description.textContent = news.description
            description.className = 'cardDescription'

            if (news.imgUrl !== null) {
                card.append(img)
                card.append(detail)
            }
            else {
                card.append(detail)
                card.append(description)
            }

            card.addEventListener("click", () => {
                this._selectedNews = news
                console.log(this._selectedNews)
            })

            this.cardSection?.append(card)
        })
    }
}