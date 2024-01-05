import NewsInfo from "../model/NewsInfo";

interface NEWS {
    newsSection: HTMLDivElement | null,
    clear(): void,
    render(news: NewsInfo): void,
}

export default class NewsTemplate implements NEWS {

    newsSection: HTMLDivElement | null

    constructor() {
        this.newsSection = document.querySelector("#newsSection") as HTMLDivElement
    }

    clear(): void {
        this.newsSection!.innerHTML = ''
    }

    render(news: NewsInfo): void {

        this.clear()

        const header = document.createElement("header") as HTMLHeadElement
        header.id = 'newsHeader'

        const backButton = document.createElement("button") as HTMLButtonElement
        backButton.id = 'backButton'
        backButton.textContent = 'Back'
        header.append(backButton)

        const source = document.createElement("a") as HTMLAnchorElement
        source.id = 'newsSource'
        source.textContent = 'Source: ' + news.source.name
        source.href = news.url ?? ''
        source.target = '_blank'
        header.append(source)

        // news.source.id -> can be used to request related articles

        const title = document.createElement("h1") as HTMLHeadingElement
        title.id = 'newsTitle'
        title.textContent = news.title
        header.append(title)

        const author = document.createElement("p") as HTMLParagraphElement
        author.id = 'newsAuthor'
        author.textContent = '—  ' + news.author
        header.append(author)

        const published = document.createElement("p") as HTMLParagraphElement
        published.id = 'newsPublish'
        published.textContent = 'Published: ' + news.published!.split('T')[0]
        header.append(published)

        this.newsSection!.append(header)

        const section = document.createElement("div") as HTMLDivElement
        section.id = 'newsDetail'

        const description = document.createElement("p") as HTMLParagraphElement
        description.id = 'newsDescription'
        description.textContent = news.description
        section.append(description)

        const img = document.createElement("img") as HTMLImageElement
        img.id = 'newsImg'
        img.src = news.imgUrl ?? ''
        img.alt = "News Image"
        section.append(img)

        const content = document.createElement("p") as HTMLParagraphElement
        content.id = 'newsContent'
        content.textContent = news.content
        section.append(content)

        this.newsSection!.append(section)
    }
}