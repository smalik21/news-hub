
import CountryInfo from "./CountryInfo"

interface COUNTRYLIST {
    list: CountryInfo[],
    save(): void,
    load(): Promise<void>,
}

const availableLocations: string[] = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]

export default class CountryList implements COUNTRYLIST {

    constructor(
        private _list: CountryInfo[] = [],

    ) { }

    get list(): CountryInfo[] {
        return this._list
    }

    save(): void {
        localStorage.setItem("countryList", JSON.stringify(this._list))
    }

    load(): Promise<void> {

        return new Promise((resolve, reject) => {

            const storedList: string | null = localStorage.getItem("countryList")

            if (typeof storedList === "string" && storedList.length > 50) {

                const parsedList: { _name: string, _code: string, _flagURL: string }[] = JSON.parse(storedList)

                parsedList.map(item => {
                    const newItem = new CountryInfo(item._name, item._code, item._flagURL)
                    this._list.push(newItem)
                })

                resolve()
                return
            }

            console.log("API request made: Countries")

            this._list = []

            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(data => {

                    data.forEach((country: { cca2: string; name: { common: string }; flags: { png: string }; }) => {

                        const code: string = country.cca2.toLowerCase(); // Use ISO 3166-1 alpha-2 code
                        const name: string = `${country.name.common} (${country.cca2.toLowerCase()})` // Country name and ISO 3166-1 alpha-2 code
                        const flagURL: string = country.flags.png

                        if (availableLocations.includes(code)) {
                            const newCountry: CountryInfo = new CountryInfo(name, code, flagURL)
                            this._list.push(newCountry)
                        }
                    })

                    this._list.sort((a: CountryInfo, b: CountryInfo) => a.name.localeCompare(b.name))
                    this.save()

                    resolve()
                })
                .catch(error => {
                    console.error('Error fetching country data:', error)
                    reject(error)
                })
        })

    }
}