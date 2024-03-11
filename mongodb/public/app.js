
document.addEventListener('DOMContentLoaded', function () {
    let btns = document.querySelectorAll(".deleteBtn");
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            let alertMsg = alert("Are you Sure, you want to delete this message!");
            return alertMsg;
        });
    });
});
