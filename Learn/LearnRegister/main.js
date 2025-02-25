const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE' // default
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if(id){
        mode = 'EDIT'
        selectedId = id
        
        // 1. เราจะดึงข้อมูล user  เก่าออกมาก่อน
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`)
            const user = response.data

            let fristnameDom = document.querySelector('input[name=firstname]')
            let lastnameDom = document.querySelector('input[name=lastname]')
            let ageDom = document.querySelector('input[name=age]')
            let discriptionDom = document.querySelector('textarea[name=description]')

            fristnameDom.value = user.firstname
            lastnameDom.value = user.lastname
            ageDom.value = user.age
            discriptionDom.value = user.description

            let genderDom = document.querySelectorAll('input[name=gender]')
            let interestDoms = document.querySelectorAll('input[name=interest]') 
            console.log('interest',user.interest)
            for(let i = 0 ; i<genderDom.length;i++){
                if(genderDom[i].value == user.gender){
                    genderDom[i].checked = true
                }
            }

            for(let i = 0 ; i < interestDoms.length;i++){
                if(user.interest.includes(interestDoms[i].value)){
                    interestDoms[i].checked = true
                }
            }
            
        } catch (error) {
            console.log('error',error)
        }
        // 2. เราจะนำข้อมูล user กลับใส่เข้าไปใน input html
    }
}

const validatedata = (userData) =>{
    let errors = []
    if(!userData.firstname){
        errors.push('กรุณาใส่ชื่อจริง')
    }
    if(!userData.lastname){
        errors.push('กรุณาใส่นามสกุล')
    }
    if(!userData.age){
        errors.push('กรุณาใส่อายุ')
    }
    if(!userData.gender){
        errors.push('กรุณาใส่เพศ')
    }
    if(!userData.interest){
        errors.push('กรุณาใส่สิ่งที่สนใจ')
    }
    if(!userData.description){
        errors.push('กรุณาใส่รายละเอียด')
    }
    return errors
}
const submitData =  async() => {
    let fristnameDom = document.querySelector('input[name=firstname]')
    let lastnameDom = document.querySelector('input[name=lastname]')
    let ageDom = document.querySelector('input[name=age]')

    let genderDom = document.querySelector('input[name=gender]:checked') || {}
    let interestDoms = document.querySelectorAll('input[name=interest]:checked ') ||{} 
    
    let discriptionDom = document.querySelector('textarea[name=description]')

    let messageDOM = document.getElementById('message')

    try{
    let interest = ''
    
    for (let i = 0 ; i<interestDoms.length;i++ ){
        interest += interestDoms[i].value
        if (i != interestDoms.length-1){
            interest += ','
        }
    }
    let userData = {
        firstname: fristnameDom.value,
        lastname: lastnameDom.value,
        age: ageDom.value,
        gender: genderDom.value,
        description:discriptionDom.value,
        interest: interest
    }

        console.log('Submit data' ,userData)

        const errors = validatedata(userData)
        if (errors.length>0){
            throw{
                message:'กรอกข้อมูลไม่ครบ',
                errors:errors
            }
        }

        let message = 'บันทึกข้อมูลเรียบร้อย'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/user`,userData)
            console.log('response',response.data)
        }else{
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`,userData)
            message = 'แก้ไขข้อมูลเรียบร้อย'
            console.log('response',response.data)
        }

        messageDOM.innerHTML = message
        messageDOM.className = 'message suscess'
    }

        catch(error){
            console.log('error message',error.message)
            console.log('error',error.errors)
            
            let htmlData = '<div>'
            htmlData += `<div>${error.message}</div>`
            htmlData += '<ul>'
            for (let i=0 ; i < error.errors.length;i++){
                htmlData += `<li>${error.errors[i]}</li>`
            }
            htmlData += '</ul>'
            htmlData += '</div>'

            messageDOM.innerHTML = htmlData
            messageDOM.className = 'message danger'
        }
}

