// Business Page - Form Handling & Data Management

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== FORM HANDLING ====================
  const form = document.querySelector('.form-card');
  
  if (form) {
    // Get all form inputs
    const fullNameInput = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const emailInput = form.querySelector('input[type="email"]');
    const countrySelect = form.querySelector('select');
    const messageTextarea = form.querySelector('textarea');
    const consent1 = form.querySelector('#consent1');
    const consent2 = form.querySelector('#consent2');
    const submitButton = form.querySelector('.btn-submit');

    // Load saved data from localStorage when page loads
    loadFormData();

    // Save form data to localStorage as user types
    const inputs = [fullNameInput, phoneInput, emailInput, countrySelect, messageTextarea];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', saveFormData);
        input.addEventListener('change', saveFormData);
      }
    });

    // Handle form submission
    submitButton.addEventListener('click', handleFormSubmit);

    // Auto-save consent checkboxes
    if (consent1) consent1.addEventListener('change', saveFormData);
    if (consent2) consent2.addEventListener('change', saveFormData);

    // Real-time validation
    if (emailInput) {
      emailInput.addEventListener('blur', validateEmail);
    }
    if (phoneInput) {
      phoneInput.addEventListener('blur', validatePhone);
    }

    // Show success animation on valid input
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('focus', function() {
          this.style.borderColor = '#c9a96e';
          this.style.boxShadow = '0 0 0 2px rgba(201, 169, 110, 0.1)';
        });
        input.addEventListener('blur', function() {
          this.style.boxShadow = 'none';
        });
      }
    });
  }

  // ==================== FORM DATA FUNCTIONS ====================

  function saveFormData() {
    const formData = {
      fullName: fullNameInput ? fullNameInput.value : '',
      phone: phoneInput ? phoneInput.value : '',
      email: emailInput ? emailInput.value : '',
      country: countrySelect ? countrySelect.value : '',
      message: messageTextarea ? messageTextarea.value : '',
      consent1: consent1 ? consent1.checked : false,
      consent2: consent2 ? consent2.checked : false,
      savedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('businessFormData', JSON.stringify(formData));
    console.log('Form data saved to browser storage ✓');
  }

  function loadFormData() {
    const savedData = localStorage.getItem('businessFormData');
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        
        if (fullNameInput) fullNameInput.value = formData.fullName || '';
        if (phoneInput) phoneInput.value = formData.phone || '';
        if (emailInput) emailInput.value = formData.email || '';
        if (countrySelect) countrySelect.value = formData.country || '';
        if (messageTextarea) messageTextarea.value = formData.message || '';
        if (consent1) consent1.checked = formData.consent1 || false;
        if (consent2) consent2.checked = formData.consent2 || false;
        
        console.log('Form data loaded from browser storage ✓');
      } catch (e) {
        console.error('Error loading form data:', e);
      }
    }
  }

  // ==================== FORM VALIDATION ====================

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      emailInput.style.borderColor = '#ff6b6b';
      emailInput.title = 'Please enter a valid email address';
      return false;
    } else {
      emailInput.style.borderColor = '#e0dcd5';
      emailInput.title = '';
      return true;
    }
  }

  function validatePhone() {
    const phone = phoneInput.value.trim();
    // Accept various phone formats
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    
    if (phone && !phoneRegex.test(phone)) {
      phoneInput.style.borderColor = '#ff6b6b';
      phoneInput.title = 'Please enter a valid phone number';
      return false;
    } else {
      phoneInput.style.borderColor = '#e0dcd5';
      phoneInput.title = '';
      return true;
    }
  }

  function validateForm() {
    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!fullName) {
      showError('Please enter your full name');
      return false;
    }
    if (!phone) {
      showError('Please enter your phone number');
      return false;
    }
    if (!email) {
      showError('Please enter your email address');
      return false;
    }
    if (!validateEmail()) {
      showError('Please enter a valid email address');
      return false;
    }
    if (!validatePhone()) {
      showError('Please enter a valid phone number');
      return false;
    }
    if (consent1 && !consent1.checked) {
      showError('Please accept the terms to continue');
      return false;
    }

    return true;
  }

  // ==================== FORM SUBMISSION ====================

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    // Get form data
    const formData = {
      fullName: fullNameInput ? fullNameInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      country: countrySelect ? countrySelect.value : '',
      message: messageTextarea ? messageTextarea.value.trim() : '',
      consent1: consent1 ? consent1.checked : false,
      consent2: consent2 ? consent2.checked : false,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Save to localStorage with timestamp
    const allApplications = JSON.parse(localStorage.getItem('businessApplications') || '[]');
    allApplications.push(formData);
    localStorage.setItem('businessApplications', JSON.stringify(allApplications));

    // Log to console (for development/testing)
    console.log('Application submitted:', formData);

    // OPTIONAL: Send to external API/Email service
    // Uncomment and update the endpoint if you have a backend
    /*
    fetch('https://your-backend-url.com/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      showSuccess('Application submitted successfully! We\'ll contact you soon.');
      clearForm();
    })
    .catch(error => {
      console.error('Error:', error);
      showError('There was an error submitting your application. Please try again.');
    });
    */

    // Simulate server response delay
    setTimeout(() => {
      showSuccess('Application submitted successfully! Check your email for next steps.');
      clearForm();
      
      // Restore button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.opacity = '1';

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }

  function clearForm() {
    if (fullNameInput) fullNameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (emailInput) emailInput.value = '';
    if (countrySelect) countrySelect.value = '';
    if (messageTextarea) messageTextarea.value = '';
    
    // Keep consent checkboxes as is (user's choice)
    
    localStorage.removeItem('businessFormData');
    console.log('Form cleared');
  }

  // ==================== NOTIFICATION SYSTEM ====================

  function showError(message) {
    const notification = createNotification('error', message);
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  }

  function showSuccess(message) {
    const notification = createNotification('success', message);
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  }

  function createNotification(type, message) {
    const div = document.createElement('div');
    div.style.cssText = `
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
    `;

    if (type === 'error') {
      div.style.backgroundColor = '#ff6b6b';
      div.style.color = 'white';
      div.textContent = '❌ ' + message;
    } else {
      div.style.backgroundColor = '#51cf66';
      div.style.color = 'white';
      div.textContent = '✓ ' + message;
    }

    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
      style.setAttribute('data-notification', 'true');
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

    return div;
  }

  // ==================== SMOOTH SCROLL ====================
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==================== RESPONSIVE BEHAVIOR ====================
  window.addEventListener('resize', function() {
    const form = document.querySelector('.form-card');
    if (form && window.innerWidth < 480) {
      form.style.padding = '20px 16px';
    } else if (form) {
      form.style.padding = '40px 36px';
    }
  });

  // ==================== CONSOLE INFO ====================
  console.log('%cBusiness Form System Active ✓', 'color: #c9a96e; font-size: 14px; font-weight: bold');
  console.log('%cForm data saved to: localStorage → businessFormData', 'color: #888; font-size: 12px');
  console.log('%cAll applications saved to: localStorage → businessApplications', 'color: #888; font-size: 12px');
});
