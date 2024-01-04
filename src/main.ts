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
    const date: FormattedDate = new FormattedDate()
    const userCountry: UserCountry = new UserCountry()
    const countryList: CountryList = new CountryList()
    const newsList: NewsList = new NewsList()

    const headerTemplate: HeaderTemplate = new HeaderTemplate()
    const navbarTemplate: NavbarTemplate = new NavbarTemplate()
    const cardsTemplate: CardsTemplate = new CardsTemplate()

    const body = document.querySelector("body") as HTMLBodyElement

    date.load()
    navbarTemplate.render()

    Promise.all([countryList.load(), userCountry.load()])
        .then(() => headerTemplate.render(pageTitle, date, userCountry, countryList))
        .then(() => body.style.display = 'block')
        .then(() => newsList.load("latest", userCountry.code))
        .then(() => cardsTemplate.render(newsList))
        .catch(error => console.log(error))


    // HANDLE LOCATION CHANGES
    const countrySelect = document.querySelector("#country") as HTMLSelectElement
    countrySelect.addEventListener("change", () => {
        console.log("selected code", countrySelect.value)
        newsList.load("latest", countrySelect.value)
            .then(() => cardsTemplate.render(newsList))
    })
}

document.addEventListener('DOMContentLoaded', init)