document.addEventListener('DOMContentLoaded', () => {

	const openWhatsApp = (message) => {
		const phoneNumber = '14999018749';
		const defaultMsg = message || 'Olá! Gostaria de falar com a Flame Studio.';
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;
		window.open(whatsappUrl, '_blank');
	};

	const serviceButtons = document.querySelectorAll('.service-card .service-btn');
	if (serviceButtons.length) {
		serviceButtons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const card = btn.closest('.service-card');
				const planName = btn.getAttribute('data-plan') || (card?.querySelector('h3')?.textContent || '').trim();
				const description = (card?.querySelector('p')?.textContent || '').trim();
				const features = Array.from(card?.querySelectorAll('.service-features li') || []).map((li) => li.textContent.trim());

				const planData = { name: planName, description, features };
				try {
					sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
				} catch (err) {
					console.warn('Não foi possível salvar o plano no sessionStorage:', err);
				}

				// Navega para página de confirmação
				window.location.href = 'plan.html';
			});
		});
	}

	// Index: CTA "Fale Conosco" abre WhatsApp
	const ctaButton = document.querySelector('#cta button');
	if (ctaButton) {
		ctaButton.addEventListener('click', (e) => {
			e.preventDefault();
			openWhatsApp('Olá! Preciso de ajuda com um projeto.');
		});
	}

	// Nav: links de "Contato" abrem WhatsApp
	const contactLinks = document.querySelectorAll('a[href*="contato"], a[href*="#contato"]');
	if (contactLinks.length) {
		contactLinks.forEach((a) => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				openWhatsApp('Olá! Gostaria de conversar sobre serviços.');
			});
		});
	}

	// Plan page: personalize and send to WhatsApp
	const planContainer = document.getElementById('plan-container');
	if (planContainer) {
		let planData = {};
		try {
			const raw = sessionStorage.getItem('selectedPlan');
			if (raw) planData = JSON.parse(raw);
		} catch (err) {
			console.warn('Falha ao ler selectedPlan do sessionStorage:', err);
		}

		if (!planData?.name) {
			const url = new URL(window.location.href);
			const planName = url.searchParams.get('plan');
			if (planName) planData.name = planName;
		}

		const planTitleEl = document.getElementById('plan-title');
		const planDescEl = document.getElementById('plan-description');
		const planFeatEl = document.getElementById('plan-features');

		if (planTitleEl) planTitleEl.textContent = planData.name || 'Plano selecionado';
		if (planDescEl && planData.description) planDescEl.textContent = planData.description;
		if (planFeatEl && Array.isArray(planData.features) && planData.features.length) {
			planFeatEl.innerHTML = '';
			planData.features.forEach((f) => {
				const li = document.createElement('li');
				li.textContent = f;
				planFeatEl.appendChild(li);
			});
		}

		const sendBtn = document.getElementById('send-whatsapp');
		if (sendBtn) {
			sendBtn.addEventListener('click', (e) => {
				e.preventDefault();
				const name = document.getElementById('client-name')?.value?.trim() || '';
				const details = document.getElementById('client-details')?.value?.trim() || '';

				const phoneNumber = '14999018749'; // Número fornecido

				const lines = [
					'Olá! Quero solicitar um orçamento.',
					planData.name ? `Plano desejado: ${planData.name}` : null,
					name ? `Nome: ${name}` : null,
					planData.description ? `Descrição: ${planData.description}` : null,
					Array.isArray(planData.features) && planData.features.length ? `Recursos: ${planData.features.join(', ')}` : null,
					details ? `Observações: ${details}` : null,
				].filter(Boolean);

				const message = lines.join('\n');
				const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
				window.open(whatsappUrl, '_blank');
			});
		}
	}
});

