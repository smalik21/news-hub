import './css/style.css'

import HeaderTemplate from './template/headerTemplate'

const init = (): void => {

    const app = document.querySelector("#app") as HTMLDivElement

    const header = document.createElement("header") as HTMLHeadElement
    header.id = "pageHeader"
    // header.style.backgroundColor = 'blue'
    app.append(header)

    const navbar = document.createElement("nav") as HTMLDivElement
    navbar.id = "pageNavbar"
    // navbar.style.height = '2rem'
    // navbar.style.backgroundColor = 'red'
    app.append(navbar)
}

document.addEventListener('DOMContentLoaded', init)