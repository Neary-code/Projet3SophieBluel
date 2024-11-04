let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    modal = target
    modal.addEvenListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEvenListener("click", closeModal)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEvenListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEvenListener("click", closeModal)
    modal = null
}

document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});