
export interface FORMATTEDDATE {
    date: string,
    loadDate(): void,
}

const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
}

export default class FormattedDate implements FORMATTEDDATE {

    constructor(
        private _date: string,
    ) { }

    get date(): string {
        return this._date
    }

    loadDate(): void {
        const currentDate: Date = new Date()
        const formattedDate: string = currentDate.toLocaleDateString('en-US', options);
        this._date = formattedDate
    }
}