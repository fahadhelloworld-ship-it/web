// ============================================
// BUSINESS FORM - SIMPLE & EASY TO UNDERSTAND
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Get the form element
  const form = document.querySelector('.form-card');
  if (!form) return;

  // Get all form input elements
  const fullName = form.querySelector('input[type="text"]');
  const phone = form.querySelector('input[type="tel"]');
  const email = form.querySelector('input[type="email"]');
  const country = form.querySelector('select');
  const message = form.querySelector('textarea');
  const consent = form.querySelector('#consent1');
  const submitBtn = form.querySelector('.btn-submit');

  // Start
  loadSavedData();
  setupListeners();

  // ============================================
  // PART 1: EVENT LISTENERS (User Actions)
  // ============================================
  
  function setupListeners() {
    // Save data while user types
    const inputs = [fullName, phone, email, country, message];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', saveData);
        input.addEventListener('change', saveData);
      }
    });

    // Check email/phone when user leaves the field
    if (email) email.addEventListener('blur', validateEmail);
    if (phone) phone.addEventListener('blur', validatePhone);

    // Handle form submit
    submitBtn.addEventListener('click', handleSubmit);

    // Save consent checkbox
    if (consent) consent.addEventListener('change', saveData);
  }

  // ============================================
  // PART 2: SAVE & LOAD DATA (localStorage)
  // ============================================

  function saveData() {
    // Collect all form data
    const formData = {
      fullName: fullName?.value || '',
      phone: phone?.value || '',
      email: email?.value || '',
      country: country?.value || '',
      message: message?.value || '',
      consent: consent?.checked || false,
      savedAt: new Date().toISOString()
    };

    // Save to browser memory
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('✓ Data saved');
  }

  function loadSavedData() {
    // Get saved data from browser
    const saved = localStorage.getItem('formData');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      
      // Put saved data back into form fields
      if (fullName) fullName.value = data.fullName || '';
      if (phone) phone.value = data.phone || '';
      if (email) email.value = data.email || '';
      if (country) country.value = data.country || '';
      if (message) message.value = data.message || '';
      if (consent) consent.checked = data.consent || false;
      
      console.log('✓ Data loaded');
    } catch (e) {
      console.error('Error loading data:', e);
    }
  }

  // ============================================
  // PART 3: VALIDATION (Check if data is valid)
  // ============================================

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = email.value.trim() === '' || emailPattern.test(email.value);
    
    // Change border color if invalid
    email.style.borderColor = isValid ? '#e0dcd5' : '#ff6b6b';
    return isValid;
  }

  function validatePhone() {
    const phonePattern = /^[\d\s\-\+\(\)]{7,}$/;
    const isValid = phone.value.trim() === '' || phonePattern.test(phone.value);
    
    // Change border color if invalid
    phone.style.borderColor = isValid ? '#e0dcd5' : '#ff6b6b';
    return isValid;
  }

  function validateAllFields() {
    // Check if full name is empty
    if (!fullName?.value.trim()) {
      showError('Enter your full name');
      return false;
    }

    // Check if phone is empty
    if (!phone?.value.trim()) {
      showError('Enter your phone number');
      return false;
    }

    // Check if email is empty
    if (!email?.value.trim()) {
      showError('Enter your email');
      return false;
    }

    // Check if email is valid
    if (!validateEmail()) {
      showError('Invalid email address');
      return false;
    }

    // Check if phone is valid
    if (!validatePhone()) {
      showError('Invalid phone number');
      return false;
    }

    // Check if consent is checked
    if (consent && !consent.checked) {
      showError('Please accept the terms to continue');
      return false;
    }

    return true;
  }

  // ============================================
  // PART 4: FORM SUBMISSION (Send data)
  // ============================================

  function handleSubmit(e) {
    e.preventDefault();

    // First, check all fields are valid
    if (!validateAllFields()) return;

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Collect final form data
    const submissionData = {
      fullName: fullName?.value.trim() || '',
      phone: phone?.value.trim() || '',
      email: email?.value.trim() || '',
      country: country?.value || '',
      message: message?.value.trim() || '',
      consent: consent?.checked || false,
      submittedAt: new Date().toISOString()
    };

    // Save submission to history
    const allSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    allSubmissions.push(submissionData);
    localStorage.setItem('submissions', JSON.stringify(allSubmissions));

    console.log('Submitted:', submissionData);

    // Wait 1.5 seconds (simulate sending)
    setTimeout(() => {
      showSuccess('Submitted! Check your email.');
      clearFormData();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  function clearFormData() {
    // Empty all form fields
    if (fullName) fullName.value = '';
    if (phone) phone.value = '';
    if (email) email.value = '';
    if (country) country.value = '';
    if (message) message.value = '';
    
    // Clear saved data
    localStorage.removeItem('formData');
  }

  // ============================================
  // PART 5: NOTIFICATIONS (Show messages)
  // ============================================

  function showError(message) {
    showNotification('error', '❌ ' + message);
  }

  function showSuccess(message) {
    showNotification('success', '✓ ' + message);
  }

  function showNotification(type, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      color: white;
    `;

    // Set color based on type
    if (type === 'error') {
      notification.style.backgroundColor = '#ff6b6b'; // Red
    } else {
      notification.style.backgroundColor = '#51cf66'; // Green
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Add animation style (only once)
    if (!document.querySelector('[data-notif-style]')) {
      const style = document.createElement('style');
      style.setAttribute('data-notif-style', 'true');
      style.textContent = `
        @keyframes slideIn {
          from { 
            transform: translateX(400px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Remove notification after 4 seconds
    setTimeout(() => notification.remove(), 4000);
  }

  // ============================================
  // PART 6: SMOOTH SCROLLING (Anchor links)
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // LOG READY MESSAGE
  // ============================================

  console.log('%cForm System Active ✓', 'color: #c9a96e; font-size: 14px; font-weight: bold');
  console.log('%cData stored in: localStorage', 'color: #888; font-size: 12px');

});