let pdigit = ['0','1','2','3','4','5','6','7','8','9'];
let plower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let pupper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

window.onload = (event) => {
    let d = document.querySelector('#digit');
    let l = document.querySelector('#lower');
    let u = document.querySelector('#upper');
    d.addEventListener("change", () => {if(d.checked) document.querySelectorAll('.vdigit').forEach((a) => {a.style.visibility='visible';}); else document.querySelectorAll('.vdigit').forEach((a) => {a.style.visibility='collapse';});});
    l.addEventListener("change", () => {if(l.checked) document.querySelectorAll('.vlower').forEach((a) => {a.style.visibility='visible';}); else document.querySelectorAll('.vlower').forEach((a) => {a.style.visibility='collapse';});});
    u.addEventListener("change", () => {if(u.checked) document.querySelectorAll('.vupper').forEach((a) => {a.style.visibility='visible';}); else document.querySelectorAll('.vupper').forEach((a) => {a.style.visibility='collapse';});});
    
}

function characterset () {
    let setchar = new Set ();
    if(document.querySelector("#digit").checked) pdigit.forEach((c) => { setchar.add(c)});
    if(document.querySelector("#lower").checked) plower.forEach((c) => { setchar.add(c)});
    if(document.querySelector("#upper").checked) pupper.forEach((c) => { setchar.add(c)});
    
    if(document.querySelector("#dot").checked) setchar.add('.');
    if(document.querySelector("#comma").checked) setchar.add(',');
    if(document.querySelector("#doubledot").checked) setchar.add(':');
    if(document.querySelector("#dotcomma").checked) setchar.add(';');
    if(document.querySelector("#question").checked) setchar.add('?');
    if(document.querySelector("#exclamation").checked) setchar.add('!');
    if(document.querySelector("#op").checked) setchar.add('+').add('-').add('*').add('/');
    if(document.querySelector("#antislash").checked) setchar.add('\\');
    if(document.querySelector("#amp").checked) setchar.add("&amp");
    if(document.querySelector("#at").checked) setchar.add('@');
    if(document.querySelector("#par").checked) setchar.add('(').add(')').add('[').add(']').add('{').add('}').add("&lt").add("&gt");
    if(document.querySelector("#underscore").checked) setchar.add('_');
    if(document.querySelector("#diese").checked) setchar.add('#');
    if(document.querySelector("#egal").checked) setchar.add('=');
    if(document.querySelector("#bar").checked) setchar.add('|');
    if(document.querySelector("#quote").checked) setchar.add('\'').add('\"');
    if(document.querySelector("#percent").checked) setchar.add('%');
    if(document.querySelector("#currency").checked) setchar.add('$').add('€').add('£');
    if(document.querySelector("#space").checked) setchar.add(' ');
    
    document.querySelector("#txtcar").value.split('').forEach((c) => {setchar.add(c);});
    document.querySelector("#txtcarx").value.split('').forEach((c) => {setchar.delete(c);});
    return setchar;
}

