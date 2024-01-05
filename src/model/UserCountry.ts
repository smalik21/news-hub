
interface USERCOUNTRY {
    code: string,
    name: string,
    onChange(listener: (code: string) => void): void,
    save(): void,
    load(): Promise<void>,
}

const apiKey: string | undefined = process.env.LOCATION_API_KEY

export default class UserCountry implements USERCOUNTRY {

    private listeners: ((code: string) => void)[] = []

    constructor(
        private _name: string = 'India',
        private _code: string = 'in',
    ) { }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get code(): string {
        return this._code
    }

    set code(code: string) {
        this._code = code
        this.listeners.forEach(listener => listener(code))
    }

    onChange(listener: (code: string) => void) {
        this.listeners.push(listener)
    }

    save(): void {

        const userCountry = {
            code: this._code,
            name: this._name,
        }

        localStorage.setItem("userCountry", JSON.stringify(userCountry))
    }

    load(): Promise<void> {

        return new Promise((resolve, reject) => {

            const storedItem: string | null = localStorage.getItem("userCountry")

            if (typeof storedItem === "string") {
                const parsedObject: { code: string, name: string } = JSON.parse(storedItem)

                this.code = parsedObject.code
                this.name = parsedObject.name

                resolve()
                return
            }

            console.log("API request made: Location")

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {

                    const lat: string = position.coords.latitude.toString()
                    const lon: string = position.coords.longitude.toString()

                    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lon}&key=${apiKey}&pretty=1`
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.code = data.results[0].components["ISO_3166-1_alpha-2"].toLowerCase()
                            this.name = data.results[0].components.country
                            this.save()
                            resolve()
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })

                }, function (error) {
                    console.error('Geolocation error:', error)
                    reject(error)
                })
            } else {
                console.log('Geolocation is not supported by this browser.')
                reject()
            }
        })
    }
}