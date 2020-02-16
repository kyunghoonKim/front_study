function getProducts() {
    return axios.get(`https://www.toaonly.com/api/example/product/gets`)
      .then(res => res.data)
  }

//   getProducts()
//   .then(data => console.log(data.products)) // 물품 목록이 콘솔로그에 찍힌다.

/**
 * 서버에서 받아온 물품 목록
 */
let products

window.addEventListener('DOMContentLoaded', () => {
getProducts()
    .then(data => {
    products = data.products

    // 물품의 장바구니 수량을 0으로 초기화
    products.forEach(product => {
    product.cart = 0
    })

    // 주문하기 버튼
    const btnOrder = document.querySelector('.btn-order')

    btnOrder.addEventListener('click', () => {
    let totalPrice = 0

    products.forEach(product => {
        if(product.cart) {
        // 장바구니에 있는 것만 가져와서 가격을 계산
        const price = product.cart * product.price

        console.log(`${product.name} 상품을 ${product.cart}개를 주문합니다. 가격은 ₩ ${price} 입니다.`)

        totalPrice += price

        product.cart = 0
        }
    })

    if(totalPrice) {
        console.log(`총 주문 가격은 ₩ ${totalPrice} 입니다.`)

        renderList()
    } else {
        alert('장바구니에 물품을 추가하세요.')
    }
    })


    renderList()

    //console.log(products) // 물품 목록이 출력된다.
    })
})
  
    
/**
 * 물품정보가 들어갈 엘리먼트 생성하기
 */
// function createProductElement() {
//     const row = document.createElement('div')
  
//     row.className = 'row middle aligned'
    