function gen () {
    let listchar = characterset();
    let listdigit = new Set(listchar); listdigit.forEach((a) => {if(!pdigit.includes(a)) listdigit.delete(a);});
    let listlower = new Set(listchar); listlower.forEach((a) => {if(!plower.includes(a)) listlower.delete(a);});
    let listupper = new Set(listchar); listupper.forEach((a) => {if(!pupper.includes(a)) listupper.delete(a);});
    let listother = new Set(listchar); listother.forEach((a) => {if(pdigit.includes(a)|plower.includes(a)|pupper.includes(a)) listother.delete(a);});
    let numberchar = parseInt(document.querySelector('#nbc').value);
    let digitc = [parseInt(document.querySelector('#nbd').value), parseInt(document.querySelector('#wd').value)];
    let lowerc = [parseInt(document.querySelector('#nbl').value), parseInt(document.querySelector('#wl').value)];
    let upperc = [parseInt(document.querySelector('#nbu').value), parseInt(document.querySelector('#wu').value)];
    let spec = [parseInt(document.querySelector('#nbcs').value), parseInt(document.querySelector('#wcs').value)];
    let str= new Array();
    let t;
    let d = document.querySelector('#digit'); if(!d.checked) digitc=[0,0];
    let l = document.querySelector('#lower'); if(!l.checked) lowerc=[0,0];
    let u = document.querySelector('#upper'); if(!u.checked) upperc=[0,0];
    if(listother.size=0) spec = [0,0];
    let weight = digitc[1]+lowerc[1]+upperc[1]+spec[1];
    for(let i=0; i < numberchar; ++i) {
	t=Math.floor(Math.random()*weight);
	if(t<digitc[1]) str.push(Array.from(listdigit)[Math.floor(Math.random()*listdigit.size)]);
	else if (t<digitc[1]+lowerc[1])  str.push(Array.from(listlower)[Math.floor(Math.random()*listlower.size)]);
	else if (t<digitc[1]+lowerc[1]+upperc[1])  str.push(Array.from(listupper)[Math.floor(Math.random()*listupper.size)]);
	else str.push(Array.from(listother)[Math.floor(Math.random()*listother.size)]);
    }

    let y = [-digitc[0],-lowerc[0],-upperc[0],-spec[0]]; let ind=0;
    for(let i=0; i < str.length; ++i) {
        if(listdigit.has(str[i])) ++y[0];
        else if(listlower.has(str[i])) ++y[1];
        else if(listupper.has(str[i])) ++y[2];
        else ++y[3];
    }
    let t2=(y[0]>0?y[0]+digitc[0]:0)+(y[1]>0?y[1]+lowerc[0]:0)+(y[2]>0?y[2]+upperc[0]:0)+(y[3]>0?y[3]+spec[0]:0);
    while(y[0]<0){
        t=Math.floor(Math.random()*t2)+1;
        while(t>0) {
            if((listlower.has(str[ind])&&(y[1]>0))||(listupper.has(str[ind])&&(y[2]>0))||(listother.has(str[ind])&&(y[3]>0))){
                --t;
            }
            ++ind;
        }
        --ind;
        if(listdigit.has(str[ind])) --y[0];
        else if(listlower.has(str[ind])) --y[1];
        else if(listupper.has(str[ind])) --y[2];
        else --y[3];
        str[ind] = Array.from(listdigit)[Math.floor(Math.random()*listdigit.size)];
        ind=0;
        t2=(y[0]>0?y[0]+digitc[0]:0)+(y[1]>0?y[1]+lowerc[0]:0)+(y[2]>0?y[2]+upperc[0]:0)+(y[3]>0?y[3]+spec[0]:0);
        ++y[0];
        }
    while(y[1]<0){
        t=Math.floor(Math.random()*t2)+1;
        while(t>0) {
            if((listdigit.has(str[ind])&&(y[0]>0))||(listupper.has(str[ind])&&(y[2]>0))||(listother.has(str[ind])&&(y[3]>0))){
                --t;
            }
            ++ind;
        }
        --ind;
        if(listdigit.has(str[ind])) --y[0];
        else if(listlower.has(str[ind])) --y[1];
        else if(listupper.has(str[ind])) --y[2];
        else --y[3];
        str[ind] = Array.from(listlower)[Math.floor(Math.random()*listlower.size)];
        ind=0;
        t2=(y[0]>0?y[0]+digitc[0]:0)+(y[1]>0?y[1]+lowerc[0]:0)+(y[2]>0?y[2]+upperc[0]:0)+(y[3]>0?y[3]+spec[0]:0);
        ++y[1];
        }
    while(y[2]<0){
        t=Math.floor(Math.random()*t2)+1;
        while(t>0) {
            if((listlower.has(str[ind])&&(y[1]>0))||(listdigit.has(str[ind])&&(y[0]>0))||(listother.has(str[ind])&&(y[3]>0))){
                --t;
            }
            ++ind;
        }
        --ind;
        if(listdigit.has(str[ind])) --y[0];
        else if(listlower.has(str[ind])) --y[1];
        else if(listupper.has(str[ind])) --y[2];
        else --y[3];
        str[ind] = Array.from(listupper)[Math.floor(Math.random()*listupper.size)];
        ind=0;
        t2=(y[0]>0?y[0]+digitc[0]:0)+(y[1]>0?y[1]+lowerc[0]:0)+(y[2]>0?y[2]+upperc[0]:0)+(y[3]>0?y[3]+spec[0]:0);
        ++y[2];
        }
    while(y[3]<0){
        t=Math.floor(Math.random()*t2)+1;
        while(t>0) {
            if((listlower.has(str[ind])&&(y[1]>0))||(listupper.has(str[ind])&&(y[2]>0))||(listdigit.has(str[ind])&&(y[0]>0))){
                --t;
            }
            ++ind;
        }
        --ind;
        if(listdigit.has(str[ind])) --y[0];
        else if(listlower.has(str[ind])) --y[1];
        else if(listupper.has(str[ind])) --y[2];
        else --y[3];
        str[ind] = Array.from(listother)[Math.floor(Math.random()*listother.size)];
        ind=0;
        t2=(y[0]>0?y[0]+digitc[0]:0)+(y[1]>0?y[1]+lowerc[0]:0)+(y[2]>0?y[2]+upperc[0]:0)+(y[3]>0?y[3]+spec[0]:0);
        ++y[3];
        }
    let s = "";
    str.forEach((a) => {s+=a;});
    return s;
}

function display_password () {
    let image = document.querySelector("#im");
    let caption = document.querySelector("#te");
    let output = document.querySelector("#outputgen");
    let str ="";

    image.src="duck.webp";
    caption.textContent = "Niot! Niot!";

    for(let i=0; i < parseInt(document.querySelector("#nb").value); ++i) str += gen() + '<br>';

    output.innerHTML = str;
}

function copy_password () {
    navigator.clipboard.writeText(document.querySelector("#outputgen").innerText);
}

function delete_password () {
    document.querySelector("#outputgen").innerHTML = "";
}
