/* =========================================================
   01. 로딩 처리 (빠르게 사라지도록)
========================================================= */
(() => {
  const loader = document.querySelector('.loading-overlay');
  let hidden = false;

  const hideLoader = () => {
    if (hidden) return;
    hidden = true;
    if (loader) {
      // 모바일에서도 확실히 사라지도록 스타일과 애니메이션 둘 다 적용
      gsap.to(loader, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => loader.style.display = 'none'
      });
    }
  };

  window.addEventListener('load', hideLoader);
  document.addEventListener('DOMContentLoaded', hideLoader);
  // 로드 이벤트가 지연되거나 누락될 때를 대비한 안전 타이머
  setTimeout(hideLoader, 3000);
})();

/* =========================================================
   02. Ctrl 확대 방지
========================================================= */
window.addEventListener("wheel", (e) => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && ["+", "-", "=", "0"].includes(e.key)) {
    e.preventDefault();
  }
});


/* =========================================================
   03. 마우스 따라다니는 원
========================================================= */
const circle = document.querySelector(".circle");
let mx = 0, my = 0, cx = 0, cy = 0;
const spd = 0.12;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function follow() {
  cx += (mx - cx) * spd;
  cy += (my - cy) * spd;
  circle.style.marginLeft = cx - 15 + "px";
  circle.style.marginTop = cy - 15 + "px";
  requestAnimationFrame(follow);
}
follow();

$(".linkA").hover(
  () => $("span.circle").css({ width:"100px", height:"100px", transform:"translate(-50%,-50%)", marginLeft:0, marginTop:0 }),
  () => $("span.circle").css({ width:"", height:"", transform:"", marginLeft:"", marginTop:"" })
);


/* =========================================================
   04. GSAP + ScrollTrigger
========================================================= */
gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   04-1. 터치 디바이스 체크 함수
========================================================= */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}


/* =========================================================
   SECTION FUNCTIONS (PC / MOBILE 구분)
========================================================= */

/* --------------------- SECTION1 ---------------------- */
function initSection1_PC() {
  const topBox = document.querySelector(".top_box");
  if (!topBox) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: ".section1",
      start: "top top",
      end: "+=" + topBox.getBBox().width,
      scrub: true,
      pin: true,
    }
  })
  .from(".top_red", {
    scale: 40,
    transformOrigin: "20% center"
  }, 'sign')
  .to(".top_red", {
    autoAlpha: 0
  })
  .to(".section1 .sign", {
    scale: 0,
  }, 'sign')
  .to(".top_box", {
    x: () => -(topBox.getBBox().width - window.innerWidth),
    ease: 'linear'
  })
  .to(".top_box", {
    scale: 20,
    x: 1700,
    transformOrigin: "right center",
    display: 'none'
  }, 'mainTop')
  .to(".main", {
    opacity: 1,
  }, 'mainTop')
  .to(".main_title", {
    fontSize: '5rem',
  }, 'mainText')
  .to(".tt", {
    fontSize: '3rem',
    opacity: 0.5
  }, 'mainText')
  .to(".mainLast", {
    fontSize: '7rem',
  }, 'mainText');
}

function initSection1_M() {
  // 모바일용 SECTION1 초기화 (필요시 구현)
}