//     return row
//   }
function createProductElement(product, isCart) {
    const row = document.createElement('div')
  
    const imageCol = document.createElement('div')    // 상품 이미지 정보가 들어갈 태그
    const uiImage = document.createElement('div')     // 상품 이미지를 감싸게 될 태그
    const image = document.createElement('img')       // 상품 이미지가 들어갈 img 태그
  
    const infoCol = document.createElement('div')     // 상품 정보가 들어갈 태그
    const name = document.createElement('div')        // 상품 이름이 들어갈 태그
    const price = document.createElement('div')       // 상품 가격이 들어갈 태그
    const stockWrapper = document.createElement('div')// 상품 재고 부분을 감싸게 될 태그
    const stock = document.createElement('span')      // 상품 재고가 들어갈 태그
  
    const uiButtons = document.createElement('div')       // 장바구니담기버튼이 들어갈 태그
    const btnAddCart = document.createElement('button')   // 장바구니담기버튼이 될 태그
    const iconCartPlus = document.createElement('i')      // 장바구니담기버튼에 들어갈 아이콘을 담당할 태그
  
    // 생성된 태그도 `querySelector` 로 가져온 태그와 마찬가지로 class나 textContent 를 변경할 수 있다.
    row.className = 'row middle aligned'
    row.style.borderBottom = '1px solid #efefef'
  
    // 각 태그들에 들어갈 class 속성값을 지정해준다.
    imageCol.className = 'column four wide'
    uiImage.className = 'ui image'
    infoCol.className = 'column twelve wide info'
    name.className = 'name'
    price.className = 'price'
    stockWrapper.className = 'stock-wrapper'
    stock.className = 'stock'
    uiButtons.className = 'ui buttons icon tiny'
    btnAddCart.className = 'ui button tiny'
    iconCartPlus.className = 'icon cart plus'
  
    image.src = product.thumbnail           // 상품 이미지 넣기
    name.textContent = product.name         // 상품 이름 넣기
    price.textContent = `₩ ${product.price}`// 상품 가격 넣기
    stock.textContent = isCart === true ? product.cart : product.stock       // 상품 재고 넣기
  
    /**
     * 아래 태그 구조처럼 만들기 위해 append 메소드를 사용해서 태그를 넣어주기
     * 
     * <div class="column four wide"> <!-- imageCol 변수 -->
     *   <div class="ui image">       <!-- uiImage 변수 -->
     *     <img src="..." />          <!-- image 변수 -->
     *   </div>
     * </div>
     */
    imageCol.append(uiImage)
    uiImage.append(image)
  
    /**
   * 아래 태그 구조처럼 만들기 위해 append 메소드를 사용해서 태그를 넣어주기
   * 
   * <div class="column twelve wide">     <!-- infoCol 변수 -->
   *   <div class="name">...</div>        <!-- name 변수 -->
   *   <div class="price">...</div>       <!-- price 변수 -->
   *   <div class="stock-wrapper">        <!-- stockWrapper 변수 -->
   *     재고 : 
   *     <span class="stock">...</span>   <!-- stock 변수 -->
   *   </div>
   *   <div class="ui buttons icon tiny"> <!-- uiButtons 변수 -->
   *     ...
   *   </div>
   * </div>
   */
  infoCol.append(name, price, stockWrapper, uiButtons)
  stockWrapper.append(isCart ? '수량 : ' : '재고 : ', stock)

  if(!isCart) {
    // 물품목록에 들어갈 물품일 경우
    const btnAddCart = document.createElement('button')   // 장바구니담기버튼이 될 태그
    const iconCartPlus = document.createElement('i')      // 장바구니담기버튼에 들어갈 아이콘을 담당할 태그

    iconCartPlus.className = 'icon cart plus'
    btnAddCart.className = 'ui button tiny'

    if(product.stock) {
      // 상품 재고가 있을 경우 `btnAddCart`에 `click`이벤트를 부여한다.

      btnAddCart.addEventListener('click', () => {
        // 재고를 감소시킨다.
        --product.stock

        // 장바구니 수량을 증가시킨다.
        ++product.cart

        // renderList 함수를 호출하여 변경된 사항으로 다시 렌더링 한다.
        renderList()
      })
    } else {
      // 상품 재고가 없다면 버튼을 비활성화 시킨다.
      btnAddCart.disabled = true
    }

    /**
     * 아래 태그 구조처럼 만들기 위해 append 메소드를 사용해서 태그를 넣어주기
     * 
     * <div class="ui buttons icon tiny"> <!-- uiButtons 변수 -->
     *   <button class="ui button tiny">  <!-- btnAddCart 변수 -->
     *     <i class="icon cart plus" />   <!-- iconCartPlus 변수 -->
     *     장바구니 담기
     *   </button>
     * </div>
     */
    uiButtons.append(btnAddCart)
    btnAddCart.append(iconCartPlus, ' 장바구니 담기')
  } else {
    // 장바구니에 들어갈 물품일 경우

    const btnPlus = document.createElement('button')  // 추가버튼
    const iconPlus = document.createElement('i')      // 추가버튼에 들어갈 아이콘
    const btnMinus = document.createElement('button') // 빼기버튼
    const iconMinus = document.createElement('i')     // 빼기버튼에 들어갈 아이콘
    const btnTrash = document.createElement('button') // 삭제버튼
    const iconTrash = document.createElement('i')     // 삭제버튼에 들어갈 아이콘

    iconPlus.className = 'icon plus'
    btnPlus.className = 'ui button blue'

    if(product.stock) {
      // 물품의 재고가 있을 경우에 추가 버튼을 클릭했을 때의 동작을 정의해준다.
      btnPlus.addEventListener('click', () => {
        // 장바구니 수량을 증가시킨다.
        ++product.cart

        // 물품의 재고를 감소시킨다.
        --product.stock

        // renderList 함수를 호출하여 변경된 사항으로 다시 렌더링 한다.
        renderList()
      })
    } else {
      // 재고가 없을 경우에는 버튼을 비활성화 시킨다.
      btnPlus.disabled = true
    }

    iconMinus.className = 'icon minus'
    btnMinus.className = 'ui button blue basic'

    // 빼기 버튼을 클릭했을 때의 동작을 정의해준다.
    btnMinus.addEventListener('click', () => {
      // 물품의 장바구니 수량을 감소시킨다.
      --product.cart

      // 물품의 재고를 증가시킨다.
      ++product.stock

      // renderList 함수를 호출하여 변경된 사항으로 다시 렌더링 한다.
      renderList()
    })

    iconTrash.className = 'icon trash'
    btnTrash.className = 'ui button red'

    // 삭제 버튼을 클릭했을 때의 동작을 정의해준다.
    btnTrash.addEventListener('click', () => {
      // 장바구니에 있던 수량을 재고에 더한다.
      product.stock += product.cart

      // 장바구니 수량을 0으로 한다.
      product.cart = 0

      // renderList 함수를 호출하여 변경된 사항으로 다시 렌더링 한다.
      renderList()
    })

    /**
     * 아래 태그 구조처럼 만들기 위해 append 메소드를 사용해서 태그를 넣어주기
     * 
     * <div class="ui buttons icon tiny">       <!-- uiButtons 변수 -->
     *   <button class="ui button blue">        <!-- btnPlus 변수 -->
     *     <i class="icon plus" />              <!-- iconPlus 변수 -->
     *     추가
     *   </button>
     *   <button class="ui button blue basic">  <!-- btnMinus 변수 -->
     *     <i class="icon minus" />             <!-- iconMinus 변수 -->
     *     빼기
     *   </button>
     *   <button class="ui button red">         <!-- btnTrash 변수 -->
     *     <i class="icon trash" />             <!-- iconTrash 변수 -->
     *     삭제
     *   </button>
     * </div>
     */
    uiButtons.append(btnPlus, btnMinus, btnTrash)
    btnPlus.append(iconPlus, ' 추가')
    btnMinus.append(iconMinus, ' 빼기')
    btnTrash.append(iconTrash, ' 삭제')
  }

  // row에 imageCol과 infoCol를 넣어준다.
  row.append(imageCol, infoCol)

  return row
}

  /**
 * 물품목록과 장바구니에 물품 그리기
 */
