
import CountryInfo from "./countryInfo"

export interface COUNTRYLIST {
    list: CountryInfo[],
    addItem(country: CountryInfo): void,
    loadCountry(): void,
}

export default class CountryList implements COUNTRYLIST {

    constructor(
        private _list: CountryInfo[] = [],
    ) { }

    get list(): CountryInfo[] {
        return this._list
    }

    addItem(country: CountryInfo): void {
        this._list.push(country)
    }

    loadCountry(): void {

    }
}