/* --------------------- SECTION2 ---------------------- */
function initSection2_PC() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section2",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
    }
  })
  .from(".section2 .left", { autoAlpha: 0, y: 30, ease: 'sine.inOut' })
  .from(".section2 .center", { autoAlpha: 0, y: 30, ease: 'sine.inOut' })
  .from(".section2 .right", { autoAlpha: 0, y: 30, ease: 'sine.inOut' })
  .to(".section2 .point_1", { x: -217, ease: 'sine.inOut' }, 'p1')
  .to(".section2 .plus1", { rotate: 360, ease: 'sine.inOut' }, 'p1')
  .to(".section2 .point_2", { x: -300, ease: 'sine.inOut' }, 'p2')
  .to(".section2 .plus2", { rotate: 360, ease: 'sine.inOut' }, 'p2')
  .to(".section2 .point_3", { x: -70, ease: 'sine.inOut' }, 'p3')
  .to(".section2 .plus3", { rotate: 360, ease: 'sine.inOut' }, 'p3')
  .to(".section2 .point_4", { x: -310, ease: 'sine.inOut' }, 'p4')
  .to(".section2 .plus4", { rotate: 360, ease: 'sine.inOut' }, 'p4');

  // side-title만 독립 타임라인
  gsap.from(".side-title", {
    scrollTrigger: {
      trigger: ".section2",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    top: "-200px",
    ease: "sine.inOut"
  });
}

function initSection2_M() {
  gsap.from(".side-title", {
    scrollTrigger: {
      trigger: ".section2",
      start: "top 90%",
      end: "bottom top",
      scrub: true
    },
    top: "-150px"
  });
}


/* --------------------- SECTION3 ---------------------- */
function initSection3_PC() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section3",
      start: "top top",
      end: "center top",
      scrub: true,
      pin: true,
    }
  }).from(".section3 .img_box li", {
    autoAlpha: 0,
    stagger: 0.5,
    scale: 0.5,
    duration: 10,
    ease: 'power1.inOut(3)'
  });

  // 비디오 플레이
  document.querySelectorAll('.section3 video').forEach(function(v) {
    v.addEventListener('mouseenter', function() {
      this.play();
    });
    v.addEventListener('mouseleave', function() {
      this.pause();
    });
  });

  const profile = document.querySelector('.section3 .profile');
  if (profile) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profile.classList.add('on');
        } else {
          profile.classList.remove('on');
        }
      });
    }, { threshold: 0.7 });

    observer.observe(profile);
  }
}
function initSection3_M() {}




/* --------------------- SECTION4 ---------------------- */

