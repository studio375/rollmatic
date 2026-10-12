const KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];

export function captureTracking() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    KEYS.forEach(k => { if (params.get(k)) found['attr_'+k] = params.get(k); });

    console.log(found);
    // first-touch: salva solo se ci sono UTM nuovi
    if (Object.keys(found).length) {
      sessionStorage.setItem('tracking', JSON.stringify(found));
    }
    // landing page e referrer solo alla prima visita della sessione
    if (!sessionStorage.getItem('landing_page')) {
      sessionStorage.setItem('landing_page', window.location.href);
      sessionStorage.setItem('referrer', document.referrer || '');
    }
  } catch {}
}

export function getTracking() {
  try {
    return {
      ...JSON.parse(sessionStorage.getItem('tracking') || '{}'),
      attr_landing_page: sessionStorage.getItem('landing_page') || '',
      attr_referrer: sessionStorage.getItem('referrer') || '',
      attr_form_page: window.location.href, // pagina da cui compila il modulo
    };
  } catch {
    return { form_page: window.location.href };
  }
}