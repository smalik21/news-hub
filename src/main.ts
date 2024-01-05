import './css/style.css'
import * as dotenv from 'dotenv'

dotenv.config()

import HeaderTemplate from './template/HeaderTemplate'
import NavbarTemplate from './template/NavbarTemplate'
import CardsTemplate from './template/CardsTemplate'
import NewsTemplate from './template/NewsTemplate'

import FormattedDate from './model/FormattedDate'
import UserCountry from './model/UserCountry'
import CountryList from './model/CountryList'
import NewsList from './model/NewsList'

const pageTitle: string = "NewsHub"

// import DOM elements
const body = document.querySelector("body") as HTMLBodyElement
const logo = document.querySelector("#pageTitle") as HTMLHeadingElement
const searchForm = document.querySelector("#searchBar") as HTMLFormElement
const cardSection = document.querySelector("#cardSection") as HTMLDivElement
const newsSection = document.querySelector("#newsSection") as HTMLDivElement

const scrollToTop = () => window.scrollTo({ top: 0 })

const sectionDisplay = (section: HTMLDivElement) => {
    cardSection.style.display = 'none'
    newsSection.style.display = 'none'
    section.style.display = 'flex'
}

const goToHome = (navbarTemplate: NavbarTemplate) => {
    navbarTemplate.updateActiveNavItem("general")           // set the navigation to home tab
    sectionDisplay(cardSection)
}

const init = (): void => {

    // import models
    const date: FormattedDate = new FormattedDate()
    const userCountry: UserCountry = new UserCountry()
    const countryList: CountryList = new CountryList()
    const newsList: NewsList = new NewsList()

    // import templates
    const headerTemplate: HeaderTemplate = new HeaderTemplate()
    const navbarTemplate: NavbarTemplate = new NavbarTemplate()
    const cardsTemplate: CardsTemplate = new CardsTemplate()
    const newsTemplate: NewsTemplate = new NewsTemplate()

    // Handle logo click 
    logo.addEventListener("click", () => goToHome(navbarTemplate))

    // Handle location change
    userCountry.onChange(selectedCode => {
        console.log('Selected code changed:', selectedCode)
        goToHome(navbarTemplate)
    })

    // Handle navigation change
    navbarTemplate.onChange(selectedOption => {
        if (selectedOption === "") return
        console.log('Selected option changed:', selectedOption)
        newsList.load("headline", selectedOption, userCountry.code)
            .then(() => cardsTemplate.render(newsList))

        sectionDisplay(cardSection)
    })

    // Handle news select
    cardsTemplate.onChange(selectedNews => {
        if (selectedNews === null) return
        console.log('Selected news changed:', selectedNews)
        newsTemplate.render(selectedNews)
        sectionDisplay(newsSection)
        scrollToTop()
    })

    // Handle back click
    newsSection.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        // Check if the clicked element is the back button
        if (target.id === 'backButton') {
            sectionDisplay(cardSection)
        }
    })

    // Handle news search form submission
    searchForm.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault()

        const input = document.querySelector("#query") as HTMLInputElement
        const inputText = input.value!.trim()
        input.value = ''

        if (inputText === "") return

        navbarTemplate.updateActiveNavItem("")

        newsList.load("search", inputText)
            .then(() => cardsTemplate.render(newsList))

        sectionDisplay(cardSection)
    })

    // Initial loads
    date.load()
    navbarTemplate.render()

    Promise.all([countryList.load(), userCountry.load()])
        .then(() => headerTemplate.render(pageTitle, date, userCountry, countryList))
        .then(() => body.style.display = 'block')
        .then(() => newsList.load("headline", navbarTemplate.selectedOption, userCountry.code))
        .then(() => cardsTemplate.render(newsList))
        .catch(error => console.log(error))

}

document.addEventListener('DOMContentLoaded', init)