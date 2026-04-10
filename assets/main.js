// ==========================================
// 1. HIỆU ỨNG HOA RƠI (CANVAS PETALS)
// ==========================================
(function() {
    let e = document.getElementById("pc"), t = e && e.getContext ? e.getContext("2d") : null;
    if (!e || !t) return;
    let n, r, i = [], a = !0, o = window.innerWidth < 768;
    function s() { n = e.width = window.innerWidth; r = e.height = window.innerHeight; }
    function c(e, t) { return e + Math.random() * (t - e); }
    function l() {
        i = []; let e = o ? 25 : 50, t = o ? 25e3 : 15e3, a = Math.min(Math.floor(n * r / t), e);
        for (let e = 0; e < a; e++) i.push({ x: c(0, n), y: c(-r, r), w: c(4, 8), h: c(7, 14), vx: c(-.8, .8), vy: c(.8, 2.2), a: c(0, Math.PI * 2), p: c(0, Math.PI * 2), ps: c(.01, .03), rs: c(-.03, .03), c: Math.random() < .6 ? "rgba(212,60,40," : "rgba(240,168,50," });
    }
    function u() {
        if(a) {
            t.clearRect(0, 0, n, r);
            i.forEach(e => {
                e.p += e.ps; e.a += e.rs; let i = Math.sin(e.p) * 1.5;
                t.save(); t.translate(e.x + i, e.y); t.rotate(e.a); t.beginPath();
                t.ellipse(0, 0, e.w, e.h, 0, 0, Math.PI * 2);
                t.fillStyle = e.c + (.3 + .5 * Math.sin(e.p)) + ")"; t.fill(); t.restore();
                e.x += e.vx; e.y += e.vy;
                if(e.y > r + 20) { e.y = -20; e.x = c(0, n); }
                if(e.x < -20) e.x = n + 20;
                if(e.x > n + 20) e.x = -20;
            });
            requestAnimationFrame(u);
        }
    }
    document.addEventListener("visibilitychange", () => { document.hidden ? a = !1 : (a = !0, requestAnimationFrame(u)); });
    let d, f = window.innerWidth;
    window.addEventListener("resize", () => { clearTimeout(d); d = setTimeout(() => { if(window.innerWidth !== f) { f = window.innerWidth; s(); l(); } }, 180); }, { passive: !0 });
    s(); l(); u();
})();

// ==========================================
// 2. MENU ĐIỀU HƯỚNG 
// ==========================================
var v = document.getElementById("nav"), qt = document.getElementById("burger"), y = document.getElementById("drawer");
if(qt && y) {
    qt.addEventListener("click", () => { let e = y.classList.toggle("open"); qt.classList.toggle("open", e); document.body.style.overflow = e ? "hidden" : ""; });
    window.closeD = function() { y.classList.remove("open"); qt.classList.remove("open"); document.body.style.overflow = ""; };
    y.addEventListener("click", e => { if(e.target === y) closeD(); });
}

var Jt = document.getElementById("scrollProgress"), Yt = document.getElementById("backToTop"), Xt = !1;
function Zt() {
    if(!Xt) {
        Xt = !0;
        requestAnimationFrame(() => {
            let e = window.scrollY || window.pageYOffset;
            if(v) v.classList.toggle("scrolled", e > 50);
            let t = document.documentElement.scrollHeight - window.innerHeight;
            if(Jt && t > 0) Jt.style.width = (e / t * 100) + "%";
            if(Yt) Yt.classList.toggle("visible", e > 600);
            Xt = !1;
        });
    }
}
window.addEventListener("scroll", Zt, { passive: !0 });
if(Yt) Yt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ==========================================
// 3. ĐẾM NGƯỢC THỜI GIAN CHỜ SỰ KIỆN
// ==========================================
var Qt = new Date("2026-07-04T07:30:00"), $t = { d: document.getElementById("d"), h: document.getElementById("h"), m: document.getElementById("m"), s: document.getElementById("s") };
function b(e, t) {
    if(!e) return;
    let n = String(t).padStart(2, "0");
    if(e.textContent !== n) {
        e.classList.add("flip");
        setTimeout(() => { e.textContent = n; e.classList.remove("flip"); }, 280);
    }
}
function en() {
    let e = Math.max(0, Qt - Date.now());
    b($t.d, Math.floor(e / 864e5)); b($t.h, Math.floor((e % 864e5) / 36e5)); b($t.m, Math.floor((e % 36e5) / 6e4)); b($t.s, Math.floor((e % 6e4) / 1e3));
}
en(); setInterval(en, 1e3);

