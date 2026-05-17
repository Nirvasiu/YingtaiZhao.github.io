/* ============================================================
   VaultPop – scripts.js
   External JavaScript file (required by brief).
   
   Features:
   1. Back-to-top floating button (main JS feature for assessment)
   2. Add to Cart counter (user interaction)
   3. Contact form validation + feedback
   ============================================================ */


/* ============================================================
   FEATURE 1: BACK-TO-TOP FLOATING BUTTON
   A circular button appears in the bottom-right corner once
   the user has scrolled 400px down the page. Clicking it
   smoothly scrolls the page back to the top.

   This fulfils the brief requirement for "one useful JavaScript
   feature" involving "a user interaction that results in useful
   functionality relating to a user goal."

   User goal: Quickly return to the top of a long product
   homepage without manually scrolling all the way back up.
   ============================================================ */

const backToTopBtn = document.getElementById('backToTop');

// Show button only after user scrolls 400px
window.addEventListener('scroll', function () {
    if (!backToTopBtn) return;

    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top on click
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


/* ============================================================
   FEATURE 2: ADD TO CART – COUNTER UPDATE
   Clicking "Add to Cart" increments the cart icon counter
   in the navigation bar, giving users clear visual feedback.
   ============================================================ */

let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
const addToCartBtns = document.querySelectorAll('.cs-add-to-cart');

addToCartBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        cartCount++;
        if (cartCountEl) {
            cartCountEl.textContent = cartCount;

            // Brief pop animation for feedback
            cartCountEl.style.transform = 'scale(1.4)';
            setTimeout(function () {
                cartCountEl.style.transform = 'scale(1)';
            }, 200);
        }

        // Change button text briefly for feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Added!';
        btn.disabled = true;
        setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
});


/* ============================================================
   FEATURE 3: CONTACT FORM VALIDATION + FEEDBACK
   Simple validation that all fields are filled before
   showing a success message.
   ============================================================ */

const contactSubmit = document.getElementById('contactSubmit');
const formSuccess   = document.getElementById('formSuccess');

if (contactSubmit) {
    contactSubmit.addEventListener('click', function () {
        const name  = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const msg   = document.getElementById('contactMsg').value.trim();

        if (!name || !email || !msg) {
            if (formSuccess) {
                formSuccess.style.color = '#e63946';
                formSuccess.textContent = 'Please fill in all fields before sending.';
            }
            return;
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (formSuccess) {
                formSuccess.style.color = '#e63946';
                formSuccess.textContent = 'Please enter a valid email address.';
            }
            return;
        }

        if (formSuccess) {
            formSuccess.style.color = '#4caf50';
            formSuccess.textContent = "Thanks " + name + "! We'll get back to you soon.";
        }

        // Clear fields
        document.getElementById('contactName').value  = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMsg').value   = '';
    });
}
