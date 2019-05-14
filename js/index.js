const siteContent = {
    nav: {
        "nav-item-1": "Services",
        "nav-item-2": "Product",
        "nav-item-3": "Vision",
        "nav-item-4": "Features",
        "nav-item-5": "About",
        "nav-item-6": "Contact",
        "img-src": "img/logo.png"
    },
    cta: {
        h1: "DOM Is Awesome",
        button: "Get Started",
        "img-src": "img/header-img.png"
    },
    mainContent: {
        "features-h4": "Features",
        "features-content":
            "Features content elementum magna eros, ac posuere elvit tempus et. Suspendisse vel tempus odio, in interdutm nisi. Suspendisse eu ornare nisl. Nullam convallis augue justo, at imperdiet metus scelerisque quis.",
        "about-h4": "About",
        "about-content":
            "About content elementum magna eros, ac posuere elvit tempus et. Suspendisse vel tempus odio, in interdutm nisi. Suspendisse eu ornare nisl. Nullam convallis augue justo, at imperdiet metus scelerisque quis.",
        "middle-img-src": "img/mid-page-accent.jpg",
        "services-h4": "Services",
        "services-content":
            "Services content elementum magna eros, ac posuere elvit tempus et. Suspendisse vel tempus odio, in interdutm nisi. Suspendisse eu ornare nisl. Nullam convallis augue justo, at imperdiet metus scelerisque quis.",
        "product-h4": "Product",
        "product-content":
            "Product content elementum magna eros, ac posuere elvit tempus et. Suspendisse vel tempus odio, in interdutm nisi. Suspendisse eu ornare nisl. Nullam convallis augue justo, at imperdiet metus scelerisque quis.",
        "vision-h4": "Vision",
        "vision-content":
            "Vision content elementum magna eros, ac posuere elvit tempus et. Suspendisse vel tempus odio, in interdutm nisi. Suspendisse eu ornare nisl. Nullam convallis augue justo, at imperdiet metus scelerisque quis."
    },
    contact: {
        "contact-h4": "Contact",
        address: "123 Way 456 Street Somewhere, USA",
        phone: "1 (888) 888-8888",
        email: "sales@greatidea.io"
    },
    footer: {
        copyright: "Copyright Great Idea! 2018"
    }
}

// Helpers
// const qs = selector => document.querySelector(selector)
const $qs = document.querySelector.bind(document)
const $qsa = document.querySelectorAll.bind(document)
Element.prototype.$qsa = function(...args) {
    return this.querySelectorAll.call(this, args)
}
Element.prototype.$qs = function(...args) {
    return this.querySelector.call(this, args)
}

// Text Data
const { nav, cta, mainContent, contact, footer } = siteContent

// DOM Element Refs
const $header = $qs(".container header")
const $cta = $qs(".container .cta")
const $mainContent = $qs(".container .main-content")
const $contact = $qs(".container .contact")
const $footer = $qs(".container footer")

const $textContents = $mainContent.$qsa(".text-content")

// Header
$header.$qsa("nav a").forEach(($link, i) => {
    $link.textContent = nav[`nav-item-${i + 1}`]
    $link.style.color = "green"
})
$header.$qs("img").setAttribute("src", nav["img-src"])

// CTA
$cta.$qs(".cta-text h1").innerHTML = cta.h1.replace(/\s/g, "<br/>")
$cta.$qs("button").textContent = cta.button
$cta.$qs("img").setAttribute("src", cta["img-src"])

// Main Content
const h4Keys = Object.keys(mainContent).filter(key => key.match(/.-h4/))
const pKeys = Object.keys(mainContent).filter(key => key.match(/.-content/))

$textContents.forEach(($textContent, index) => {
    const h4Text = mainContent[h4Keys[index]]
    const pText = mainContent[pKeys[index]]
    $textContent.$qs("h4").textContent = h4Text
    $textContent.$qs("p").textContent = pText
})

$mainContent.$qs("img").setAttribute("src", mainContent["middle-img-src"])

// Contact
const contactPKeys = Object.keys(contact).filter(key => !key.includes("-"))

let address = contact.address.split(" ")
address.splice(4, 0, "<br/>")
address = address.join(" ")
contact.address = address

$contact.$qs("h4").textContent = contact["contact-h4"]
$contact.$qsa("p").forEach(($p, index) => {
    $p.innerHTML = contact[contactPKeys[index]]
})

// Footer
$footer.$qs("p").textContent = footer.copyright
