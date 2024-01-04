
import HomeFilledIcon from '../assets/home-filled-icon.png'

interface NAVBAR {
    option: string,
    updateActiveNavItem(selectedOption: string): void,
    render(): void,
}

const navOptions: string[] = ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"]

export default class NavbarTemplate implements NAVBAR {

    constructor(
        private _option: string = 'general'
    ) { }

    get option(): string {
        return this._option.toLowerCase()
    }

    set option(option: string) {
        this._option = option
    }

    updateActiveNavItem(selectedOption: string): void {

        const navItems = document.querySelectorAll('.navbarItem')

        navItems.forEach(item => {
            const nav: string = item.textContent?.toLocaleLowerCase() ?? "general"

            if (nav === selectedOption) {
                item.classList.add('activeItem')
            } else {
                item.classList.remove('activeItem')
            }
        })
    }

    render(): void {

        const navbar = document.querySelector("#navbar") as HTMLUListElement

        const home = document.createElement("li") as HTMLLIElement
        home.className = 'navbarItem'
        home.classList.add('activeItem')
        home.style.borderLeft = '2px solid #72727252'

        const homeImg = document.createElement("img") as HTMLImageElement
        homeImg.src = HomeFilledIcon
        homeImg.id = 'homeIcon'
        home.append(homeImg)

        navbar.append(home)

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
            navbar.append(li)
        })

        document.querySelectorAll('.navbarItem').forEach(item => {
            item.addEventListener('click', () => {
                this._option = item.textContent?.toLocaleLowerCase() ?? 'general'
                this.updateActiveNavItem(this._option)
            })
        })
    }
}