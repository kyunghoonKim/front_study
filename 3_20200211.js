// axios.get('https://5cfaac38f26e8c00146d0a96.mockapi.io/api/fruits')
//   .then(res => {
//     alert(JSON.stringify(res.data, null, 4))  // 서버에서 받아온 데이터가 찍힐 것이다.
//   })


  // const fruits = [
  //   [ "🍎", 5 ],
  //   [ "🍊", 6 ],
  //   [ "🍌", 4 ],
  //   [ "🍉", 10 ],
  //   [ "🍇", 7 ],
  //   [ "🍓", 6 ],
  // ]
  
  // // `table` 태그 생성
  // const table = document.createElement('table')
  
  // fruits.forEach(([ fruit, count ]) => {
  //   // `tr` 태그 생성
  //   const tr = document.createElement('tr')
  
  //   // 과일과 수량이 들어갈 `td` 태그 생성
  //   const fruitCell = document.createElement('td')
  //   const countCell = document.createElement('td')
  
  //   fruitCell.textContent = fruit
  //   countCell.textContent = `${count} 개`
  
  //   tr.append(fruitCell, countCell)
  
  //   table.append(tr)
  // })
  
  // document.body.append(table)

  axios.get('https://5cfaac38f26e8c00146d0a96.mockapi.io/api/fruits')
  .then((res) => {
    const data = res.data
    const fruits = [] // 이차원 배열이 들어갈 변수

    // Object.keys(data).forEach(fruit => {
    //   fruits.push([ fruit, data[fruit] ])
    // })
    // `table` 태그 생성
    const table = document.createElement('table')

    Object.keys(data).forEach(fruit => {
      //fruits.push([ fruit, data[fruit] ])

      // fruits.forEach(([ fruit, count ]) => {
        // `tr` 태그 생성
        const tr = document.createElement('tr')
  
        // 과일과 수량이 들어갈 `td` 태그 생성
        const fruitCell = document.createElement('td')
        const countCell = document.createElement('td')
  
        fruitCell.textContent = fruit
        countCell.textContent = `${data[fruit]} 개`
  
        tr.append(fruitCell, countCell)
  
        table.append(tr)
      })
    // })
    document.body.append(table)
  })