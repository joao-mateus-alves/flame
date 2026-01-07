document.addEventListener('DOMContentLoaded', () => {

	const phoneNumber = '5514999018749';

	// Botões dos serviços - redirecionamento direto ao WhatsApp
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

	// CTA "Fale Conosco" abre WhatsApp
	const ctaButton = document.querySelector('#cta button');
	if (ctaButton) {
		ctaButton.addEventListener('click', (e) => {
			e.preventDefault();
			const message = 'Olá! Preciso de ajuda com um projeto.';
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
			window.open(whatsappUrl, '_blank');
		});
	}

	// Links de "Contato" abrem WhatsApp
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

});

