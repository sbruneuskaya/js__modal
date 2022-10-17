const checkNumInputs=(selector)=>{
const numInputs=document.querySelectorAll(selector)


    numInputs.forEach(item => {
        item.addEventListener('input', () => {
// удаляем все символы, которые не числа
//             D в верхнем регистре- означает, что ищем все не цифры
            item.value=item.value.replace(/\D/, "")
        })
    })
}

export default checkNumInputs;