// ==========================================
// 4. XÓA HIỆU ỨNG CUỘN TRANG (ÉP HIỂN THỊ NGAY)
// ==========================================
document.querySelectorAll(".rev").forEach(e => {
    e.style.transition = "none"; 
    e.classList.add("on");
});

(function() {
    let e = document.querySelectorAll(".sb-big");
    function n(e) {
        let t = e.textContent.trim(), n = t.includes("+"), r = parseInt(t.replace(/[^0-9]/g, ""));
        if (isNaN(r)) return;
        let i = performance.now(); e.textContent = n ? "0+" : "0";
        function a(t) {
            let o = t - i, s = Math.min(o / 1800, 1), c = 1 - (1 - s) ** 3, l = Math.round(c * r);
            e.textContent = n ? l + "+" : String(l);
            if(s < 1) requestAnimationFrame(a);
        }
        requestAnimationFrame(a);
    }
    e.forEach(e => n(e));
})();

document.querySelectorAll(".fq").forEach(e => {
    e.setAttribute("role", "button"); e.setAttribute("tabindex", "0"); e.setAttribute("aria-expanded", "false");
    function t() {
        let t = e.closest(".fi"), n = t.classList.contains("open");
        document.querySelectorAll(".fi").forEach(e => { e.classList.remove("open"); e.querySelector(".fq").setAttribute("aria-expanded", "false"); });
        if(!n) { t.classList.add("open"); e.setAttribute("aria-expanded", "true"); }
    }
    e.addEventListener("click", t);
    e.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } });
});

document.querySelectorAll(".btn,.tc-btn").forEach(e => {
    e.classList.add("ripple-wrap");
    e.addEventListener("click", t => {
        let n = e.getBoundingClientRect(), r = document.createElement("span"); r.classList.add("ripple");
        let i = Math.max(n.width, n.height);
        r.style.width = r.style.height = i + "px"; r.style.left = t.clientX - n.left - i / 2 + "px"; r.style.top = t.clientY - n.top - i / 2 + "px";
        e.appendChild(r); r.addEventListener("animationend", () => r.remove());
    });
});

