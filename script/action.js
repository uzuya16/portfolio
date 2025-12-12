// ===============================
// 로딩 체크
// ===============================
        window.addEventListener('load', function() {
          document.querySelector('.loading-overlay').style.display = 'none';
        });

// ===============================
// 이미지 로딩 체크 (필요 시 유지)
// ===============================
        function checkAllImagesLoaded() {
          const images = document.querySelectorAll('img');
          let loadedCount = 0;

          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.onload = () => {
                loadedCount++;
                updateProgress(loadedCount / images.length * 100);
              };
            }
          });
        }


// ===============================
// Ctrl + 확대/축소 방지
// ===============================
        window.addEventListener("wheel", function(e) {
          if (e.ctrlKey) e.preventDefault();
        }, { passive: false });

        window.addEventListener("keydown", function(e) {
          if (e.ctrlKey && (
              e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
            e.preventDefault();
          }
        });


// ===============================
// 마우스 따라다니는 원
// ===============================
        const circle = document.querySelector('.circle');
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;
        const speed = 0.12;

        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        function animate() {
          circleX += (mouseX - circleX) * speed;
          circleY += (mouseY - circleY) * speed;

          circle.style.marginLeft = (circleX - 15) + "px";
          circle.style.marginTop = (circleY - 15) + "px";

          requestAnimationFrame(animate);
        }
        animate();

        $('.linkA').mouseover(function(){
          $('span.circle').css({width:'100px', height:'100px', transform:'translate(-50%,-50%)', marginLeft:0, marginTop:0})
        }).mouseout(function(){
          $('span.circle').css({width:'', height:'', transform:'', marginLeft:'', marginTop:''})
        });


// ===============================
// GSAP + ScrollTrigger
// ===============================
        gsap.registerPlugin(ScrollTrigger);


// ===============================
// PC 전용 애니메이션 실행 함수
// ===============================
        function initPCAnimations() {

  // -----------------------------
  // Lenis (PC 전용)
  // -----------------------------
          const lenis = new Lenis();
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);


  // ============================================================
  // SECTION 1
  // ============================================================
          gsap.timeline({
              scrollTrigger: {
                trigger: ".section1",
                start: "top top",
                end: "+=" + (document.querySelector(".top_box").getBBox().width), 
                scrub: true,
                pin:true,
              }
            })
            .from(".top_red", { scale:40, transformOrigin: "20% center" }, 'sign')
            .to(".top_red", { autoAlpha:0 })
            .to(".section1 .sign", { scale:0 }, 'sign')
            .to(".top_box", {
              x: () => -(document.querySelector(".top_box").getBBox().width - window.innerWidth),
              ease:'linear'
            })
            .to(".top_box", {
              scale:20,
              x:1700,
              transformOrigin: "right center",
              display:'none'
            }, 'mainTop')
            .to(".main", { opacity:1 }, 'mainTop')
            .to(".main_title", { fontSize:'5rem' },'mainText')
            .to(".tt", { fontSize:'3rem', opacity:0.5 },'mainText')
            .to(".mainLast", { fontSize:'7rem' },'mainText');


  // ============================================================
  // SECTION 2
  // ============================================================
          let sec2TL = gsap.timeline({
            scrollTrigger: {
              trigger: ".section2",
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
            }
          });

          sec2TL
            .from(".section2 .left .small", { autoAlpha: 0, y: 20 })
            .from(".section2 .left .mini", { autoAlpha: 0, y: 20 })
            .from(".section2 .center", { autoAlpha: 0, y: 20 })
            .from(".section2 .right", { autoAlpha: 0, y: 20 });

          sec2TL
            .from(".point_1", { autoAlpha: 0, y: 10 })
            .to(".point_1", { x: -217 }, "p1")
            .to(".plus1", { rotate: 360 }, "p1");

          sec2TL
            .from(".point_2", { autoAlpha: 0, y: 10 })
            .to(".point_2", { x: -300 }, "p2")
            .to(".plus2", { rotate: 360 }, "p2");

          sec2TL
            .from(".point_3", { autoAlpha: 0, y: 10 })
            .to(".point_3", { x: -70 }, "p3")
            .to(".plus3", { rotate: 360 }, "p3");

          sec2TL
            .from(".point_4", { autoAlpha: 0, y: 10 })
            .to(".point_4", { x: -310 }, "p4")
            .to(".plus4", { rotate: 360 }, "p4");

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


  // ============================================================
  // SECTION 3
  // ============================================================
          gsap.timeline({
            scrollTrigger: {
              trigger: ".section3",
              start: "top top",
              end: "center top",
              scrub: true,
              pin:true,
            }
          }).from(".section3 .img_box li", {
              autoAlpha:0,
              stagger:0.5,
              scale:0.5,
              duration:10,
              ease:'power1.inOut(3)'
            });

          document.querySelectorAll('.section3 video').forEach(function(v){
            v.addEventListener('mouseenter', function(){ this.play(); });
            v.addEventListener('mouseleave', function(){ this.pause(); });
          });

          const profile = document.querySelector('.section3 .profile');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) profile.classList.add('on');
              else profile.classList.remove('on');
            });
          }, { threshold: 0.7 });

          observer.observe(profile);



