// Mobile Menu Toggle
function toggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
  } else {
    mobileNav.classList.add('active');
  }
}

// Set dynamic background images
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero-img-bg');
  const aboutImage = document.getElementById('about-img-box');
  const svcFeed = document.getElementById('svc-feed');
  const svcEquip = document.getElementById('svc-equip');
  const svcMed = document.getElementById('svc-med');
  const svcEgg = document.getElementById('svc-egg');

  if (heroSection) heroSection.style.backgroundImage = "url('images/hero-banner.png')";
  if (aboutImage) aboutImage.style.backgroundImage = "url('images/prabha%20trader%20pic.jpg')";
  if (svcFeed) svcFeed.style.backgroundImage = "url('images/eggmash%20.png')";
  if (svcEquip) svcEquip.style.backgroundImage = "url('images/farming-equipment-new.png')";
  // Updated to use the new medicine and supplements image
  if (svcMed) svcMed.style.backgroundImage = "url('images/cal-2-mix.png')";
  if (svcEgg) svcEgg.style.backgroundImage = "url('images/fresh-brown-eggs.png')";

  // Navbar transparency on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 1)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Handle contact form submission and refresh
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        if (response.status == 200) {
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          overlay.style.zIndex = '9998';
          
          const popup = document.createElement('div');
          popup.style.position = 'fixed';
          popup.style.top = '50%';
          popup.style.left = '50%';
          popup.style.transform = 'translate(-50%, -50%)';
          popup.style.backgroundColor = '#fff';
          popup.style.padding = '40px';
          popup.style.borderRadius = '12px';
          popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
          popup.style.zIndex = '9999';
          popup.style.textAlign = 'center';
          popup.style.minWidth = '300px';
          
          popup.innerHTML = `
            <div style="color: #2ecc71; font-size: 50px; margin-bottom: 15px;"><i class="fa-solid fa-circle-check"></i></div>
            <h3 style="margin: 0 0 10px 0; color: #333; font-family: 'Outfit', sans-serif; font-size: 24px;">Success!</h3>
            <p style="margin: 0; color: #666; font-family: 'Inter', sans-serif;">Your quote has been submitted successfully.</p>
          `;
          
          document.body.appendChild(overlay);
          document.body.appendChild(popup);
          
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          console.error(await response.json());
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        console.error(error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

});

// Jarvis AI Chatbot Logic
let jarvisHasGreeted = false;

function toggleJarvis() {
  const chatbot = document.getElementById('jarvisChatbot');
  chatbot.classList.toggle('active');
  
  if (chatbot.classList.contains('active') && !jarvisHasGreeted) {
    setTimeout(() => {
      appendJarvisMessage("Hello! I am Prabha, the AI assistant for Prabha Traders. How can I help you today?", 'bot');
      jarvisHasGreeted = true;
    }, 500);
  }
}

function sendJarvisMessage() {
  const input = document.getElementById('jarvisInput');
  const message = input.value.trim();
  
  if (message === '') return;
  
  appendJarvisMessage(message, 'user');
  input.value = '';
  
  // Show delay before response
  setTimeout(() => {
    generateJarvisResponse(message.toLowerCase());
  }, 1000);
}

function appendJarvisMessage(text, sender) {
  const messagesDiv = document.getElementById('jarvisMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'jarvis-msg ' + sender;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

let jarvisState = 'IDLE';

function generateJarvisResponse(msg) {
  let reply = "";
  
  if (jarvisState === 'QUOTE_NAME') {
    document.getElementById('name').value = msg;
    jarvisState = 'QUOTE_PHONE';
    reply = "Nice to meet you! What is your phone number?";
  } else if (jarvisState === 'QUOTE_PHONE') {
    document.getElementById('phone').value = msg;
    jarvisState = 'QUOTE_INTEREST';
    reply = "Got it. Are you interested in Poultry Feed, Equipment, Wholesale, or Something else?";
  } else if (jarvisState === 'QUOTE_INTEREST') {
    let interestSelect = document.getElementById('interest');
    if(msg.includes('feed')) { interestSelect.value = 'Poultry Feed'; }
    else if(msg.includes('egg')) { interestSelect.value = 'Fresh Brown Eggs'; }
    else if(msg.includes('chick') || msg.includes('bv380')) { interestSelect.value = 'BV380 Chicks'; }
    else if(msg.includes('equip') || msg.includes('farm')) { interestSelect.value = 'Equipment'; }
    else if(msg.includes('whole') || msg.includes('bulk')) { interestSelect.value = 'Wholesale / Bulk Order'; }
    else { interestSelect.value = 'Other Inquiry'; }
    
    jarvisState = 'QUOTE_MSG';
    reply = "Perfect! Is there any specific message or detail you'd like to add to your quote request?";
  } else if (jarvisState === 'QUOTE_MSG') {
    document.getElementById('message').value = msg;
    jarvisState = 'IDLE';
    
    // Scroll to the contact form smoothly
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
    
    reply = "All done! I've magically filled out your Quote form for you. I'm scrolling down to it now so you can review and click 'Submit Inquiry'!";
  } else {
    // Normal conversation
    reply = "I'm still learning! For detailed specific inquiries, please use our contact form or chat with us on WhatsApp.";
    
    if (msg.includes('quote') || msg.includes('want to buy') || msg.includes('order')) {
      jarvisState = 'QUOTE_NAME';
      reply = "I can help you prepare a quote right now! First, what is your full name?";
    } else if (msg.includes('hello') || msg.includes('hi ') || msg === 'hi') {
      reply = "Hello there! What can I assist you with on your farm today?";
    } else if (msg.includes('feed') || msg.includes('mash')) {
      reply = "We supply premium poultry feeds including Starter, Grower, Finisher, and Eggmash formulations. Type 'quote' if you'd like to place an order!";
    } else if (msg.includes('egg')) {
      reply = "We offer farm fresh brown eggs! Type 'quote' to place an order.";
    } else if (msg.includes('chick') || msg.includes('bv380')) {
      reply = "We offer high-quality BV380 chicks! Type 'quote' to place an order.";
    } else if (msg.includes('equip') || msg.includes('drinker') || msg.includes('feeder')) {
      reply = "Our farming equipment range is state-of-the-art! Type 'quote' to order.";
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
      jarvisState = 'QUOTE_NAME';
      reply = "The best way to get our exact bulk pricing is a quote. Let's start! What is your full name?";
    } else if (msg.includes('location') || msg.includes('where') || msg.includes('address')) {
      reply = "We are located at 8.966283, 76.7624736, and you can find our exact location on the Google Map in the Contact section below!";
    } else if (msg.includes('contact') || msg.includes('phone') || msg.includes('call')) {
      reply = "You can call us directly at +91 90722 11972 or email us at prabhatraders@outlook.com.";
    } else if (msg.includes('who are you') || msg.includes('your name') || msg.includes('prabha')) {
      reply = "I'm Prabha! The digital AI assistant specifically built to guide you around Prabha Traders and answer your questions.";
    }
  }
  
  appendJarvisMessage(reply, 'bot');
}
