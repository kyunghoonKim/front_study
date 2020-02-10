// const quantity = document.querySelector('span.quantity')
// // span.quantity는 span태그의 class = 'quantity' 를 의미한다.
// quantity.textContent = '1'

// const button = document.querySelectorAll('button')
// button[0].setAttribute('id', 'btn')
// button[1].id = 'btnbtnbtn'
// button[2].name = 'buttonName'
// button[3].type = 'button'
// //button.type = 'reset'
// //button.type = 'submit'
// button[4].className = 'quantitytyty'

// button[5].addEventListener('click', e => {
//     console.log(e.currentTarget.textContent) // 버튼 태그 내용이 찍힌다.
//   })
  
// const input = document.querySelector('input[type="text"]')

// // `addEventListener` 로 `keypress` 이벤트가 발생했을 때 수행할 함수를 넣어준다.
// input.addEventListener('keypress', e => {
//     console.log(e.currentTarget.value) // 인풋 태그의 입력값이 찍힌다.
// })
  



const buttons = document.querySelectorAll('.button-wrapper button')

// 물품 수량을 저장할 변수
let quantityValue = 0

// `querySelector` 메소드로 수량이 표시될 태그를 가져온다.
const quantity = document.querySelector('.quantity-wrapper span')

buttons.forEach(button => {
    button.addEventListener('click', e => {
      // `e.currentTarget.value` 은 `string` 타입이기 때문에 `Number` 메소드를 통해 숫자로 변환한다.
      quantityValue += Number(e.currentTarget.value)
  
        // 수량이 0보다 작다면 수량을 0으로 저장한다.
        if(quantityValue < 0) {
            quantityValue = 0
    
            console.log(`수량은 0보다 커야 합니다.`)
        } else {
            console.log(`수량은 ${quantityValue} 입니다.`) // 물품 수량이 찍힌다.
        }

        // 물품 수량을 저장한 `quantityValue` 을 `quantity` 의 내용으로 변경한다.
        quantity.textContent = quantityValue

      })
  })
    