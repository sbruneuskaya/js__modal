import checkNumInputs from './checkNumInputs'


const forms = (state) => {
    const form = document.querySelectorAll('form'),
        // использую для очистки инпутов после отправки на сервер
        inputs = document.querySelectorAll('input');


    // обработка ввода данных(чтобы пользователь мог ввести в инпут телефона только цифры)
    checkNumInputs('input[name="user_phone"]')


    // для оповещения пользователя об отправке формы
    const message = {
        loading: 'загрузка',
        success: "спасибо! скоро с Вами свяжется нам менеджер!",
        error: "что-то пошло не так"

    }

    // отправка данных на сервер через fetch(который вернет promise и его нужно будет обработать)
    const postDate = async (url, data) => {
        document.querySelector('.status').textContent = message.loading
        // с помощью await в переменную res будет записан промис, который вернется от сервера, если бы без async await, в res был бы андефайнд, потому что код бы пошелработать дальше не дождавшись ответа
        let res = await fetch(url, {
            method: "POST",
            body: data
        })

        // обработка промиса
        return await res.text()
    }

    const clearInputs = () => {
        inputs.forEach(el => {
            el.value = ""
        })
    }


    // перебираем все формы
    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault()

            // создаем блок в котором будем показывать сообщение в зависимости от статуса
            let statusForm = document.createElement('div');
            statusForm.classList.add('status')
            item.appendChild(statusForm)

            // собираю все данные которые есть в форме, это и будет тело запроса
            const formDate = new FormData(item)

            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    if(state.hasOwnProperty(key)){
                        formDate.append(key, state[key])
                    }
                }
            }


            // отправляем запрос на сервер по адресу 'assets/server.php' с данными которые хранятся в formDate
            postDate('http://sveta_server', formDate)
                // сейчас вернулся какой-то текст return await res.text()
                .then(res => {
                    console.log(res)
                    statusForm.textContent = message.success
                })
                .catch(() => statusForm.textContent = message.error)
                // finally выполнится независимо от результата, нужен для очистки инпутов + удалить статус-сообщение через какой-то время
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusForm.remove()
                    }, 6000)
                })
        })
    })
}

export default forms;