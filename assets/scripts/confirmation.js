var storage = 0;
try {
  storage = parseInt(localStorage.getItem("confirmationNum"));
} catch {
  console.log("...");
}
$(document).ready(() => {
  $("#confirmationNum").html(storage);
});
