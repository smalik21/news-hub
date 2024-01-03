import './css/style.css'

import HeaderTemplate from './template/HeaderTemplate'
import FormattedDate from './model/FormattedDate'
import UserCountry from './model/UserCountry'
import CountryList from './model/CountryList'

const init = (): void => {

    const date: FormattedDate = new FormattedDate()
    const userCountry: UserCountry = new UserCountry()
    const countryList: CountryList = new CountryList()
    const headerTemplate: HeaderTemplate = new HeaderTemplate()

    const body = document.querySelector("body") as HTMLBodyElement

    date.load()

    Promise.all([countryList.load(), userCountry.load()])
        .then(() => headerTemplate.render("NewsHub", date, userCountry, countryList))
        .then(() => body.style.display = 'block')
        .catch(error => console.log(error))
}

document.addEventListener('DOMContentLoaded', init)