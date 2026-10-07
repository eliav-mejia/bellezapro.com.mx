/* Belleza Pro MX — forms.js (v1.0.0)
   Etapa 1 has no server: forms with data-mailto build an email in the visitor's mail app.
   Each field's <label> text becomes a line of the email. Etapa 2: post to a Cloudflare Worker instead
   (validation, rate limit, storage in Supabase) and keep this as the fallback. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    // "Postularme" links on a vacancy preselect it in the application form.
    document.querySelectorAll('[data-job]').forEach(function (link) {
      link.addEventListener('click', function () {
        var select = document.querySelector('select[name="vacante"]');
        if (select) select.value = link.getAttribute('data-job');
      });
    });

    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        var lines = [];
        form.querySelectorAll('input, select, textarea').forEach(function (field) {
          if (!field.name || field.type === 'checkbox' || !field.value) return;
          var label = form.querySelector('label[for="' + field.id + '"]');
          lines.push((label ? label.textContent.trim() : field.name) + ': ' + field.value.trim());
        });
        var subject = form.getAttribute('data-subject') || 'Contacto desde bellezapro.com.mx';
        var job = form.querySelector('[name="vacante"]');
        if (job && job.value) subject += ' · ' + job.value;
        window.location.href = 'mailto:' + form.getAttribute('data-mailto') +
          '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
        var done = form.querySelector('[data-sent]');
        if (done) done.hidden = false;
      });
    });
  });
})();