// ==========================================
// 5. RẠP CHIẾU KÝ ỨC (GALLERY CINEMA)
// ==========================================
(function() {
    let galleryImages = Array.from({ length: 20 }, (_, i) => {
        let num = String(i + 1).padStart(2, '0');
        return `pictures/${num}.jpg`;
    });

    let e = document.getElementById("cinemaScreen");
    if (e && galleryImages.length > 0) {
        let y = e.querySelector(".cinema-progress");
        galleryImages.forEach((url, n) => {
            let r = "Kỷ Niệm";
            let a = document.createElement("div");
            a.className = n === 0 ? "slide active" : "slide";
            a.innerHTML = `
                <div class="slide-img-wrap">
                  <div class="slide-ph" style="background:linear-gradient(135deg,#0f3b7b 0%,#1f60c4 50%,#0f3b7b 100%)"></div>
                  <img src="${url}" alt="${r}" loading="lazy" onerror="this.style.display='none'">
                </div>
                <div class="slide-vignette"></div>
                <div class="film-grain"></div>
                <div class="letterbox top"></div>
                <div class="letterbox bot"></div>
                <div class="slide-caption">
                  <div class="slide-year">Phan Chu Trinh 2003-2006</div>
                  <div class="slide-title">${r}</div>
                  <div class="slide-sub">Những hình ảnh tập thể rực rỡ</div>
                </div>
            `;
            e.insertBefore(a, y);
        });

        let v = document.querySelectorAll(".slide"), qt = document.getElementById("slideDots"), fill = document.getElementById("cinemaFill");
        let Jt = document.getElementById("filmstrip"), Yt = document.getElementById("lightbox"), Xt = document.getElementById("lbImg"), Zt = document.getElementById("lbCap"), Qt = document.getElementById("lbClose");
        
        let $t = 6000, b = 0, en = null, tn = !1;
        
        v.forEach((e, t) => {
            let n = document.createElement("button");
            n.className = "sdot" + (t === 0 ? " active" : ""); n.setAttribute("aria-label", "Slide " + (t + 1));
            n.addEventListener("click", () => S(t)); qt.appendChild(n);
        });

        v.forEach((e, t) => {
            let n = document.createElement("div"); n.className = "fstrip-item" + (t === 0 ? " active" : "");
            let r = e.querySelector("img");
            if (r && r.src) {
                let e = document.createElement("img"); e.src = r.src; e.loading = "lazy";
                e.onerror = () => { e.style.display = "none"; };
                n.appendChild(e);
            }
            n.addEventListener("click", () => S(t)); Jt.appendChild(n);
        });

        function an() {
            qt.querySelectorAll(".sdot").forEach((e, t) => e.classList.toggle("active", t === b));
            Jt.querySelectorAll(".fstrip-item").forEach((e, t) => { e.classList.toggle("active", t === b); });
        }
        function on() {
            if(fill) {
                fill.style.transition = "none"; fill.style.width = "0%";
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    fill.style.transition = "width " + $t + "ms linear"; fill.style.width = "100%";
                }));
            }
        }
        function x() { if(fill) { fill.style.transition = "none"; fill.style.width = "0%"; } }
        function S(e) {
            v[b].classList.remove("active");
            b = (e + v.length) % v.length;
            v[b].classList.add("active");
            let t = v[b].querySelector(".slide-img-wrap");
            if(t) { t.style.animation = "none"; t.offsetHeight; t.style.animation = ""; }
            an(); C();
        }
        function C() { clearTimeout(en); x(); if(!tn) { on(); en = setTimeout(() => S(b + 1), $t); } }

        document.getElementById("slidePrev")?.addEventListener("click", e => { e.stopPropagation(); S(b - 1); });
        document.getElementById("slideNext")?.addEventListener("click", e => { e.stopPropagation(); S(b + 1); });
        e.addEventListener("mouseenter", () => { tn = !0; clearTimeout(en); x(); });
        e.addEventListener("mouseleave", () => { tn = !1; C(); });

        e.addEventListener("click", ev => {
            if (ev.target.closest(".slide-nav") || ev.target.closest(".slide-dots") || ev.target.closest(".sdot")) return;
            let t = v[b].querySelector("img"), n = v[b].querySelector(".slide-title");
            if (t && t.naturalWidth > 0) {
                Xt.src = t.src; Zt.textContent = n ? n.textContent : "";
                Yt.classList.add("open"); document.body.style.overflow = "hidden";
            }
        });

        function w() {
            Yt.classList.remove("open"); document.body.style.overflow = "";
            setTimeout(() => { Xt.src = ""; }, 300);
        }
        Qt?.addEventListener("click", w); Yt?.addEventListener("click", e => { if(e.target === Yt) w(); });
        C(); 
    }
})();

// ==========================================
// 6. NHẠC NỀN
// ==========================================
var onBtn = document.getElementById("musicBtn"), xAudio = document.getElementById("bgMusic"), SPlay = !1, CPending = !1;
function sn() {
    if (SPlay || !xAudio || CPending) return;
    CPending = !0;
    let e = xAudio.play();
    if(e !== void 0) {
        e.then(() => { SPlay = !0; CPending = !1; if(onBtn) onBtn.classList.add("playing"); ln(); }).catch(() => { CPending = !1; });
    } else { CPending = !1; }
}
var cnEvents = ["click", "touchstart", "scroll", "mousemove", "keydown"];
function ln() { cnEvents.forEach(e => document.removeEventListener(e, sn)); }
cnEvents.forEach(e => { document.addEventListener(e, sn, { passive: !0 }); });
window.addEventListener("load", sn);
if(onBtn && xAudio) {
    onBtn.addEventListener("click", e => {
        e.stopPropagation(); SPlay = !0; ln();
        if(xAudio.paused) { xAudio.play().then(() => onBtn.classList.add("playing")).catch(() => {}); } 
        else { xAudio.pause(); onBtn.classList.remove("playing"); }
    });
}

