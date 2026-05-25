// =====================================================
// WEBSITE FEATURES - SIMPLE & IMPORTANT ONLY
// =====================================================

document.addEventListener('DOMContentLoaded', function() {

  // =====================================================
  // FEATURE 1: SMOOTH SCROLLING (جب link پر کلک کریں)
  // =====================================================
  
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =====================================================
  // FEATURE 2: FAQ ACCORDION (Question/Answer کھولنا)
  // =====================================================
  
  const faqQuestions = document.querySelectorAll('.faq dl dt');
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      
      // Close all other answers
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          const otherAnswer = otherQuestion.nextElementSibling;
          if (otherAnswer) {
            otherAnswer.style.display = 'none';
          }
        }
      });
      
      // Toggle current answer
      if (answer) {
        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // =====================================================
  // FEATURE 3: BUTTON CLICK EFFECT (دبانے پر animation)
  // =====================================================
  
  const buttons = document.querySelectorAll('.btn, .btn-cta, .btn-main, .btn-submit');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Small animation when clicked
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // =====================================================
  // FEATURE 4: HOVER EFFECTS ON CARDS
  // =====================================================
  
  const cards = document.querySelectorAll('.card, .why-now-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // =====================================================
  // READY MESSAGE
  // =====================================================
  
  console.log('%cWebsite Features Active ✓', 'color: #c9a96e; font-size: 14px; font-weight: bold');

});