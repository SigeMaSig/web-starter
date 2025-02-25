const BASE_URL = 'http://localhost:8000';


window.onload = async () => {
  await loadData()
}
const loadData = async () =>{
      // 1. Load user all api
      const response = await axios.get(`${BASE_URL}/users`)
      console.log(response.data)
  
      const userDom = document.getElementById('user')
      let htmlData = '<div>'
      //2. user after load to html 
      for(let i =0 ; i<response.data.length;i++){
          let user = response.data[i]
          htmlData += `<div>
          ${user.id} ${user.firstname} ${user.lastname} ${user.age}
          <a href='registerform.html?id=${user.id}'><button>Edit</button></a>
          <button class='delete' data-id='${user.id}'>Delete</button>
          </div>`
      }
      htmlData += '</div>'
  
      userDom.innerHTML = htmlData
  
      const deleteDOM = document.getElementsByClassName('delete')
  
      for(let i = 0 ; i < deleteDOM.length; i++){
          deleteDOM[i].addEventListener('click', async (event)=>{
              // ดีง ID ออกมา
              const id = event.target.dataset.id
  
              try {
                  await axios.delete(`${BASE_URL}/users/${id}`)
                  loadData() // resursive function = เรียก function ตัวเองซ้ำอีกรอบ
              } catch (error) {
                  console.log('error',error)
              }
          })
      }
}
