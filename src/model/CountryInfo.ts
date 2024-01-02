
export interface COUNTRYINFO {
    name: string,
    code: string,
    flagURL: string,
}

export default class CountryInfo implements COUNTRYINFO {

    constructor(
        private _name: string,
        private _code: string,
        private _flagURL: string,
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
    }

    get flagURL(): string {
        return this._flagURL
    }

    set flagURL(flagURL: string) {
        this._flagURL = flagURL
    }
}

