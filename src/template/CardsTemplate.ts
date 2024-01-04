import NewsInfo from "../model/NewsInfo"
import NewsList from "../model/NewsList"

interface CARDS {
    cardSection: HTMLDivElement | null,
    selectedNews: NewsInfo | null,
    onChange(listener: (news: NewsInfo | null) => void): void
    clear(): void,
    setupLazyLoading(): void,
    render(newsList: NewsList): void,
}

export default class CardsTemplate implements CARDS {

    cardSection!: HTMLDivElement | null
    private listeners: ((news: NewsInfo | null) => void)[] = []

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
        this.listeners.forEach(listener => listener(news))
    }

    onChange(listener: (news: NewsInfo | null) => void) {
        this.listeners.push(listener)
    }

    clear(): void {
        this.cardSection!.innerHTML = ''
    }

    setupLazyLoading(): void {

        let lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll("img.lazy-load"))

        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target as HTMLImageElement
                        if (lazyImage.dataset.src) {
                            lazyImage.src = lazyImage.dataset.src
                            lazyImage.removeAttribute('data-src')
                        }
                        lazyImage.classList.remove("lazy-load")
                        lazyImageObserver.unobserve(lazyImage)
                    }
                })
            })

            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage)
            })
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(lazyImage => {
                if (lazyImage.dataset.src) {
                    lazyImage.src = lazyImage.dataset.src
                    lazyImage.removeAttribute('data-src')
                }
            })
        }
    }

    render(newsList: NewsList): void {

        this.clear()

        newsList.list.forEach((news: NewsInfo) => {

            const card = document.createElement("div") as HTMLDivElement
            card.className = 'newsCard'

            const img = document.createElement("img") as HTMLImageElement
            img.setAttribute('data-src', news.imgUrl ?? '')
            // img.src = news.imgUrl ?? ''
            img.alt = `${news.title}-image`
            img.className = 'cardImage lazy-load'

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
                this.selectedNews = news
                // console.log("news:", this.selectedNews)
            })

            this.cardSection?.append(card)
        })

        this.setupLazyLoading()
    }
}