function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}


console.log("---" + randomString(22) + "----");

const  el = document.createElement("div") ;

el.innerText =  randomString(20) ;

document.body.append(el)   ;