// ------------------------------------------------
// SECTION (4)
// ------------------------------------------------
        // 반응형 SVG 제어 버전
        let sec4 = document.querySelector(".section4 .content");
        let sec4H = sec4.getBoundingClientRect().height;
        let winH = window.innerHeight;
        let moveY = sec4H - winH;

        // 초기 상태
        gsap.set(".section4 .textwrap .textbox", { opacity: 0, pointerEvents: "none", position: "absolute" });

        // 메인 타임라인
        let contentAnim = gsap.timeline({
          scrollTrigger: {
            trigger: ".svg_box",
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: ".section4",
            // markers: true,
          }
        });

        // -----------------------------
        //  열림
        // -----------------------------
        contentAnim
          .to(".section4", {
            backgroundColor: "#FFFDF5",
            ease: "expo.inOut"
          }, "open")

          .to(".section4 .part4_left", {
            left: "-1100px",
            marginTop: "-25%",
            ease: "expo.inOut",
            // 👉 열릴 때(스크롤 내릴 때)
            onStart: () => {
              if (window.innerWidth <= 1450) {
                gsap.to(".section4 .part4_left", {
                  autoAlpha: 0, // opacity + visibility
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
            },
            // 👉 스크롤 역방향으로 올라갈 때 (닫히는 방향 반대로)
            onReverseComplete: () => {
              if (window.innerWidth <= 1450) {
                gsap.to(".section4 .part4_left", {
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: "power2.in"
                });
              }
            }
          }, "open")

          // .to(".section4 .part4_right", { right: "-900px", marginTop: "-30%", ease: "expo.inOut" }, "open")
                  .to(".section4 .part4_right", {
                    right: () => {
                if (window.innerWidth <= 800) return "-95%";
                else if (window.innerWidth <= 1025) return "-85%";          
                else if (window.innerWidth <= 1150) return "-70%";
                else if (window.innerWidth <= 1450) return "-68%";
                else if (window.innerWidth <= 1900) return "-48%";
                else return "-700px";
              },
              marginTop: "-30%",
              ease: "expo.inOut"
                  }, "open")
          .to(".section4 .part4_left svg", { fill: "#be432f", ease: "expo.inOut" }, "open")
          .to(".section4 .part4_right svg", { fill: "#be432f", ease: "expo.inOut" }, "open")

        // -----------------------------
        //  이미지1 → 텍스트1
        // -----------------------------
          .to(".section4 .content", {
            y: -moveY / 2,
            ease: "power1.out",
            onUpdate: () => {
              let progress = contentAnim.progress();
              if (progress > 0.2 && progress < 0.5) {
                gsap.set(".section4 .textbox1", { opacity: 1, pointerEvents: "auto", position: "relative" });
                gsap.set(".section4 .textbox2", { opacity: 0, pointerEvents: "none", position: "absolute" });
              }
            }
          }, "show1")

        // -----------------------------
        // 이미지2 → 텍스트2
        // -----------------------------
          .to(".section4 .content", {
            y: -moveY,
            ease: "power1.out",
            onUpdate: () => {
              let progress = contentAnim.progress();
              if (progress > 0.5 && progress < 0.8) {
                gsap.set(".section4 .textbox1", { opacity: 0, pointerEvents: "none", position: "absolute" });
                gsap.set(".section4 .textbox2", { opacity: 1, pointerEvents: "auto", position: "relative" });
              }
            }
          }, "show2")

        // -----------------------------
        //  닫힘
        // -----------------------------
          .to(".section4 .part4_left", {
            left: "-10%",
            marginTop: "0",
            ease: "expo.inOut",
            // 👉 닫힐 때(스크롤 아래에서 위로)
            onStart: () => {
              if (window.innerWidth <= 1450) {
                gsap.to(".section4 .part4_left", {
                  autoAlpha: 1,
                  duration: 0.6,
                  ease: "power2.in"
                });
              }
            },
            // 👉 스크롤 역방향(다시 열릴 때)
            onReverseComplete: () => {
              if (window.innerWidth <= 1450) {
                gsap.to(".section4 .part4_left", {
                  autoAlpha: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
            }
          }, "close")

          .to(".section4 .part4_right", { right: "-10%", marginTop: "0", ease: "expo.inOut" }, "close")
          .to(".section4 .part4_left svg", { fill: "#FFFDF5", ease: "expo.inOut" }, "close")
          .to(".section4 .part4_right svg", { fill: "#FFFDF5", ease: "expo.inOut" }, "close")
          .to(".section4 .textwrap .textbox", { opacity: 0, pointerEvents: "none" }, "close")
          .to(".section4 .cover", { bottom: 0, ease: "expo.inOut" }, "close");




// ------------------------------------------------
// SECTION (5 ~ 8)
// ------------------------------------------------
          let pointLine = gsap.timeline({
            scrollTrigger: {
              trigger: ".section58_wrap",
              start: "top top",
              end: "+=200% top",
              scrub: true,
              pin: '.point_top',
              anticipatePin: 1,
              /* markers: true, */
            }
          })
          .to(".point_star", {
            left:'95%',
            scale:1.5,
            rotate:360,
            ease:'linear'
          });

          document.querySelectorAll('.section58').forEach(function(part58){
            let part58Round = part58.querySelector('.round');
            let part58Text = part58.querySelector('.textbox');

            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: part58,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
                // pin 된 동안 클릭 방해 요소 제거
                onEnter: () => {
                  let spacer = part58.parentElement;
                  if (spacer && spacer.classList.contains("pin-spacer")) {
                    spacer.style.pointerEvents = "none";
                  }
                  gsap.set(part58.querySelectorAll(".linkA"), { pointerEvents: "auto", zIndex: 9999 });
                },
                onLeave: () => {
                  let spacer = part58.parentElement;
                  if (spacer && spacer.classList.contains("pin-spacer")) {
                    spacer.style.pointerEvents = "auto";
                  }
                },
                onEnterBack: () => {
                  let spacer = part58.parentElement;
                  if (spacer && spacer.classList.contains("pin-spacer")) {
                    spacer.style.pointerEvents = "none";
                  }
                  gsap.set(part58.querySelectorAll(".linkA"), { pointerEvents: "auto", zIndex: 9999 });
                },
                onLeaveBack: () => {
                  let spacer = part58.parentElement;
                  if (spacer && spacer.classList.contains("pin-spacer")) {
                    spacer.style.pointerEvents = "auto";
                  }
                },
              }
            });

            tl.to(part58Round, {
                x:800,
                y:0,
                width:800,
                height:800,
                duration:5,
                borderRadius:'50%',
                ease:'expo.inOut'
              }, 'part5')
            .to(part58Text, {
                opacity:1,
                duration:5,
                ease:'expo.inOut'
              }, 'part5');

            part58.querySelectorAll(".notebook_screen").forEach(mockup => {
              let img = mockup.querySelector("img");
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

          // hover 애니메이션 그대로
          document.querySelectorAll(".linkA img").forEach(img => {
            img.addEventListener("mouseenter", () => {
              gsap.to(img, { scale: 1.3, duration: 0.3, ease: "power2.out" });
            });
            img.addEventListener("mouseleave", () => {
              gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.in" });
            });
          });


    

// ------------------------------------------------
// SECTION (9)
// ------------------------------------------------
        gsap.timeline({
        scrollTrigger: {
          trigger: ".section9",
          start: "top top",
          end: "+=1000",   // 스크롤 길이
          scrub: true,
          pin: true,
          // pinSpacing:true,
          anticipatePin: 1,
        }
      }).to(".page", {
        x:'-50%',
        autoAlpha:0.3,
          ease:'expo.inOut'
      }, 'mobile1')
      .to(".page_view img", {
        opacity:1,
        delay:0.2,
          ease:'expo.inOut'
      }, 'mobile1')

      .to(".page", {
        yPercent:-60,
          ease:'linear'
      }, 'mobile12')
      .to(".page_view img", {
        yPercent:-60,
          ease:'linear'
      }, 'mobile12')
      .to(".section9 .textbox", {
        y:'-25%',
          ease:'linear'
      }, 'mobile12')



      let hands = gsap.utils.toArray(".section10 .img2 img");

      // 전체 섹션을 고정시키는 ScrollTrigger (더 길게 머물게 함)
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section10",
          start: "top top",
          end: "+=2000", // 섹션 전체가 머무는 시간을 늘림
          scrub: true,
          pin: true,
          anticipatePin: 1,
          // markers: true
        }
      });

      // 손 애니메이션은 전체 구간의 일부에서만 진행 (빨리 진행)
      let handDuration = 0.4; // 전체 구간의 40%에서만 손 애니메이션 진행
      let handStartProgress = 0.1; // 10% 지점에서 시작
      // 처음에 첫 번째 이미지를 보이게
      hands.forEach(h => h.classList.remove("active"));
      if (hands[0]) hands[0].classList.add("active");
      // 손 애니메이션을 위한 별도 타임라인
      hands.forEach((hand, i) => {
        let progress = handStartProgress + (i / hands.length) * handDuration;
        
        tl.add(() => {
          // 전부 숨김
          hands.forEach(h => h.classList.remove("active"));
          // 현재 이미지만 보이게
          if (hands[i]) hand.classList.add("active");
        }, progress); 
      });

      // 손 애니메이션 끝난 후 전부 숨김
      let handEndProgress = handStartProgress + handDuration;
      tl.add(() => {
        hands.forEach(h => h.classList.remove("active"));
      }, handEndProgress);

      // 나머지 구간에서는 다른 애니메이션이나 효과를 추가할 수 있음
      // 예: 배너 애니메이션
      tl.to(".section10 .bannerbox .banner", {
        x: -200,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0.7); // 70% 지점에서 배너 슬라이드





// ------------------------------------------------
// SECTION (11)
// ------------------------------------------------
        gsap.timeline({
        scrollTrigger: {
          trigger: ".section11",
          start: "top center",
          end: "bottom center",
          scrub: true,
          anticipatePin: 1,
          // markers:true
        }
      }).from(".section11 img", {
        x:'50%',
        y:'50%',
        autoAlpha:0,
        stagger:0.5,
          ease:'expo.inOut'
      }, 'mobile1')




  // ============================================================
  // SECTION 12 — side-title toggle
  // ============================================================
      gsap.to(".side-title", {
        scrollTrigger: {
          trigger: ".section12",
          start: "top center",
          end: "bottom center",
          toggleClass: {targets: ".section12", className: "on"},
        }
      });

    } // === initPCAnimations 끝 ===



// ===============================
// GSAP OFF (모바일/태블릿 1024 이하)
// ===============================
    function disableGSAP() {
      console.log("GSAP 비활성화됨(모바일/태블릿)");

      ScrollTrigger.getAll().forEach(st => st.kill(true));
      gsap.killTweensOf("*");
      gsap.set("*", { clearProps: "all" });

      document.querySelectorAll(".on").forEach(el => el.classList.remove("on"));
    }


// ===============================
// 디바이스 + 화면폭 감지 후 실행
// ===============================
    function checkMode() {
      let isTouch = matchMedia("(pointer: coarse)").matches;
      let width = window.innerWidth;

      if (isTouch || width <= 1024) {
        disableGSAP();
      } else {
        initPCAnimations();
      }
    }

    checkMode();

    // 브라우저 크기 변경 시 자동 업데이트
    window.addEventListener("resize", () => {
      checkMode();
      ScrollTrigger.refresh();
    });


// ===============================
// 모바일 100vh 버그 대응
// ===============================
    function setVh() {
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    }
    setVh();
    window.addEventListener('resize', setVh);



