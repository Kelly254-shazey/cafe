// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image carousel for gallery
let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel img');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

// Initialize carousel if on gallery page
if (document.querySelector('.carousel')) {
    showImage(currentImageIndex);
    document.getElementById('nextBtn').addEventListener('click', nextImage);
    document.getElementById('prevBtn').addEventListener('click', prevImage);

    // Auto-play carousel
    setInterval(nextImage, 5000);
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage += 'Name is required.\n';
        }
        
        if (!email) {
            isValid = false;
            errorMessage += 'Email is required.\n';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (!message) {
            isValid = false;
            errorMessage += 'Message is required.\n';
        }
        
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Hero slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function currentSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
}

// Initialize slider if on homepage
if (slides.length > 0) {
    showSlide(slideIndex);
    setInterval(nextSlide, 5000); // Auto slide every 5 seconds
}

// Scroll to menu function
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Booking form handling (works on `index.html` booking section and standalone `booking.html`)
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // pricing map per product
    const priceMap = {
        coffee: 3.5,
        pastry: 4.0,
        brunch: 15.0,
        salad: 8.5,
        dinner: 18.0,
        latte: 4.5,
        cappuccino: 4.0,
        iced_latte: 4.75,
        smoothie: 5.5,
        sandwich: 9.5,
        cake: 5.0
    };

    // product image map for preview (external Unsplash images)
    const productImageMap = {
        coffee: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&h=600&fit=crop',
        pastry: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=800&h=600&fit=crop',
        brunch: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        salad: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        dinner: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
        latte: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&h=600&fit=crop',
        cappuccino: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
        iced_latte: 'https://images.unsplash.com/photo-1508779018996-6f6230e1a1a6?w=800&h=600&fit=crop',
        smoothie: 'https://images.unsplash.com/photo-1547516508-4f9f0f0efc1b?w=800&h=600&fit=crop',
        sandwich: 'https://images.unsplash.com/photo-1546549032-7f7f0d7e2f3b?w=800&h=600&fit=crop',
        cake: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
    };

    function timeToMinutes(t) {
        const [hh, mm] = t.split(':').map(Number);
        return hh * 60 + mm;
    }

    const openingHours = {
        0: ['08:00','16:00'], // Sunday
        1: ['07:00','18:00'], // Monday
        2: ['07:00','18:00'], // Tuesday
        3: ['07:00','18:00'], // Wednesday
        4: ['07:00','20:00'], // Thursday
        5: ['07:00','21:00'], // Friday
        6: ['08:00','21:00']  // Saturday
    };

    const productEl = document.getElementById('product');
    const qtyEl = document.getElementById('quantity');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceInput = document.getElementById('price');

    function updatePriceDisplay() {
        if (!productEl || !qtyEl || !priceDisplay || !priceInput) return;
        const product = productEl.value;
        const qty = parseInt(qtyEl.value, 10) || 1;
        const unit = priceMap[product] || 0;
        const total = (unit * qty);
        priceDisplay.textContent = `$${total.toFixed(2)}`;
        priceInput.value = total.toFixed(2);
        // update preview image if present
        const preview = document.getElementById('productPreview');
        if (preview) {
            const img = productImageMap[product] || productImageMap['coffee'];
            preview.src = img;
            preview.alt = product.replace('_', ' ');
        }
    }

    if (productEl) productEl.addEventListener('change', updatePriceDisplay);
    if (qtyEl) qtyEl.addEventListener('input', updatePriceDisplay);
    // initial price
    updatePriceDisplay();

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = parseInt(document.getElementById('guests').value, 10) || 1;
        const notes = document.getElementById('notes') ? document.getElementById('notes').value.trim() : '';
        const product = productEl ? productEl.value : '';
        const quantity = qtyEl ? parseInt(qtyEl.value, 10) || 1 : 1;
        const seating = document.getElementById('seating') ? document.getElementById('seating').value : '';
        const price = priceInput ? parseFloat(priceInput.value) : 0;
        const msgEl = document.getElementById('bookingMessage');

        if (!name || !email || !date || !time) {
            if (msgEl) msgEl.textContent = 'Please complete all required fields.';
            return;
        }

        const chosenDate = new Date(date + 'T' + time);
        if (isNaN(chosenDate)) {
            if (msgEl) msgEl.textContent = 'Invalid date or time.';
            return;
        }

        const weekday = chosenDate.getDay();
        const open = openingHours[weekday];
        const chosenMinutes = timeToMinutes(time);
        const openMinutes = timeToMinutes(open[0]);
        const closeMinutes = timeToMinutes(open[1]);

        if (chosenMinutes < openMinutes || chosenMinutes >= closeMinutes) {
            if (msgEl) msgEl.textContent = `Selected time falls outside our opening hours (${open[0]} - ${open[1]}).`;
            return;
        }

        // generate booking number
        const bookingNumber = 'BK' + Math.random().toString(36).slice(2,8).toUpperCase() + Date.now().toString().slice(-3);

        const reservation = {
            id: bookingNumber,
            bookingNumber,
            name, email, phone, date, time, guests, notes,
            product, quantity, seating,
            price: price,
            createdAt: new Date().toISOString()
        };

        let reservations = [];
        try { reservations = JSON.parse(localStorage.getItem('reservations') || '[]'); } catch(e) { reservations = []; }
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        if (msgEl) {
            msgEl.textContent = `Booking confirmed — ${bookingNumber}. ${date} at ${time} — ${quantity} x ${product} — $${price.toFixed(2)}.`;
        }

        bookingForm.reset();
        updatePriceDisplay();
        renderReservations();
    });

    // Render saved reservations on the page (if container exists)
    function renderReservations() {
        const container = document.getElementById('reservationsList');
        if (!container) return;
        let reservations = [];
        try { reservations = JSON.parse(localStorage.getItem('reservations') || '[]'); } catch(e) { reservations = []; }
        container.innerHTML = '';
        if (reservations.length === 0) {
            container.innerHTML = '<div class="reservation-item">No reservations yet.</div>';
            return;
        }
        // Show most recent first
        reservations.slice().reverse().forEach(r => {
            const el = document.createElement('div');
            el.className = 'reservation-item';
            el.innerHTML = `<strong>${r.name}</strong> — <em>${r.bookingNumber}</em><br>${r.date} @ ${r.time} — ${r.quantity} x ${r.product} — $${parseFloat(r.price).toFixed(2)}<br><small>${r.email}${r.phone? ' • ' + r.phone : ''} • ${r.seating}</small>`;
            container.appendChild(el);
        });
    }

    // Initial render
    renderReservations();
}
