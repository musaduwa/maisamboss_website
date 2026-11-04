import {
  createIcons,
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Facebook,
  Factory,
  FileCheck,
  Handshake,
  Instagram,
  Landmark,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Ship,
  Sprout,
  Star,
  Store,
  Truck,
  Twitter,
  Users,
  Warehouse,
  Wheat,
  X,
} from 'lucide';

/* ------------------------------------------------------------------
 * Icons — only the icons imported above are bundled.
 * ------------------------------------------------------------------ */
createIcons({
  icons: {
    ArrowRight, BadgeCheck, CircleCheck, ClipboardCheck, ClipboardList, Clock,
    Facebook, Factory, FileCheck, Handshake, Instagram, Landmark, Leaf, Linkedin,
    Mail, MapPin, Menu, MessageCircle, Phone, Quote, Receipt, Search, Send,
    ShieldCheck, Ship, Sprout, Star, Store, Truck, Twitter, Users, Warehouse, Wheat, X,
  },
  attrs: { 'aria-hidden': 'true', 'stroke-width': 1.75 },
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------
 * Navbar: shadow on scroll, mobile menu, active link
 * ------------------------------------------------------------------ */
const header = document.getElementById('site-header');
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

const onScroll = () => {
  header.classList.toggle('shadow-soft', window.scrollY > 8);
  header.classList.toggle('bg-white/90', window.scrollY > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.querySelector('[data-icon-open]').classList.toggle('hidden', open);
  menuButton.querySelector('[data-icon-close]').classList.toggle('hidden', !open);
  mobileMenu.classList.toggle('hidden', !open);
};

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

const navLinks = document.querySelectorAll('[data-nav-link]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.setAttribute('aria-current', String(link.getAttribute('href') === `#${entry.target.id}`));
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
['services', 'products', 'process', 'why-us', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ------------------------------------------------------------------
 * Scroll reveal (CSS only animates when motion is allowed)
 * ------------------------------------------------------------------ */
const revealEls = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ------------------------------------------------------------------
 * Mobile sticky CTA: hide while the contact section is on screen
 * ------------------------------------------------------------------ */
const mobileCta = document.getElementById('mobile-cta');
const contactSection = document.getElementById('contact');
if (mobileCta && contactSection) {
  new IntersectionObserver(([entry]) => {
    mobileCta.classList.toggle('translate-y-full', entry.isIntersecting);
    mobileCta.toggleAttribute('inert', entry.isIntersecting);
  }).observe(contactSection);
}

/* ------------------------------------------------------------------
 * "Enquire" links: pre-select the product in the quote form
 * ------------------------------------------------------------------ */
const form = document.getElementById('quote-form');
const productSelect = document.getElementById('product');

document.querySelectorAll('[data-enquire]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    productSelect.value = link.dataset.enquire;
    clearError(productSelect);
    contactSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#contact');
    // Focus after the scroll so screen-reader and keyboard users land in the form
    setTimeout(() => productSelect.focus({ preventScroll: true }), prefersReducedMotion ? 0 : 600);
  });
});

/* ------------------------------------------------------------------
 * Quote form: client-side validation + success state
 * ------------------------------------------------------------------ */
const validators = {
  fullName: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
  email: (v) =>
    !v.trim()
      ? 'Please enter your email address.'
      : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? ''
        : 'Please enter a valid email address, e.g. name@company.com.',
  phone: (v) =>
    !v.trim()
      ? 'Please enter your phone number.'
      : /^\+?[\d\s()-]{7,20}$/.test(v.trim())
        ? ''
        : 'Please enter a valid phone number, e.g. +234 803 000 0000.',
  product: (v) => (v ? '' : 'Please choose a product.'),
  quantity: (v) => (Number(v) > 0 ? '' : 'Please enter a quantity greater than 0.'),
  location: (v) => (v.trim().length >= 2 ? '' : 'Please enter a delivery location.'),
};

function showError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setAttribute('aria-invalid', 'true');
  if (error) {
    error.textContent = message;
    error.classList.add('is-visible');
  }
}

function clearError(input) {
  const error = document.getElementById(`${input.id}-error`);
  input.removeAttribute('aria-invalid');
  if (error) {
    error.textContent = '';
    error.classList.remove('is-visible');
  }
}

function validateField(input) {
  const validate = validators[input.name];
  if (!validate) return true;
  const message = validate(input.value);
  message ? showError(input, message) : clearError(input);
  return !message;
}

if (form) {
  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener('blur', () => input.value && validateField(input));
    input.addEventListener('input', () => input.getAttribute('aria-invalid') && validateField(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields, people don't
    if (form.elements.website.value) return;

    const invalid = Object.keys(validators)
      .map((name) => form.elements[name])
      .filter((input) => !validateField(input));

    const status = document.getElementById('form-status');
    if (invalid.length) {
      status.textContent = `Please correct ${invalid.length} highlighted field${invalid.length > 1 ? 's' : ''}.`;
      invalid[0].focus();
      return;
    }
    status.textContent = '';

    const data = Object.fromEntries(new FormData(form).entries());
    delete data.website;
    data.productLabel = productSelect.options[productSelect.selectedIndex].text;

    // Must run synchronously inside the submit event, or browsers block the new tab as a popup
    const whatsappUrl = buildQuoteWhatsAppUrl(data);
    const win = window.open(whatsappUrl, '_blank', 'noopener');
    document.getElementById('form-success-whatsapp').href = whatsappUrl;

    form.reset();
    form.hidden = true;
    const success = document.getElementById('form-success');
    success.hidden = false;
    success.focus();

    // Popup blocked (common in in-app browsers): open WhatsApp in the same tab instead
    if (!win) window.location.href = whatsappUrl;
  });

  document.getElementById('form-reset').addEventListener('click', () => {
    document.getElementById('form-success').hidden = true;
    form.hidden = false;
    form.elements.fullName.focus();
  });
}

/* ==================================================================
 * Quote requests are delivered as a pre-filled WhatsApp message.
 * The visitor's WhatsApp opens with the message ready; they tap Send.
 * Change the number here (international format, digits only).
 * ================================================================== */
const QUOTE_WHATSAPP_NUMBER = '2347019849028';

function buildQuoteWhatsAppUrl(data) {
  const fields = [
    `*Name:* ${data.fullName.trim()}`,
    data.company.trim() && `*Company:* ${data.company.trim()}`,
    `*Email:* ${data.email.trim()}`,
    `*Phone:* ${data.phone.trim()}`,
    `*Product:* ${data.productLabel}`,
    `*Quantity:* ${data.quantity} ${data.unit}`,
    `*Delivery location:* ${data.location.trim()}`,
    data.message.trim() && `*Message:* ${data.message.trim()}`,
  ].filter(Boolean);
  const lines = ['*New quote request: Mai Samboss website*', '', ...fields];
  return `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/* Footer year */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
