document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.getElementById('main-nav');
    hamburger.addEventListener('click', function () {
        navUl.classList.toggle('active');
    });

    // Project filter feature
    const filterSelect = document.getElementById('filter-select');
    const projectItems = document.querySelectorAll('#projects article[data-type]');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            const value = filterSelect.value;
            projectItems.forEach(item => {
                if (value === 'all' || item.dataset.type === value) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Lightbox effect for project images
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100vw';
        lightbox.style.height = '100vh';
        lightbox.style.background = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '2000';
        lightbox.style.cursor = 'pointer';
        lightbox.style.visibility = 'hidden';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s';

        const img = document.createElement('img');
        img.style.maxWidth = '90vw';
        img.style.maxHeight = '80vh';
        img.style.borderRadius = '8px';
        img.alt = 'Project Image';

        lightbox.appendChild(img);

        // Close on click
        lightbox.addEventListener('click', function () {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.visibility = 'hidden';
                img.src = '';
            }, 300);
        });

        document.body.appendChild(lightbox);
        return { lightbox, img };
    }

    const { lightbox, img } = createLightbox();

    function showLightbox(src, alt) {
        img.src = src;
        img.alt = alt || 'Project Image';
        lightbox.style.visibility = 'visible';
        lightbox.style.opacity = '1';
    }

    // Attach click event to project images
    document.querySelectorAll('#projects article img').forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function (e) {
            e.stopPropagation();
            showLightbox(image.src, image.alt);
        });
    });

    // Contact form validation with real-time feedback
    const contactForm = document.querySelector('#contact-form form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        function showError(input, message) {
            let error = input.nextElementSibling;
            if (!error || !error.classList.contains('input-error')) {
                error = document.createElement('span');
                error.className = 'input-error';
                error.style.color = 'red';
                error.style.fontSize = '0.9rem';
                error.style.display = 'block';
                error.style.marginTop = '4px';
                input.parentNode.insertBefore(error, input.nextSibling);
            }
            error.textContent = message;
        }

        function clearError(input) {
            let error = input.nextElementSibling;
            if (error && error.classList.contains('input-error')) {
                error.textContent = '';
            }
        }

        function validateName() {
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required.');
                return false;
            }
            clearError(nameInput);
            return true;
        }

        function validateEmail() {
            const emailVal = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal) {
                showError(emailInput, 'Email is required.');
                return false;
            } else if (!emailPattern.test(emailVal)) {
                showError(emailInput, 'Please enter a valid email address.');
                return false;
            }
            clearError(emailInput);
            return true;
        }

        function validateMessage() {
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required.');
                return false;
            }
            clearError(messageInput);
            return true;
        }

        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        contactForm.addEventListener('submit', function (e) {
            const validName = validateName();
            const validEmail = validateEmail();
            const validMessage = validateMessage();
            if (!validName || !validEmail || !validMessage) {
                e.preventDefault();
            }
        });
    }
});