function initSection4_PC() {
  // 높이 계산
  let sec4 = document.querySelector(".section4 .content");
  if (!sec4) return;

  const hideAllTextboxes = () => {
    document.querySelectorAll(".section4 .textwrap .textbox").forEach(tb => {
      tb.classList.remove("on");
      gsap.set(tb, { opacity: 0, pointerEvents: "none" });
    });
  };

  // 초기 텍스트 박스 숨김
  hideAllTextboxes();
  
  let sec4H = sec4.getBoundingClientRect().height;
  let winH = window.innerHeight;
  let moveY = sec4H - winH;

  // section4 timeline
  let contentAnim = gsap.timeline({
    scrollTrigger: {
      trigger: ".svg_box",
      start: "top top",
      end: "+=3000",
      scrub: true,
      pin: '.section4',
    }
  })
  .to(".section4", {
    backgroundColor: '#FFFDF5',
    ease: 'expo.inOut'
  }, 'part4')
  .to(".section4 .part4_left", {
    left: '-1100px',
    marginTop: '-25%',
    ease: 'expo.inOut'
  }, 'part4')
  .to(".section4 .part4_right", {
    right: '-900px',
    marginTop: '-30%',
    ease: 'expo.inOut'
  }, 'part4')
  .to(".section4 .part4_left svg", {
    fill: '#be432f',
    ease: 'expo.inOut'
  }, 'part4')
  .to(".section4 .part4_right svg", {
    fill: '#be432f',
    ease: 'expo.inOut'
  }, 'part4')
  .to(".section4 .content", {
    y: -moveY,
    ease: 'power1.out'
  })
  // 닫히기
  .to(".section4 .part4_left", {
    left: '-10%',
    marginTop: '-0',
    ease: 'expo.inOut'
  }, 'part42')
  .to(".section4 .part4_right", {
    right: '-10%',
    marginTop: '0px',
    ease: 'expo.inOut'
  }, 'part42')
  .to(".section4 .part4_left svg", {
    fill: '#FFFDF5',
    ease: 'expo.inOut'
  }, 'part42')
  .to(".section4 .part4_right svg", {
    fill: '#FFFDF5',
    ease: 'expo.inOut'
  }, 'part42')
  .to(".section4 .cover", {
    bottom: 0,
    ease: 'expo.inOut'
  }, 'part42')
  // 닫힐 때 텍스트 숨김
  .add(() => hideAllTextboxes(), 'part42');

  // 이미지(li) ↔ 텍스트 박스 매칭
  gsap.utils.toArray(".section4 .content li").forEach((img, i) => {
    let textbox = document.querySelector(".section4 .textbox" + (i + 1));
    if (!textbox) return;

    ScrollTrigger.create({
      trigger: img,
      start: "top center",
      onEnter: () => {
        // 다른 모든 textbox 즉시 숨기기
        document.querySelectorAll(".section4 .textwrap .textbox").forEach(tb => {
          if (tb !== textbox) {
            tb.classList.remove("on");
            gsap.set(tb, { opacity: 0, pointerEvents: "none" });
          }
        });
        // 현재 textbox 표시
        textbox.classList.add("on");
        gsap.to(textbox, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      },
      onEnterBack: () => {
        // 다른 모든 textbox 즉시 숨기기
        document.querySelectorAll(".section4 .textwrap .textbox").forEach(tb => {
          if (tb !== textbox) {
            tb.classList.remove("on");
            gsap.set(tb, { opacity: 0, pointerEvents: "none" });
          }
        });
        // 현재 textbox 표시
        textbox.classList.add("on");
        gsap.to(textbox, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      },
      onLeave: () => {
        // 화면을 벗어날 때 숨기기
        textbox.classList.remove("on");
        gsap.set(textbox, { opacity: 0, pointerEvents: "none" });
      },
      onLeaveBack: () => {
        // 화면을 벗어날 때 숨기기
        textbox.classList.remove("on");
        gsap.set(textbox, { opacity: 0, pointerEvents: "none" });
      }
    });
  });
}

function initSection4_M() {}



/* --------------------- SECTION 5~8 ---------------------- */
function initSection58_PC() {
  let pointLine = gsap.timeline({
    scrollTrigger: {
      trigger: ".section58_wrap",
      start: "top top",
      end: "+=200% top",
      scrub: true,
      pin: '.point_top',
      anticipatePin: 1,
    }
  })
  .to(".point_star", {
    left: '95%',
    scale: 1.5,
    rotate: 360,
    ease: 'linear'
  });

  document.querySelectorAll('.section58').forEach(function(part58) {
    let part58Round = part58.querySelector('.round');
    let part58Text = part58.querySelector('.textbox');
    if (!part58Round || !part58Text) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: part58,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
      }
    })
    .to(part58Round, {
      x: 800,
      y: -0,
      width: 800,
      height: 800,
      duration: 5,
      borderRadius: '50%',
      ease: 'expo.inOut'
    }, 'part5')
    .to(part58Text, {
      opacity: 1,
      duration: 5,
      ease: 'expo.inOut'
    }, 'part5');

    // notebook_screen 이미지 스크롤 효과
    part58.querySelectorAll(".notebook_screen").forEach(mockup => {
      let img = mockup.querySelector("img");
      if (!img) return;

      let imgHeight = img.getBoundingClientRect().height;
      let parentHeight = mockup.getBoundingClientRect().height;
      let moveY = imgHeight - parentHeight;

      gsap.fromTo(img, {
        y: -(parentHeight + imgHeight)
      }, {
        y: 0,
        ease: "slow.out",
        scrollTrigger: {
          trigger: mockup,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });
    });
  });
}

