document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("contactForm").addEventListener("submit",function(e){
e.preventDefault();
const n=name.value.trim(),p=phone.value.trim(),m=message.value.trim();
const s=encodeURIComponent("Detailing Request — 47 Nova Autos");
const b=encodeURIComponent(`Name: ${n}\nPhone: ${p||"N/A"}\n\nMessage:\n${m}\n\nBooking link:\nhttps://calendar.app.google/iShN8QECKDK546CaA`);
window.location.href=`mailto:47novaservices@gmail.com?subject=${s}&body=${b}`;
});