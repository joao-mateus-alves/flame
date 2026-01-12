document.addEventListener('DOMContentLoaded', () => {

	const phoneNumber = '5514999018749';

	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');

	if (hamburger && navMenu) {
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active');
			navMenu.classList.toggle('active');
			
			const isExpanded = hamburger.classList.contains('active');
			hamburger.setAttribute('aria-expanded', isExpanded);
		});

		const navLinks = navMenu.querySelectorAll('a');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('active');
				navMenu.classList.remove('active');
				hamburger.setAttribute('aria-expanded', 'false');
			});
		});
	}

	const serviceButtons = document.querySelectorAll('.service-card .service-btn');
	if (serviceButtons.length) {
		serviceButtons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const serviceName = btn.getAttribute('data-plan') || btn.closest('.service-card')?.querySelector('h3')?.textContent || 'um serviço';
				const message = `Olá! Gostaria de solicitar orçamento para: ${serviceName}`;
				const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
				window.open(whatsappUrl, '_blank');
			});
		});
	}

	const ctaButton = document.querySelector('#cta button');
	if (ctaButton) {
		ctaButton.addEventListener('click', (e) => {
			e.preventDefault();
			const message = 'Olá! Preciso de ajuda com um projeto.';
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
			window.open(whatsappUrl, '_blank');
		});
	}

	const contactLinks = document.querySelectorAll('a[href*="contato"], a[href*="#contato"]');
	if (contactLinks.length) {
		contactLinks.forEach((a) => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				const message = 'Olá! Gostaria de conversar sobre serviços.';
				const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
				window.open(whatsappUrl, '_blank');
			});
		});
	}

	// Smooth scroll for internal anchors (excluding contact which is hijacked above)
	const internalLinks = document.querySelectorAll('a[href^="#"]');
	internalLinks.forEach((link) => {
		const href = link.getAttribute('href');
		if (!href || href === '#' || href.toLowerCase().includes('contato')) return;
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

});

