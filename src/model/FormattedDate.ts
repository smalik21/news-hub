
export interface FORMATTEDDATE {
    date: string,
    load(): void,
}

const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
}

export default class FormattedDate implements FORMATTEDDATE {

    constructor(
        private _date: string = "Unable to Retrieve Current Date...",
    ) { }

    get date(): string {
        return this._date
    }

    load(): void {
        const currentDate: Date = new Date()
        const formattedDate: string = currentDate.toLocaleDateString('en-US', options);
        this._date = formattedDate
    }
}