function initSection58_M() {
  // round 애니 제거
  gsap.to(".point_star", {
    scrollTrigger: {
      trigger: ".section58_wrap",
      start: "top bottom",
      end: "top top",
      scrub: true
    },
    left: "80%",
    scale: 1,
    rotate: 0
  });

  document.querySelectorAll(".section58 .textbox").forEach(text => {
    gsap.to(text, {
      scrollTrigger: {
        trigger: text,
        start: "top bottom",
        end: "center center",
        scrub: true
      },
      opacity: 1
    });
  });
}



/* --------------------- SECTION 9~10 ---------------------- */
function initSection9_PC() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section9",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  })
  .to(".page", {
    x: '-50%',
    autoAlpha: 0.3,
    ease: 'expo.inOut'
  }, 'mobile1')
  .to(".page_view img", {
    opacity: 1,
    delay: 0.2,
    ease: 'expo.inOut'
  }, 'mobile1')
  .to(".page", {
    yPercent: -60,
    ease: 'linear'
  }, 'mobile12')
  .to(".page_view img", {
    yPercent: -60,
    ease: 'linear'
  }, 'mobile12')
  .to(".section9 .textbox", {
    y: '-25%',
    ease: 'linear'
  }, 'mobile12');
}
function initSection10_PC() {
  let hands = gsap.utils.toArray(".section10 .img2 img");
  if (!hands || hands.length === 0) return;

  // 전체 섹션을 고정시키는 ScrollTrigger
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section10",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // 손 애니메이션은 전체 구간의 일부에서만 진행
  let handDuration = 0.4;
  let handStartProgress = 0.1;
  
  // 처음에 첫 번째 이미지를 보이게
  hands.forEach(h => h.classList.remove("active"));
  if (hands[0]) hands[0].classList.add("active");

  // 손 애니메이션을 위한 별도 타임라인
  hands.forEach((hand, i) => {
    let progress = handStartProgress + (i / hands.length) * handDuration;
    
    tl.add(() => {
      hands.forEach(h => h.classList.remove("active"));
      if (hands[i]) hand.classList.add("active");
    }, progress);
  });

  // 손 애니메이션 끝난 후 전부 숨김
  let handEndProgress = handStartProgress + handDuration;
  tl.add(() => {
    hands.forEach(h => h.classList.remove("active"));
  }, handEndProgress);

  // 배너 애니메이션
  tl.to(".section10 .bannerbox .banner", {
    x: -200,
    duration: 0.3,
    ease: "power2.inOut"
  }, 0.7);
}

function initSection9_M() {}
function initSection10_M() {}



/* --------------------- SECTION 11 & 12 (모든 디바이스) ---------------------- */
function initSection11() {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section11",
      start: "top center",
      end: "bottom center",
      scrub: true,
      anticipatePin: 1,
    }
  })
  .from(".section11 img", {
    x: '50%',
    y: '50%',
    autoAlpha: 0,
    stagger: 0.5,
    ease: 'expo.inOut'
  }, 'mobile1');
}

function initSection12() {
  gsap.to(".side-title", {
    scrollTrigger: {
      trigger: ".section12",
      start: "top center",
      end: "bottom center",
      toggleClass: { targets: ".section12", className: "on" },
    }
  });
}



/* =========================================================
   05. PC / MOBILE 분기
========================================================= */
ScrollTrigger.matchMedia({

  /* ------------------ PC ------------------ */
  "(min-width: 1025px)": function () {

    /* Lenis (PC Only) */
    const lenis = new Lenis();
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    initSection1_PC();
    initSection2_PC();
    initSection3_PC();
    initSection4_PC();
    initSection58_PC();
    initSection9_PC();
    initSection10_PC();
    initSection11();
    initSection12();
  },


  /* ------------------ MOBILE ------------------ */
  "(max-width: 1024px)": function () {

    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.killTweensOf("*");
    document.querySelectorAll(".on").forEach(el => el.classList.remove("on"));

    initSection1_M();
    initSection2_M();
    initSection3_M();
    initSection4_M();
    initSection58_M();
    initSection11();
    initSection12();
  }
});

