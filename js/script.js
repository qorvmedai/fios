'use strict';

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
  // Pricing
  currentPrice: '₦10,000',
  currentPriceRaw: 10000,
  originalPrice: '₦65,000',
  originalPriceRaw: 65000,
  spots: 100,
  cohortStart: 'August 1st',
  
  // Countdown - auto-resetting 4-day cycle
  countdownCycleDays: 4,
  
  // Payment Bank Details (Updated to User Copy)
  paymentPlatform: 'OPAY',
  accountNumber: '9042447293',
  accountName: 'CHIDIEBUBE NICHOLAS DIVINE',
  
  // Content
  programName: 'F.I.I.S',
  programFullName: 'First Independence Income System',
  totalStudentsTested: '200+',
  currentStudents: 40,
  
  // Value anchoring
  coreSystemValue: '₦130,000',
  bonusesValue: '₦69,000',
  totalValue: '₦199,000'
};

// Utility helpers
const padZero = (num) => (num < 10 ? `0${num}` : `${num}`);

const checkReducedMotion = () => {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ========================================
// 1. DYNAMIC CONFIG BINDING
// ========================================
const initDynamicContent = () => {
  const configElements = document.querySelectorAll('[data-config]');
  
  configElements.forEach(el => {
    const key = el.getAttribute('data-config');
    if (CONFIG[key] !== undefined) {
      el.textContent = CONFIG[key];
    }
  });
};

// ========================================
// 2. COUNTDOWN TIMER
// ========================================
const initCountdown = () => {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-minutes');
  const secsEl = document.getElementById('countdown-seconds');
  
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const CYCLE_MS = CONFIG.countdownCycleDays * 24 * 60 * 60 * 1000;
  const EPOCH = new Date('2026-01-01T00:00:00+01:00').getTime();

  const getTarget = () => {
    const now = Date.now();
    const elapsed = now - EPOCH;
    const cyclesPassed = Math.floor(elapsed / CYCLE_MS);
    return EPOCH + (cyclesPassed + 1) * CYCLE_MS;
  };

  let targetDate = getTarget();

  const updateTimer = () => {
    const now = Date.now();
    let distance = targetDate - now;

    if (distance <= 0) {
      targetDate = getTarget();
      distance = targetDate - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = padZero(days);
    hoursEl.textContent = padZero(hours);
    minsEl.textContent = padZero(minutes);
    secsEl.textContent = padZero(seconds);
  };

  updateTimer();
  setInterval(updateTimer, 1000);
};

// ========================================
// 3. COPY TO CLIPBOARD (ACCURATE & TESTED)
// ========================================
const initCopyToClipboard = () => {
  const copyBtn = document.getElementById('copy-btn');
  const toast = document.getElementById('copy-toast');
  
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const accountNumber = CONFIG.accountNumber;
    const originalText = '📋 Copy Account Number';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        // Fallback for non-https or legacy webviews
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        if (!successful) throw new Error('Copy command failed');
      }

      // Success UI Feedback
      copyBtn.innerHTML = 'Copied! ✓';
      copyBtn.classList.add('copied');

      if (toast) {
        toast.textContent = `Account number ${accountNumber} copied to clipboard!`;
        toast.classList.remove('hidden');
      }

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('copied');
        if (toast) toast.classList.add('hidden');
      }, 2500);

    } catch (err) {
      console.error('Clipboard copy failed:', err);
      copyBtn.innerHTML = 'Failed - Select Manually';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2500);
    }
  });
};

// ========================================
// 4. ACCORDION FAQ (ACCESSIBLE & FUNCTIONAL)
// ========================================
const initAccordion = () => {
  const triggers = document.querySelectorAll('.accordion-trigger');
  
  triggers.forEach(trigger => {
    const toggle = () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;

      // Close all other accordions
      triggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherTrigger.nextElementSibling) {
            otherTrigger.nextElementSibling.classList.remove('open');
          }
        }
      });

      // Toggle clicked
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (content) content.classList.remove('open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.classList.add('open');
      }
    };

    trigger.addEventListener('click', toggle);

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
};

