/* TextTidy web adapter — DOM I/O only, zero business rules.
   The transform logic lives in /domain (pure, unit-tested). This module reads the
   page config, dynamically imports that tool's transform, and wires the UI. */
import { splitLines } from '/domain/util.js';

const cfgEl = document.getElementById('tool-config');
if (cfgEl) init(JSON.parse(cfgEl.textContent));

async function init(cfg) {
  const mod = await import(`/domain/transforms/${cfg.slug}.js`);
  const fn = mod.transform;

  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const optWrap = document.getElementById('options');
  const inCount = document.getElementById('in-count');
  const outCount = document.getElementById('out-count');

  // Build option controls from the schema
  const controls = {};
  (cfg.options || []).forEach((opt) => {
    const el = document.createElement('div');
    el.className = 'opt';
    const id = `opt-${opt.key}`;
    if (opt.type === 'checkbox') {
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = id;
      cb.checked = !!opt.default;
      const lb = document.createElement('label');
      lb.htmlFor = id;
      lb.appendChild(cb);
      lb.appendChild(document.createTextNode(opt.label));
      el.appendChild(lb);
      controls[opt.key] = cb;
    } else if (opt.type === 'select') {
      const lb = document.createElement('label');
      lb.htmlFor = id;
      lb.appendChild(document.createTextNode(`${opt.label} `));
      const sel = document.createElement('select');
      sel.id = id;
      opt.choices.forEach((c) => {
        const o = document.createElement('option');
        o.value = c.value;
        o.textContent = c.label;
        if (c.value === opt.default) o.selected = true;
        sel.appendChild(o);
      });
      lb.appendChild(sel);
      el.appendChild(lb);
      controls[opt.key] = sel;
    } else {
      const lb = document.createElement('label');
      lb.htmlFor = id;
      lb.appendChild(document.createTextNode(`${opt.label} `));
      const tx = document.createElement('input');
      tx.type = 'text';
      tx.id = id;
      tx.value = opt.default || '';
      tx.size = 12;
      lb.appendChild(tx);
      el.appendChild(lb);
      controls[opt.key] = tx;
    }
    optWrap.appendChild(el);
  });

  const readOpts = () => {
    const o = {};
    Object.keys(controls).forEach((k) => {
      const c = controls[k];
      o[k] = c.type === 'checkbox' ? c.checked : c.value;
    });
    return o;
  };

  const stats = (t) => {
    if (!t) return '0 characters';
    const words = (t.match(/\S+/g) || []).length;
    const lines = splitLines(t).length;
    return (
      t.length.toLocaleString() +
      ' chars · ' +
      words.toLocaleString() +
      ' words · ' +
      lines.toLocaleString() +
      ' lines'
    );
  };

  const run = () => {
    inCount.textContent = stats(input.value);
    try {
      const res = fn(input.value, readOpts());
      output.value = res;
      outCount.textContent = stats(res);
      outCount.classList.remove('error');
    } catch (e) {
      outCount.textContent = `⚠ ${e.message || 'Something went wrong'}`;
      outCount.classList.add('error');
    }
  };

  input.addEventListener('input', run);
  optWrap.addEventListener('input', run);
  optWrap.addEventListener('change', run);

  const toast = document.getElementById('toast');
  document.getElementById('copy').addEventListener('click', () => {
    if (!output.value) return;
    navigator.clipboard
      .writeText(output.value)
      .then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1400);
      })
      .catch(() => {
        output.select();
        document.execCommand('copy');
      });
  });
  document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    run();
    input.focus();
  });

  run();
}
