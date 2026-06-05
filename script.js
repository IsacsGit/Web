const cursor=document.querySelector('.cursor');

document.addEventListener('mousemove',e=>{
cursor.style.left=e.clientX+'px';
cursor.style.top=e.clientY+'px';
});

// 6. Interactive cursor expansion on hover
document.querySelectorAll('a, .card').forEach(item=>{
item.addEventListener('mouseenter',()=>{
cursor.style.width='48px';
cursor.style.height='48px';
});

item.addEventListener('mouseleave',()=>{
cursor.style.width='18px';
cursor.style.height='18px';
});
});

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
