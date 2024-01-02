
import FormattedDate from "../model/FormattedDate"
import CountryList from "../model/CountryList"

interface HEADERTEMPLATE {
    renderContent(
        title: string,
        date: FormattedDate,
        countryList: CountryList,
    ): void,
}

export default class HeaderTemplate implements HEADERTEMPLATE {

    constructor() { }

    renderContent(title: string, date: FormattedDate, countryList: CountryList): void {

    }
}