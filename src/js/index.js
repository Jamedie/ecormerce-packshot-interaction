function handleClick() {
  alert("Action exécutée !");
}
function getClickPosition(event) {
  const image = event.target;
  const rect = image.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`x: ${x}, y: ${y}`);
}
