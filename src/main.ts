import './css/style.css'

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
const navbar = document.querySelector("#navbar") as HTMLUListElement
const loader = document.querySelector("#loader-container") as HTMLDivElement
const message = document.querySelector("#display-message-container") as HTMLDivElement

const scrollToTop = () => window.scrollTo({ top: 0 })

const sectionDisplay = (section: HTMLDivElement) => {
    loader.style.display = 'none'
    message.style.display = 'none'
    cardSection.style.display = 'none'
    newsSection.style.display = 'none'
    section.style.display = 'flex'
}

const goToHome = (navbarTemplate: NavbarTemplate) => {
    navbarTemplate.updateActiveNavItem("home")           // set the navigation to home tab
}

const openNavbar = () => {
    if (window.innerWidth > 840) return
    navbar.style.marginLeft = '-1.5rem'
}

const closeNavbar = () => {
    if (window.innerWidth > 840) return
    navbar.style.marginLeft = '-110%'
}

const removeToggle = () => {
    navbar.style.margin = '0'
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
        sectionDisplay(loader)
    })

    // Handle navigation change
    navbarTemplate.onChange(selectedOption => {
        if (selectedOption === "") return

        sectionDisplay(loader)

        newsList.load("headline", selectedOption, userCountry.code)
            .then(() => cardsTemplate.render(newsList))
            .then(() => sectionDisplay(cardSection))
            .catch(() => sectionDisplay(message))
    })

    // Handle news select
    cardsTemplate.onChange(selectedNews => {
        if (selectedNews === null) return
        // console.log('Selected news changed:', selectedNews)
        newsTemplate.render(selectedNews)
        sectionDisplay(newsSection)
        scrollToTop()
    })

    // Handle back click
    newsSection.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement
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

        sectionDisplay(loader)

        navbarTemplate.updateActiveNavItem("")
        newsList.load("search", inputText)
            .then(() => cardsTemplate.render(newsList))
            .then(() => sectionDisplay(cardSection))
            .catch(() => sectionDisplay(message))
    })

    // Handle navbar changes
    document.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement
        // console.log(target)
        if (target.id === 'toggle') {
            openNavbar()
        }
        else if (target.classList.contains('navbarItem') || target.id === 'close' || !navbar.contains(target)) {
            closeNavbar()
        }
    })
    
    window.addEventListener("resize", () => {
        // window.innerWidth > 840 ? removeToggle() : closeNavbar() // alt
        if (window.innerWidth > 840) {
            removeToggle()
        }
        else {
            closeNavbar()
        }
    })

    // Initial loads
    date.load()
    navbarTemplate.render()

    Promise.all([countryList.load(), userCountry.load()])
        .then(() => headerTemplate.render(pageTitle, date, userCountry, countryList))
        .then(() => {
            body.style.display = 'block'
            sectionDisplay(loader)
        })
        .then(() => newsList.load("headline", navbarTemplate.selectedOption, userCountry.code))
        .then(() => {
            sectionDisplay(cardSection)
            cardsTemplate.render(newsList)
        })
        .catch(() => {
            console.log("Error loading data...")
            sectionDisplay(message)
        })
}

document.addEventListener('DOMContentLoaded', init)