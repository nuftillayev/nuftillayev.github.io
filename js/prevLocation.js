document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".footer-content .footer-content__wrapping-button .footer-content__button[type='button']").onclick = () => {
        window.location.href = localStorage.getItem('href');
    }
});