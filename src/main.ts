import './css/style.css'

import HeaderTemplate from './template/HeaderTemplate'
import NavbarTemplate from './template/NavbarTemplate'
import CardsTemplate from './template/CardsTemplate'

import FormattedDate from './model/FormattedDate'
import UserCountry from './model/UserCountry'
import CountryList from './model/CountryList'
import NewsList from './model/NewsList'

const pageTitle: string = "NewsHub"

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

    // import DOM elements
    const body = document.querySelector("body") as HTMLBodyElement
    const searchForm = document.querySelector("#searchBar") as HTMLFormElement

    // Handle location change
    userCountry.onChange(selectedCode => {
        console.log('Selected code changed:', selectedCode)
        navbarTemplate.updateActiveNavItem("general")
    })

    // Handle navigation change
    navbarTemplate.onChange(selectedOption => {
        if (selectedOption === "") return
        console.log('Selected option changed:', selectedOption)
        newsList.load("headline", selectedOption, userCountry.code)
            .then(() => cardsTemplate.render(newsList))
    })

    // Handle news select
    cardsTemplate.onChange(selectedNews => {
        console.log('Selected news changed:', selectedNews)
        // run these
        // newTemplate.render(selectedNews)
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
    })


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