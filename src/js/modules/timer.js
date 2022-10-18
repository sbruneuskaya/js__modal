const timer = (id, deadline) => {


    // добавление 0, чтобы были данные не "9" дней, а "09" дней
    const addZero = (num) => {
        if (num <= 9) {
            return '0'+ num;
        }else {
            return num;
        }
    }

    // получает время(дедлайн) и выдает время, которое осталось до конца акции
    const getTimeRemaining = (endTime) => {

        // получаем разницу между переданным временем и временем сейчас( Date.parse привет данные ввиде строки, вернёт время в милисекундак с 1970г
        const t = Date.parse(endTime) - Date.parse(new Date())

        // t/1000-----переводим все миллисекунды в миллисекунды
        // от получившегося %60-------получаем сами секунды(процент от деления) и Math.floor округляем

        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        }
    }

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);


        // запускаем функцию updateClock() раньше, до того как она запустится с помощью
        // сетинтервала, для того, чтобы сразу отрисовывалась правильная дата в таймере
        // и при обновлении страницы не выскакивали дефолтные данные
        updateClock()
        // определяем сколько времени осталось до дедлайна + эта функция каждую секунду возвращает новое значение
        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadline);
}

export default timer;