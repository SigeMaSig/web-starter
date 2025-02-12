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

        const response = await axios.post('http://localhost:8000/user',userData)
        console.log('response',response.data)
        messageDOM.innerHTML = 'บันทึกข้อมูล'
        messageDOM.className = 'message suscess'
    }

        catch(error){
            console.log('error message',error.message)
            console.log('error',error.errors)
            // if (error.response)
            // console.log(error.response.data.message)
            
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