// ========================================
// 5. STUDENT ID CAROUSEL & BATCH TABS
// ========================================
const initStudentCarousel = () => {
  const batches = document.querySelectorAll('.student-id-batch');
  const tabs = document.querySelectorAll('.batch-tab');
  const prevBtn = document.getElementById('student-prev');
  const nextBtn = document.getElementById('student-next');
  const indicator = document.getElementById('student-indicator');

  if (!batches.length) return;

  let currentBatch = 0;
  const totalBatches = batches.length;

  const showBatch = (index) => {
    currentBatch = index;

    batches.forEach((b, idx) => {
      b.classList.toggle('active', idx === index);
    });

    tabs.forEach((t, idx) => {
      t.classList.toggle('active', idx === index);
    });

    if (indicator) indicator.textContent = `${index + 1} / ${totalBatches}`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === totalBatches - 1;
  };

  // Tab click events
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      showBatch(index);
    });
  });

  // Prev / Next button events
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentBatch > 0) showBatch(currentBatch - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentBatch < totalBatches - 1) showBatch(currentBatch + 1);
    });
  }

  showBatch(0);
};

// ========================================
// 6. TESTIMONIAL SLIDING CAROUSEL
// ========================================
const initTestimonialCarousel = () => {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const indicator = document.getElementById('testimonial-indicator');

  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;
  let current = 0;

  const goTo = (index) => {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (indicator) indicator.textContent = `${current + 1} / ${totalSlides}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === totalSlides - 1;
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch / Swipe handling
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    }
  }, { passive: true });

  goTo(0);
};

// ========================================
// 7. SMOOTH SCROLLING
// ========================================
const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ========================================
// 8. SCROLL OBSERVER & FLOATING CTA BAR
// ========================================
const initScrollObserver = () => {
  const elements = document.querySelectorAll('.animate-in');
  const floatingBar = document.getElementById('floating-cta-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  if (checkReducedMotion()) {
    elements.forEach(el => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }

  // Window scroll handler for floating bar & back-to-top
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (floatingBar) {
      if (scrollY > 500) {
        floatingBar.classList.add('visible');
      } else {
        floatingBar.classList.remove('visible');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ========================================
// 9. LIVE PAYMENT NOTIFICATION POPUPS
// ========================================
const initPaymentNotifications = () => {
  const popup = document.getElementById('payment-notification');
  const textEl = document.getElementById('notification-text');
  const closeBtn = document.getElementById('notification-close');

  if (!popup || !textEl) return;

  // Editable notification list: [Student Name] from [University] just made a payment
  const notifications = [
    { name: 'Abdusamiu', school: 'UNILAG' },
    { name: 'Favour', school: 'LASU' },
    { name: 'Daniel', school: 'UNILORIN' },
    { name: 'Precious', school: 'KWASU' },
    { name: 'David', school: 'University of Ibadan' },
    { name: 'Esther', school: 'ABU Zaria' },
    { name: 'Chiamaka', school: 'UNN' },
    { name: 'Michael', school: 'DELSU' },
    { name: 'Blessing', school: 'AAU' },
    { name: 'Samuel', school: 'UNIBEN' }
  ];

  let currentIndex = 0;
  let isDismissed = false;
  let timerId = null;

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isDismissed = true;
      popup.classList.remove('show');
      if (timerId) clearTimeout(timerId);
    });
  }

  const showNextNotification = () => {
    if (isDismissed) return;

    const data = notifications[currentIndex];
    textEl.innerHTML = `<strong>${data.name}</strong> from <strong>${data.school}</strong> just made a payment`;

    popup.classList.add('show');

    // Display for 4 seconds, then slide out
    timerId = setTimeout(() => {
      popup.classList.remove('show');

      // Next index in array
      currentIndex = (currentIndex + 1) % notifications.length;

      // Pause 6 seconds before showing next
      timerId = setTimeout(showNextNotification, 6000);
    }, 4000);
  };

  // Initial display after 4 seconds
  timerId = setTimeout(showNextNotification, 4000);
};

// ========================================
// INITIALIZATION
// ========================================
const init = () => {
  initDynamicContent();
  initCountdown();
  initCopyToClipboard();
  initAccordion();
  initStudentCarousel();
  initTestimonialCarousel();
  initSmoothScrolling();
  initScrollObserver();
  initPaymentNotifications();
};

document.addEventListener('DOMContentLoaded', init);
