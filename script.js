const cursor=document.querySelector('.cursor');

document.addEventListener('mousemove',e=>{
cursor.style.left=e.clientX+'px';
cursor.style.top=e.clientY+'px';
});

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));