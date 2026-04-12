// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Hero Reveal Setup
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
  
  // Stagger reveal hero content
  tl.from(".hero h1", { y: 40, opacity: 0, duration: 1.2, delay: 0.2 })
    .from(".mock-ui-container", { y: 60, opacity: 0, duration: 1.5 }, "-=0.6");

  // 2. Scroll Triggered Feature Cards
  gsap.utils.toArray('.gsap-reveal').forEach((elem) => {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 85%", // Reveal when element is 85% from top of viewport
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

  // 3. Subtle Ambient Glow Movement on mouse move
  const glow = document.querySelector('.ambient-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 40; // max 20px movement
      const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
      
      gsap.to(glow, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    });
  }

  // 4. Custom Follow Cursor
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    // Pure fast-path vanilla JS mouse tracking (Zero latency, hardware accelerated)
    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    // Expand cursor over interactive elements
    const clickables = document.querySelectorAll('a, button, .wb-btn, .nav-cta');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
    });
  }

});