// ==========================================
// 7. THƯ MỜI KỶ NIỆM VIP TICKET
// ==========================================
window.loadedLoiNgoImg = new Image();
window.loadedLoiNgoImg.src = 'pictures/loingo.jpg';

// Lưu biến toàn cục
var currentName = "Khách", currentClass = "Lớp";

// Hàm hiển thị Thư mời (Đã thiết kế để lấy DOM an toàn)
window.showOpenLetter = window.openTicketModal = function(name, className) {
    currentName = name || "Khách";
    currentClass = className || "Lớp";
    
    // Gọi các phần tử DOM bên trong hàm để đảm bảo HTML đã load xong
    let os = document.getElementById("ticketModal");
    let ss = document.getElementById("tkInner");
    
    if(os && ss) {
        os.style.display = "flex"; 
        setTimeout(() => { os.style.opacity = "1"; ss.style.transform = "translateY(0)"; }, 10);
    }
    
    // Gọi hàm render
    if (typeof window.generateTicket === 'function') {
        window.generateTicket(currentName, currentClass);
    }
};

window.closeTicketModal = function() {
    let os = document.getElementById("ticketModal");
    let ss = document.getElementById("tkInner");
    let cs = document.getElementById("tkForm");
    let ls = document.getElementById("tkResult");

    if(os && ss) {
        os.style.opacity = "0"; ss.style.transform = "translateY(20px)";
        setTimeout(() => { 
            os.style.display = "none"; 
            if(cs) cs.style.display = "block"; 
            if(ls) ls.style.display = "none"; 
            let btn = document.getElementById("tkGenBtn");
            if(btn) btn.textContent = "Viết Thư Của Tôi ✍️"; 
        }, 400);
    }
};

window.generateTicket = function(directName, directClass) {
    let e = directName || currentName;
    let t = directClass || currentClass;
    
    let n = document.getElementById("tkGenBtn");
    let cs = document.getElementById("tkForm");
    let ls = document.getElementById("tkResult");
    
    if (!e || !t) return;
    if(n) { n.textContent = "Đang nắn nót viết thư... ✍️"; n.disabled = !0; }
    
    let r = new Promise(resolve => {
        let img = window.loadedLoiNgoImg;
        if (img && img.complete && img.naturalWidth > 0) return resolve();
        if(img) { img.onload = resolve; img.onerror = resolve; } else { resolve(); }
    });
    
    Promise.all([document.fonts.ready, r])
    .then(() => {
        setTimeout(() => { 
            ds(e, t); 
            if(cs) cs.style.display = "none"; 
            if(ls) ls.style.display = "block"; 
            if(n) n.disabled = !1; 
        }, 100);
    })
    .catch(err => {
        console.log("Lỗi render:", err);
    });
};

