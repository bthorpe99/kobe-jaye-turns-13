const photos=[
 [1,'That smile, from the start','A collage of baby Kobe smiling in a pink outfit'],
 [9,'Little hands. Big personality.','Baby Kobe peeking out of a white bucket'],
 [4,'A little dressed-up magic','Little Kobe wearing a white and pink dress'],
 [2,'Already her own person','Baby Kobe wearing a blue bandana'],
 [3,'Cool since day one','Kobe wearing sunglasses and a turquoise hair bow'],
 [11,'Always held close','A family collage of baby Kobe being held'],
 [6,'Ready for the spotlight','Kobe in her Seahawks dance uniform at the stadium'],
 [5,'The best kind of memories','Kobe sharing a smile at a Seahawks event'],
 [10,'Better with a teammate','Kobe and a friend smiling at basketball camp'],
 [7,'Her court. Her game.','Kobe holding a basketball on the court'],
 [8,'That same smile. A new chapter.','Kobe smiling with a basketball on her shoulder'],
 [12,"A little focus. A little adventure.","Kobe practicing archery outdoors"],
 [13,"Taking aim","Kobe aiming a bow at an outdoor archery target"],
 [14,"Game-day glow","Kobe posing with two Seahawks dancers on the field"],
 [15,"Side by side","Kobe sharing a hug in a portrait with a younger girl"],
 [16,"Sweet moments together","Kobe and friends enjoying sweet treats"],
 [17,"Lunch and a little laughter","Kobe and a younger girl smiling at a restaurant"],
 [18,"Smiles worth saving","Kobe sharing a smiling selfie at a Seahawks event"],
 [19,"The best kind of team","Kobe and friends wearing Seahawks dance uniforms and paper crowns"],
 [20,"Serving up a smile","Kobe smiling and making a peace sign behind a counter"],
 [21,"Her people. Her happy.","Kobe surrounded by friends clapping"],
 [22,"A little woodland wonder","Kobe standing beside a wooden troll sculpture in the forest"],
 [23,"A summer kind of smile","Kobe posing inside a large orange frame decorated with flowers"]
];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const main=document.querySelector('#main'),entrance=document.querySelector('#entrance');
document.body.style.overflow='hidden';
document.querySelector('#enter').addEventListener('click',()=>{main.inert=false;main.setAttribute('aria-hidden','false');entrance.classList.add('hidden');entrance.inert=true;document.body.style.overflow='';document.querySelector('#home').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});});
const gallery=document.querySelector('#gallery'),grid=document.querySelector('#memoryGrid');
let current=0,opener=null,start=null;
function showPhoto(index){current=(index+photos.length)%photos.length;const [id,caption,alt]=photos[current];document.querySelector('#galleryImage').src=`assets/${id}-Photo-${id}.jpg`;document.querySelector('#galleryImage').alt=alt;document.querySelector('#galleryCaption').textContent=caption;document.querySelector('#galleryCount').textContent=`${current+1} / ${photos.length}`;}
photos.forEach(([id,caption,alt],i)=>{const button=document.createElement('button');button.className='memory-photo';button.type='button';button.setAttribute('aria-label',`Enlarge photo: ${alt}`);const img=document.createElement('img');img.src=`assets/${id}-Photo-${id}.jpg`;img.alt=alt;img.loading='lazy';if(id===1||id===9||id===11||id>=12)img.style.objectFit='contain';const label=document.createElement('span');const title=document.createElement('b');title.textContent=caption;const number=document.createElement('span');number.className='index';number.textContent=String(i+1).padStart(2,'0');label.append(title,number);button.append(img,label);button.addEventListener('click',()=>{opener=button;showPhoto(i);gallery.showModal();document.body.style.overflow='hidden';});grid.append(button);});
document.querySelector('#closeGallery').addEventListener('click',()=>gallery.close());
document.querySelector('#previous').addEventListener('click',()=>showPhoto(current-1));document.querySelector('#next').addEventListener('click',()=>showPhoto(current+1));
gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}});
gallery.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});});
const galleryImage=document.querySelector('#galleryImage');galleryImage.addEventListener('touchstart',e=>{start=[e.changedTouches[0].clientX,e.changedTouches[0].clientY];},{passive:true});galleryImage.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start[0],dy=e.changedTouches[0].clientY-start[1];if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))showPhoto(current+(dx<0?1:-1));start=null;},{passive:true});galleryImage.addEventListener('touchcancel',()=>start=null,{passive:true});
const finale=document.querySelector('#finale'),confetti=document.querySelector('#confetti');
document.querySelector('#wish').addEventListener('click',()=>{finale.showModal();document.body.style.overflow='hidden';confetti.replaceChildren();if(reduced.matches)return;for(let i=0;i<80;i++){const piece=document.createElement('i');piece.style.left=Math.random()*100+'%';piece.style.background=['#d8f268','#ff8655','#f5f3e9'][i%3];piece.style.setProperty('--time',2+Math.random()*3+'s');piece.style.setProperty('--drift',-80+Math.random()*160+'px');confetti.append(piece);setTimeout(()=>piece.remove(),5500);}});
document.querySelector('#closeFinale').addEventListener('click',()=>finale.close());finale.addEventListener('close',()=>{document.body.style.overflow='';document.querySelector('#wish').focus({preventScroll:true});confetti.replaceChildren();});
