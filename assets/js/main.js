
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  


  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  document.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    var formId = event.target.id;
  
    if (formId === "lending-calculator-form") {
      handleLendingFormSubmit(event);
    } else if (formId === "insurance-calculator-form") {
      handleInsuranceFormSubmit(event);
    } else if (formId === "financing-calculator-form") {
      handleFinancingFormSubmit(event);
    }
  });
  
  function handleLendingFormSubmit(event) {
    // Retrieve user inputs
    var propertyValue = parseFloat(document.getElementById("property-value").value);
  
    // Perform lending calculations
    var loanAmount = calculateLoanAmount(propertyValue);
  
    // Display lending results
    document.getElementById("lending-result").innerHTML = "Loan Amount: $" + loanAmount.toFixed(2);
  }
  
  function calculateLoanAmount(propertyValue) {
    // Custom logic to calculate loan amount based on property value
    // Example: Loan amount is 80% of the property value
    var loanAmount = propertyValue * 0.8;
    return loanAmount;
  }
  
  function handleInsuranceFormSubmit(event) {
    // Retrieve user inputs
    var businessValue = parseFloat(document.getElementById("business-value").value);
    var numberOfEmployees = parseInt(document.getElementById("number-of-employees").value);
  
    // Perform insurance calculations
    var insuranceAmount = calculateInsuranceAmount(businessValue, numberOfEmployees);
  
    // Display insurance results
    document.getElementById("insurance-result").innerHTML = "Estimated Insurance Coverage: $" + insuranceAmount.toFixed(2);
  }
  
  function calculateInsuranceAmount(businessValue, numberOfEmployees) {
    // Custom logic to calculate insurance coverage amount
    // Example: Coverage amount is 5% of the business value per employee
    var insuranceAmount = businessValue * 0.05 * numberOfEmployees;
    return insuranceAmount;
  }
  
  function handleFinancingFormSubmit(event) {
    // Retrieve user inputs
  var equipmentCost = parseFloat(document.getElementById("equipment-cost").value);

  // Perform equipment financing calculations
  var loanAmount = calculateFinancingAmount(equipmentCost);

  // Display equipment financing results
  document.getElementById("financing-result").innerHTML = "Financing Amount: $" + loanAmount.toFixed(2);
  }

  function calculateFinancingAmount(equipmentCost) {
    // Custom logic to calculate loan amount based on equipment cost
    // Example: Loan amount is 90% of the equipment cost
    var financingAmount = equipmentCost * 0.9;
    return financingAmount;
  }

})();