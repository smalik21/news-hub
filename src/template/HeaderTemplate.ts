
import FormattedDate from "../model/FormattedDate"
import UserCountry from "../model/UserCountry"
import CountryList from "../model/CountryList"
import CountryInfo from "../model/CountryInfo"
import NewsList from "../model/NewsList"
import CardsTemplate from "./CardsTemplate"

interface HEADERTEMPLATE {
    render(
        title: string,
        date: FormattedDate,
        userCountry: UserCountry,
        countryList: CountryList,
        newsList: NewsList,
        cardsTemplate: CardsTemplate,
    ): void,
}

export default class HeaderTemplate implements HEADERTEMPLATE {

    constructor() { }

    render(title: string, date: FormattedDate, userCountry: UserCountry, countryList: CountryList): void {

        const documentTitle = document.querySelector("title") as HTMLTitleElement
        documentTitle.textContent = title

        const pageTitle = document.querySelector("#pageTitle") as HTMLHeadingElement
        pageTitle.textContent = title

        const dateElement = document.querySelector("#date") as HTMLParagraphElement
        dateElement.textContent = date.date

        const countrySelect = document.querySelector("#country") as HTMLSelectElement

        countryList.list.forEach((country: CountryInfo) => {

            const countryOption = document.createElement("option") as HTMLOptionElement
            countryOption.value = country.code
            countryOption.textContent = country.name

            if (country.code === userCountry.code) {
                countrySelect.value = country.code
                countrySelect.style.backgroundImage = `url(${country.flagURL})`
            }

            countrySelect.append(countryOption)
        })

        countrySelect.addEventListener("change", () => {
            const selectedCountry: CountryInfo | undefined = countryList.list.find(country => country.code === countrySelect.value)
            if (selectedCountry) {
                userCountry.code = selectedCountry.code
                userCountry.name = selectedCountry.name
                countrySelect.style.backgroundImage = `url(${selectedCountry.flagURL})`
            }
        })
    }
}