// function renderList() {
//     const $productList = document.querySelector('.product .ui.grid')  // 물품 목록이 들어갈 자리
//     const $cartList = document.querySelector('.cart .ui.grid')  // 장바구니 목록이 들어갈 자리
  
//     products.forEach(product => {
//       // 물품 목록을 추가할 부분
//       console.log(createProductElement()) // <div class="row middle aligned"></div> 가 출력 된다.
//     })
//   }
  /**
 * 물품목록과 장바구니에 물품 그리기
 */
// function renderList() {
//     const $productList = document.querySelector('.product .ui.grid')  // 물품 목록이 들어갈 자리
//     const $cartList = document.querySelector('.cart .ui.grid')  // 장바구니 목록이 들어갈 자리
  
//     // 기존에 렌더됐던 물품들 제거
//     $productList.querySelectorAll('.row').forEach($el => {
//       $el.remove()
//     })
  
//     products.forEach(product => {
//       // 물품 목록을 추가할 부분
//       $productList.append(createProductElement(product))
//     })
//   }
  /**
 * 물품목록과 장바구니에 물품 그리기
 */
function renderList() {
    const $productList = document.querySelector('.product .ui.grid')  // 물품 목록이 들어갈 자리
    const $cartList = document.querySelector('.cart .ui.grid')  // 장바구니 목록이 들어갈 자리
  
    // 기존에 렌더됐던 물품들 제거
    $productList.querySelectorAll('.row').forEach($el => {
      $el.remove()
    })
    
    // 기존에 렌더됐던 물품들 제거
    $cartList.querySelectorAll('.row').forEach($el => {
      $el.remove()
    })
  
    products.forEach(product => {
      $productList.append(createProductElement(product, false))
  
      // 장바구니에 해당 상품의 수량이 있으면 장바구니에 렌더링
      if(product.cart) {
        $cartList.append(createProductElement(product, true))
      }
    })
  }
  