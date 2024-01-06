
import HomeFilledIcon from '../assets/home-filled-icon.png'

interface NAVBAR {
    navbar: HTMLUListElement | undefined
    selectedOption: string,
    onChange(listener: (selectedOption: string) => void): void
    clear(): void,
    updateActiveNavItem(selectedOption: string): void,
    render(): void,
}

const navOptions: string[] = ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"]

export default class NavbarTemplate implements NAVBAR {

    navbar: HTMLUListElement | undefined
    private listeners: ((selectedOption: string) => void)[] = []

    constructor(
        private _selectedOption: string = "home"
    ) {
        this.navbar = document.querySelector("#navbar") as HTMLUListElement
    }

    get selectedOption(): string {
        return this._selectedOption.toLowerCase()
    }

    set selectedOption(option: string) {
        this._selectedOption = option
        this.listeners.forEach(listener => listener(option))
    }

    onChange(listener: (selectedOption: string) => void): void {
        this.listeners.push(listener)
    }

    clear(): void {
        this.navbar!.innerHTML = ''
    }

    updateActiveNavItem(selectedOption: string): void {

        this.selectedOption = selectedOption

        const navItems = document.querySelectorAll('.navbarItem')

        navItems.forEach(item => {
            const nav: string = item.textContent!.toLocaleLowerCase()
            if (nav === selectedOption) {
                item.classList.add('activeItem')
            } else {
                item.classList.remove('activeItem')
            }
        })
    }

    render(): void {

        const home = document.createElement("li") as HTMLLIElement
        home.className = 'navbarItem'
        home.textContent = 'Home'
        home.classList.add('activeItem')

        const homeImg = document.createElement("img") as HTMLImageElement
        homeImg.src = HomeFilledIcon
        homeImg.id = 'homeIcon'
        home.append(homeImg)

        this.navbar!.append(home)

        home.addEventListener("mouseover", () => {
            homeImg.style.opacity = '90%'
        })
        home.addEventListener("mouseleave", () => {
            homeImg.style.opacity = '60%'
        })

        navOptions.forEach(nav => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = 'navbarItem'
            li.textContent = nav
            this.navbar!.append(li)
        })

        document.querySelectorAll('.navbarItem').forEach(item => {
            item.addEventListener('click', () => {
                const option = item.textContent!.toLocaleLowerCase()
                this.updateActiveNavItem(option)
            })
        })
    }
}