function ds(e, t) {
    let us = document.getElementById("tkCanvas");
    if (!us) return; // Nếu không tìm thấy canvas thì dừng lại an toàn
    
    let n = window.loadedLoiNgoImg, r = n && n.complete && n.naturalWidth > 0;
    let i = 1080, a = 1527;
    us.width = 2160; us.height = 3054; us.style.width = "100%"; us.style.height = "auto";
    let o = us.getContext("2d");
    o.scale(2, 2);

    // --- BẮT ĐẦU PHẦN SỬA ĐỔI NỀN VÀ MẪU ---
    if (r) { 
        // 1. Làm mờ bức ảnh nền theo yêu cầu đại ca
        o.filter = 'blur(12px)';
        // Vẽ to hơn viền một chút để mép không bị lộ khoảng trắng do blur
        o.drawImage(n, -20, -20, i + 40, a + 40); 
        o.filter = 'none'; // Tắt mờ để chuẩn bị vẽ chữ nét

        // 2. Phủ lớp màu giấy vintage sáng đè lên để chữ tối màu nổi bật
        o.fillStyle = "rgba(245, 239, 224, 0.78)"; 
        o.fillRect(0, 0, i, a);
    } 
    else {
        // Nền dự phòng nếu ảnh không tải được
        o.fillStyle = "#f5efe0"; o.fillRect(0, 0, i, a);
    }

    // 3. Vẽ thêm vân kẻ ngang giống giấy học sinh tạo cảm giác hoài niệm
    o.fillStyle = "rgba(30,58,138,0.06)"; 
    for (let step = 0; step < a; step += 48) o.fillRect(0, step, i, 1);

    // 4. Tạo khung viền trang trọng (Nét đôi viền vàng)
    o.strokeStyle = "rgba(212, 168, 67, 0.7)"; // Màu Vàng Gold
    o.lineWidth = 6;
    o.strokeRect(40, 40, i - 80, a - 80);
    o.lineWidth = 1.5;
    o.strokeRect(52, 52, i - 104, a - 104);
    // --- KẾT THÚC PHẦN SỬA ĐỔI NỀN VÀ MẪU ---

    // Dưới đây là phần text gốc chạy ổn của đại ca, giữ nguyên 100% không đổi thông số
    o.save(); o.textAlign = "center"; o.textBaseline = "alphabetic";
    let s = "#1e3a8a", c = "#8b0000", _y = a * .295;
    o.imageSmoothingEnabled = !0; o.imageSmoothingQuality = "high";
    
    let u = 748.23 / 19.46, d = u * 1.15, f = u * 1.1, p = u * 1, m = u * 1.25;
    let ee = e.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    let h = t === "Khách" ? "Khách Mời / Thầy Cô" : "Thành viên lớp " + t;
    let te = ["Mười tám tuổi năm ấy,", "chúng ta có những nụ cười", "trong trẻo nhất. Hai mươi năm", "sau, hãy trở về để gọi nhau", "bằng cái tên thân thuộc."];
    let g = 63.4;
    
    for (o.font = `bold ${g}px "Dancing Script", "Caveat", cursive`; o.measureText(ee).width > 907 && g > f; ) {
        g -= 1.5; o.font = `bold ${g}px "Dancing Script", "Caveat", cursive`;
    }
    
    o.font = `italic ${d}px "Dancing Script", "Caveat", cursive`; o.fillStyle = "#6b5B95";
    o.fillText(`Thanh xuân như một cơn mưa rào...`, 540, _y); _y += d * 1.85;
    
    o.font = `italic ${d}px "Dancing Script", "Caveat", cursive`; o.fillStyle = s;
    o.fillText(`Gửi bạn cũ:`, 540, _y); _y += d * 1.55;
    
    o.font = `bold ${g}px "Dancing Script", "Caveat", cursive`; o.fillStyle = c;
    o.fillText(ee, 540, _y); _y += g * 1.3;
    
    o.font = `italic ${f}px "Dancing Script", "Caveat", cursive`; o.fillStyle = s;
    o.fillText(`— ${h} —`, 540, _y); _y += f * 2;
    
    o.font = `italic ${p}px "Dancing Script", "Caveat", cursive`; o.fillStyle = s;
    te.forEach(line => { o.fillText(line, 540, _y); _y += p * 1.55; }); _y += p * .6;
    
    o.font = `bold ${m}px "Dancing Script", "Caveat", cursive`; o.fillStyle = c;
    o.fillText(`04 - 07 - 2026`, 540, _y); _y += m * 1.4;
    
    o.font = `bold 42px "Dancing Script", "Caveat", cursive`; o.fillStyle = s;
    o.fillText(`Hẹn gặp tại Phan Chu Trinh!`, 540, _y);
    o.restore();
}

window.downloadTicket = function() {
    let us = document.getElementById("tkCanvas");
    if (!us) return;
    
    let safeName = currentName.replace(/ /g, "_");
    let e = `Thu_Moi_PhanChuTrinh_${currentClass}_${safeName}.jpg`;
    
    us.toBlob(function(t) {
        if (!t) return;
        let n = new File([t], e, { type: "image/jpeg" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [n] })) {
            navigator.share({ title: "Thư Mời Kỷ Niệm 20 Năm", files: [n] }).catch(err => console.log("Huỷ chia sẻ: ", err));
        } else {
            let n = URL.createObjectURL(t), r = document.createElement("a");
            r.href = n; r.download = e; document.body.appendChild(r); r.click();
            document.body.removeChild(r); URL.revokeObjectURL(n);
        }
    }, "image/jpeg", 0.9);
};