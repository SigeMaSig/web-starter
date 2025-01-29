function submitData(){
    let fristnameDom = document.querySelector('input[name=firstname]')
    let lastnameDom = document.querySelector('input[name=lastname]')
    let ageDom = document.querySelector('input[name=age]')

    let genderDom = document.querySelector('input[name=gender]:checked')
    let interestDoms = document.querySelectorAll('input[name=interest]:checked ')
    
    let discriptionDom = document.querySelector('textarea[name=description]')

    let interest = ''
    
    for (let i = 0 ; i<interestDoms.length;i++ ){
        interest += interestDoms[i].value
        if (i != interestDoms.length-1){
            interest += ','
        }
    }

    let userData = {
        fristname: fristnameDom.value,
        lastname: lastnameDom.value,
        age: ageDom.value,
        gender: genderDom.value,
        discription:discriptionDom.value,
        interest: interest
    }
    console.log(userData)
}
