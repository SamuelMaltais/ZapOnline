$(document).ready(()=>{
    
    //localStorage.setItem("clientName", "clientName")
    //localStorage.setItem("confirmationNumber", "confirmationNumber")

    let clientName = localStorage.getItem("clientName")
    let confirmationNumber = localStorage.getItem("confirmationNumber")

    $("#confirmation-number").html(confirmationNumber)
    $("#client-name").html(clientName)
}

)