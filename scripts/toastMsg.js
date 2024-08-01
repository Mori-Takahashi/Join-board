////////////////////////////////////////////////////////////////////////////////
//  Hier coden wir die Toast msg, ich habe mir überlegt das wir eine function //
//  Machen die so aussieht:                                                   //
//  toastMessage("Hier kommt der text der msg");                              //
//  dabei können wir das js überall nutzen                                    //
////////////////////////////////////////////////////////////////////////////////

/* 
    <div id="toast-div" class="d-none">
        <div class="toast-text" id="toast-text"></div>
    </div>
*/


function toastMessage(msg) {
    let toastBox = document.getElementById('toast-div');
    let toastMsg = document.getElementById('toast-text');
    toastMsg.innerHTML = `${msg}`;
    toastBox.classList.remove('d-none');
    toastBox.classList.add('slide-in-right');
    toastBox.classList.add('toast');
    setTimeout(() => {
        toastBox.classList.add('slide-out-right');
    }, 3000);
    setTimeout(() => {
        toastBox.classList.add('d-none');
        toastBox.classList.remove('slide-out-right');
        toastBox.classList.remove('slide-in-right');
        toastBox.classList.remove('toast');
    }, 3500);
}