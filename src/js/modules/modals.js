const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll=calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }


                // закрываем все модалки
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = 'block'
                document.body.style.overflow='hidden'
                document.body.style.marginRight=`${scroll}px`;
            })
        })

        close.addEventListener('click', () => {
            // закрываем все модалки
            windows.forEach(item => {
                item.style.display = 'none'
            })

            modal.style.display = 'none'
            document.body.style.overflow=''
            document.body.style.marginRight=`0px`;
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {

                // закрываем все модалки
                windows.forEach(item => {
                    item.style.display = 'none'
                })

                modal.style.display = 'none'
                document.body.style.overflow = ""
                document.body.style.marginRight=`0px`;
                // document.body.classList.remove('modal-open')
            }
        })

    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block'
            document.body.style.overflow = 'hidden'
        }, time);
    }


    // скрипт при открытии модального окна, чтобы контент не прыгал
    function calcScroll() {
        let div=document.createElement('div')

        div.style.width='50px';
        div.style.height='50px';
        div.style.overflowY='scroll';
        div.style.visibility='hidden'

        document.body.appendChild(div)

        // div.offsetWidth---получаем полную ширину с бордерами и всеми входящими величинами
        // div.clientWidth----включает только падинг и контент и не включается прокрутка
        //  т.е. если мы от полной ширины с прокруткой отнимем ширину без прокрутки, то получим саму прокрутку scrollWidth----ширина прокрутки
        let scrollWidth= div.offsetWidth-div.clientWidth
        div.remove();

        return scrollWidth;

    }

    bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModals('.phone_link', '.popup', '.popup .popup_close');
    bindModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000)
}

export default modals;