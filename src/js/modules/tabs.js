const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display="block") => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    let hideTabContent = () => {
        content.forEach(item => {
            item.style.display = 'none'
        })

        tab.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    let showTabContent = (i = 0) => {
        content[i].style.display = display
        tab[i].classList.add(activeClass)
    }

    // вызываем тут для отрисовки первого таба в верстке
    hideTabContent()
    showTabContent()

    // навешиваем обработчик события на место, которое объединят в себе все табы(родитель всех табов)
    header.addEventListener('click', (e) => {
        const target = e.target
        // проверяем, что действительно кликнули в один из табов(пока не важно в какой). в if придет элемент с точкой, нужно ее убрать, потому что использую classList.contains, а replace первым параметром принимает регулярное выражение
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            // определяем в какой именно по счету элемент кликнули

            // перебираем табы один за другим и сравниваем, если таб к который кликнули равен тому табу, который перебирается, то мы забираем его индекс и помещаем в функцию
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })

        }

    })

}

export default tabs;