const images=()=>{
const imgPopup=document.createElement('div'),
    workSection=document.querySelector('.works'),
    bigImage=document.createElement('img');

    imgPopup.classList.add('popup');

    // помещаю в секцию созданный див
    workSection.appendChild(imgPopup)

    imgPopup.style.justifyContent='center';
    imgPopup.style.alignItems='center';
    imgPopup.style.display='none';

    // помещаю в див большую картинку
    imgPopup.appendChild(bigImage)


    workSection.addEventListener('click', (e)=>{
        e.preventDefault()
        const target=e.target;


        // проверяю поддерживает ли вообще событие таргет и содержит ли определенный класс
        if(target&& target.classList.contains('preview')){
            imgPopup.style.display='flex';
            const path= target.parentNode.getAttribute('href')
            bigImage.setAttribute('src', path)
        }


        // target.matches('div.popup')----ищу совпадения
        if(target && target.matches('div.popup')){
            imgPopup.style.display='none';
        }
    })
}

export default images;