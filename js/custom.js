document.addEventListener('DOMContentLoaded', function () {
    let content_pay = document.querySelector('.payment-form__content-pay');
    let add_more_products = document.querySelector('.add-more-products__button-text[type=button]');
    let content_services = document.querySelector('.payment-form__content-services');
    let button_continue = document.querySelector('.payment-form__content-services .footer-content__button[type=button]')

    add_more_products.onclick = animationTrans;

    button_continue.onclick = () => {
        drawProducts();
        animationTrans();
    }


    function animationTrans() {
        let anim_trans = document.querySelector('.payment-form_anim-trans');

        const tl_animTrans = gsap.timeline({
            defaults: {
                ease: 'power1.out'
            }
        });

        tl_animTrans
            .set(anim_trans, {
                autoAlpha: 1,
            })
            .to(anim_trans, {
                'left': '-10px',
                duration: 0.35,
                onComplete: () => {
                    content_services.classList.toggle('display-none');
                    content_pay.classList.toggle('display-none');
                }
            })
            .to(anim_trans, {
                'left': '-430px',
                duration: 0.45,
            })
            .set(anim_trans, {
                autoAlpha: 0,
            })
    }

    function drawProducts(status = 'full') {
        let input_radio_value = parseInt(document.querySelector(".form-group__input-radio[name='products'][type='radio']:checked").value);
        let products_price = parseFloat(document.querySelector(".form-group__input-radio[name='products'][type='radio']:checked").getAttribute('data-price'));
        let content_draw_products = document.querySelector('#content-draw-products');
        if (status === 'full') {
            content_draw_products.innerHTML = '';
            for (let index = 1; index <= input_radio_value; index++) {
                content_draw_products.innerHTML += `
            <div class="form-control form-control__product">
                <h4 class="form-control__title">Product ${index} <img class="${input_radio_value !== 1 ? 'delete-product show' : 'delete-product'}" src="./icons/delete.svg"></h4>
                <p class="form-control__info">Enter main keyword for the product</p>
                <input type="text" placeholder="for exapmle, sylicon wine cup" class="form-control__input">
                <p class="form-control__info">Enter link to the similar product as a reference</p>
                <input type="url" required value="https://" placeholder="https://..." class="form-control__input">
            </div>
            `
            };

        } else if (status === 'notFull') {
            content_draw_products.querySelectorAll('.form-control.form-control__product .form-control__title').forEach((element, index) => {
                element.innerHTML = `Product ${index + 1} <img class="${input_radio_value !== 1 ? 'delete-product show' : 'delete-product'}" src="./icons/delete.svg">`
            });
        }

        let button_delete_product = document.querySelectorAll('.delete-product.show');
        button_delete_product.forEach(element => {
            element.onclick = (e) => {
                deleteProduct(e.currentTarget, input_radio_value);
            }
        });

        document.querySelectorAll('.button-pay__btn-price').forEach(element => {
            element.innerHTML = products_price;
        });
    }

    function deleteProduct(element, input_radio_value) {
        let deletedElement = element.closest('.form-control.form-control__product');
        let tl_anim_delete_product = gsap.timeline();
        tl_anim_delete_product
            .set(deletedElement, {
                className: '+=form-control form-control__product delete-product-anim'
            })
            .to(deletedElement, {
                'height': '0px',
                autoAlpha: 0,
                onComplete: () => {
                    // document.querySelector(`.form-group__input-radio[name=products][type=radio][value=${input_radio_value - 1}]`).checked = true;
                    document.querySelector(`.form-group__input-radio[name='products'][type='radio'][value='${input_radio_value - 1}']`).checked = true;
                    deletedElement.remove();
                    drawProducts('notFull');
                }
            }, '+=0.6');
    }
});

function status_payment(e) {
    e.preventDefault();
    let button_submit = document.querySelector('.payment-form__content-pay .footer-content__button[type=submit]');

    button_submit.classList.add('not-hover');
    button_submit.innerHTML = "<img src='./icons/rolling.svg'/>";

    setTimeout(() => {
        let value = prompt("Введите код. Подсказка: 111");
        localStorage.setItem('href', window.location.href);
        if (value === '111') window.location.href = './paymentsuccess/index.html';
        else window.location.href = './paymenterror/index.html';
    }, 1000);
}