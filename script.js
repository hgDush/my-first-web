/* ══════════════════════════════════════════
   Web Tech Practical – SET B
   script.js — All 30 Task Implementations
══════════════════════════════════════════ */

/* ── NAV ── */
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(id + '-page').classList.add('active');
  btn.classList.add('active');
}

/* ══════════════════════════════════════════
   PROFILE — Save / Load / Edit (localStorage)
══════════════════════════════════════════ */
function loadProfile() {
  const data = JSON.parse(localStorage.getItem('wb_profile') || '{}');
  if (data.name) applyProfileToView(data);
}

function applyProfileToView(data) {
  const initials = data.name
    ? data.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';
  document.getElementById('view-avatar').textContent  = initials;
  document.getElementById('view-name').textContent    = data.name    || 'Student Name';
  document.getElementById('view-roll').textContent    = data.roll    || '—';
  document.getElementById('view-course').textContent  = data.course  || '—';
  document.getElementById('view-college').textContent = data.college || '—';
  document.getElementById('view-year').textContent    = data.year    || '2025 – 2026';
  document.getElementById('view-bio').textContent     = data.bio     || 'BCA / BSc IT Student · Web Technologies Lab';
}

function editProfile() {
  const data = JSON.parse(localStorage.getItem('wb_profile') || '{}');
  document.getElementById('e-name').value    = data.name    || '';
  document.getElementById('e-roll').value    = data.roll    || '';
  document.getElementById('e-course').value  = data.course  || '';
  document.getElementById('e-college').value = data.college || '';
  document.getElementById('e-year').value    = data.year    || '';
  document.getElementById('e-bio').value     = data.bio     || '';
  document.getElementById('profile-view').style.display = 'none';
  document.getElementById('profile-edit').style.display = 'block';
  document.getElementById('profile-msg').textContent = '';
}

function saveProfile() {
  const name    = document.getElementById('e-name').value.trim();
  const roll    = document.getElementById('e-roll').value.trim();
  const course  = document.getElementById('e-course').value.trim();
  const college = document.getElementById('e-college').value.trim();
  const msg     = document.getElementById('profile-msg');

  if (!name || !roll || !course || !college) {
    msg.style.color = '#e74c3c';
    msg.textContent = '⚠ Name, Roll Number, Course and College are required.';
    return;
  }

  const data = {
    name, roll, course, college,
    year: document.getElementById('e-year').value.trim() || '2025 – 2026',
    bio:  document.getElementById('e-bio').value.trim()
  };
  localStorage.setItem('wb_profile', JSON.stringify(data));
  applyProfileToView(data);

  msg.style.color = '#00e5ff';
  msg.textContent = '✅ Profile saved!';
  setTimeout(() => {
    document.getElementById('profile-edit').style.display = 'none';
    document.getElementById('profile-view').style.display = 'block';
  }, 800);
}

function cancelEdit() {
  document.getElementById('profile-edit').style.display = 'none';
  document.getElementById('profile-view').style.display = 'block';
}

/* ── Build task buttons + load profile on page ready ── */
const taskLabels = [
  "Reverse words in a sentence",
  "Extract first and last character",
  "Find longest word from sentence",
  "Convert string to Title Case",
  "Replace a word in a string",
  "Count vowels in a string",
  "Create array from popup input",
  "Display third element of array",
  "Find last element (popup)",
  "Find index of element in array",
  "map() — square each element",
  "Sort array ascending",
  "splice() to replace elements",
  "splice() delete + insert",
  "Arithmetic operations (choice)",
  "Calculate factorial",
  "Check even or odd",
  "Find max of 3 numbers",
  "Sum of array values",
  "Popup: 10-digit input only",
  "Popup: numeric vs string ops",
  "Validate: password min length",
  "Validate: required field",
  "Signup form submit/reset",
  "Display form in table",
  "Clear output on reset",
  "Person object: update age",
  "Display updated object",
  "Countdown timer (setInterval)",
  "Hover: change button style"
];

window.addEventListener('DOMContentLoaded', () => {
  loadProfile();

  const grid = document.getElementById('task-grid');
  taskLabels.forEach((lbl, i) => {
    const n = i + 1;
    const btn = document.createElement('button');
    btn.className = 'task-btn';
    btn.innerHTML = `<span class="num">${String(n).padStart(2, '0')}</span>${lbl}`;
    btn.onclick = () => {
      document.getElementById('task' + n).scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    grid.appendChild(btn);
  });
});

/* ── Helper: write to output div ── */
function out(id, msg) {
  document.getElementById(id).textContent = msg;
}

/* ══════════════════════════════════════════
   TASK 1 – Reverse words in a sentence
══════════════════════════════════════════ */
function t1() {
  const v = document.getElementById('t1in').value.trim();
  if (!v) return out('t1out', '⚠ Please enter a sentence.');
  out('t1out', v.split(' ').reverse().join(' '));
}

/* ══════════════════════════════════════════
   TASK 2 – Extract first and last character
══════════════════════════════════════════ */
function t2() {
  const v = document.getElementById('t2in').value;
  if (!v) return out('t2out', '⚠ Please enter a string.');
  out('t2out', `First: "${v[0]}"  |  Last: "${v[v.length - 1]}"`);
}

/* ══════════════════════════════════════════
   TASK 3 – Find longest word from sentence
══════════════════════════════════════════ */
function t3() {
  const v = document.getElementById('t3in').value.trim();
  if (!v) return out('t3out', '⚠ Please enter a sentence.');
  const longest = v.split(' ').reduce((a, b) => b.length > a.length ? b : a, '');
  out('t3out', `Longest word: "${longest}" (${longest.length} chars)`);
}

/* ══════════════════════════════════════════
   TASK 4 – Convert string to Title Case
══════════════════════════════════════════ */
function t4() {
  const v = document.getElementById('t4in').value;
  if (!v) return out('t4out', '⚠ Please enter a string.');
  out('t4out', v.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()));
}

/* ══════════════════════════════════════════
   TASK 5 – Replace a word in a string
══════════════════════════════════════════ */
function t5() {
  const s = document.getElementById('t5in').value;
  const o = document.getElementById('t5old').value;
  const n = document.getElementById('t5new').value;
  if (!s || !o) return out('t5out', '⚠ Fill all fields.');
  out('t5out', s.split(o).join(n));
}

/* ══════════════════════════════════════════
   TASK 6 – Count vowels in a string
══════════════════════════════════════════ */
function t6() {
  const v = document.getElementById('t6in').value;
  if (!v) return out('t6out', '⚠ Please enter a string.');
  const count = (v.match(/[aeiouAEIOU]/g) || []).length;
  out('t6out', `Vowel count: ${count}`);
}

/* ══════════════════════════════════════════
   TASK 7 – Create array from popup input
══════════════════════════════════════════ */
function t7() {
  const raw = prompt('Enter items separated by commas:');
  if (raw === null) return out('t7out', 'Cancelled.');
  const arr = raw.split(',').map(x => x.trim()).filter(Boolean);
  out('t7out', `Array: [${arr.join(', ')}]  |  Length: ${arr.length}`);
}

/* ══════════════════════════════════════════
   TASK 8 – Display third element from array
══════════════════════════════════════════ */
function t8() {
  const arr = document.getElementById('t8in').value.split(',').map(x => x.trim());
  if (arr.length < 3) return out('t8out', '⚠ Need at least 3 elements.');
  out('t8out', `Third element (index 2): "${arr[2]}"`);
}

/* ══════════════════════════════════════════
   TASK 9 – Find last element from array (popup)
══════════════════════════════════════════ */
function t9() {
  const raw = prompt('Enter array items (comma-separated):');
  if (raw === null) return out('t9out', 'Cancelled.');
  const arr = raw.split(',').map(x => x.trim());
  out('t9out', `Last element: "${arr[arr.length - 1]}"`);
}

/* ══════════════════════════════════════════
   TASK 10 – Find index of a given element
══════════════════════════════════════════ */
function t10() {
  const arr = document.getElementById('t10arr').value.split(',').map(x => x.trim());
  const el  = document.getElementById('t10el').value.trim();
  const idx = arr.indexOf(el);
  out('t10out', idx === -1
    ? `"${el}" not found in array.`
    : `Index of "${el}": ${idx}`);
}

/* ══════════════════════════════════════════
   TASK 11 – Apply map() to square each element
══════════════════════════════════════════ */
function t11() {
  const nums = document.getElementById('t11in').value.split(',').map(Number);
  if (nums.some(isNaN)) return out('t11out', '⚠ Enter only numbers.');
  out('t11out', `Squared: [${nums.map(n => n * n).join(', ')}]`);
}

/* ══════════════════════════════════════════
   TASK 12 – Sort array in ascending order
══════════════════════════════════════════ */
function t12() {
  const nums = document.getElementById('t12in').value.split(',').map(Number);
  if (nums.some(isNaN)) return out('t12out', '⚠ Enter only numbers.');
  out('t12out', `Sorted: [${[...nums].sort((a, b) => a - b).join(', ')}]`);
}

/* ══════════════════════════════════════════
   TASK 13 – Use splice() to replace elements
══════════════════════════════════════════ */
function t13() {
  const arr  = document.getElementById('t13arr').value.split(',').map(x => x.trim());
  const idx  = parseInt(document.getElementById('t13idx').value);
  const cnt  = parseInt(document.getElementById('t13cnt').value);
  const newI = document.getElementById('t13new').value.split(',').map(x => x.trim()).filter(Boolean);
  const copy = [...arr];
  const removed = copy.splice(idx, cnt, ...newI);
  out('t13out', `After splice: [${copy.join(', ')}]  |  Removed: [${removed.join(', ')}]`);
}

/* ══════════════════════════════════════════
   TASK 14 – Use splice() to delete + insert simultaneously
══════════════════════════════════════════ */
function t14() {
  const arr  = document.getElementById('t14arr').value.split(',').map(x => x.trim());
  const idx  = parseInt(document.getElementById('t14idx').value);
  const del  = parseInt(document.getElementById('t14del').value);
  const ins  = document.getElementById('t14ins').value.split(',').map(x => x.trim()).filter(Boolean);
  const copy = [...arr];
  const removed = copy.splice(idx, del, ...ins);
  out('t14out', `Deleted: [${removed.join(', ')}]  |  Inserted: [${ins.join(', ')}]  |  Result: [${copy.join(', ')}]`);
}

/* ══════════════════════════════════════════
   TASK 15 – Function: arithmetic operations based on user choice
══════════════════════════════════════════ */
function t15() {
  const a  = parseFloat(document.getElementById('t15a').value);
  const b  = parseFloat(document.getElementById('t15b').value);
  const op = document.getElementById('t15op').value;
  if (isNaN(a) || isNaN(b)) return out('t15out', '⚠ Enter valid numbers.');
  const results = { '+': a + b, '-': a - b, '*': a * b, '/': b === 0 ? '÷0 undefined' : a / b, '%': a % b };
  out('t15out', `${a} ${op} ${b} = ${results[op]}`);
}

/* ══════════════════════════════════════════
   TASK 16 – Function: calculate factorial
══════════════════════════════════════════ */
function t16() {
  const n = parseInt(document.getElementById('t16in').value);
  if (isNaN(n) || n < 0) return out('t16out', '⚠ Enter a non-negative integer.');
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  out('t16out', `${n}! = ${f}`);
}

/* ══════════════════════════════════════════
   TASK 17 – Function: check even or odd
══════════════════════════════════════════ */
function t17() {
  const n = parseInt(document.getElementById('t17in').value);
  if (isNaN(n)) return out('t17out', '⚠ Enter a valid number.');
  out('t17out', `${n} is ${n % 2 === 0 ? 'Even' : 'Odd'}`);
}

/* ══════════════════════════════════════════
   TASK 18 – Function: find max of 3 numbers
══════════════════════════════════════════ */
function t18() {
  const a = parseFloat(document.getElementById('t18a').value);
  const b = parseFloat(document.getElementById('t18b').value);
  const c = parseFloat(document.getElementById('t18c').value);
  if ([a, b, c].some(isNaN)) return out('t18out', '⚠ Enter all 3 numbers.');
  out('t18out', `Maximum of (${a}, ${b}, ${c}) = ${Math.max(a, b, c)}`);
}

/* ══════════════════════════════════════════
   TASK 19 – Function: sum of array values
══════════════════════════════════════════ */
function t19() {
  const nums = document.getElementById('t19in').value.split(',').map(Number);
  if (nums.some(isNaN)) return out('t19out', '⚠ Enter only numbers.');
  out('t19out', `Sum = ${nums.reduce((s, n) => s + n, 0)}`);
}

/* ══════════════════════════════════════════
   TASK 20 – Popup: allow only 10-digit input
══════════════════════════════════════════ */
function t20() {
  const val = prompt('Enter a 10-digit number:');
  if (val === null) return out('t20out', 'Cancelled.');
  if (/^\d{10}$/.test(val.trim()))
    out('t20out', `✅ Valid 10-digit number: ${val}`);
  else
    out('t20out', `❌ Invalid! "${val}" is not exactly 10 digits.`);
}

/* ══════════════════════════════════════════
   TASK 21 – Popup: detect numeric vs string and apply allowed operations
══════════════════════════════════════════ */
function t21() {
  const v1 = prompt('Enter value 1:');
  const v2 = prompt('Enter value 2:');
  if (v1 === null || v2 === null) return out('t21out', 'Cancelled.');
  const n1 = Number(v1), n2 = Number(v2);
  if (!isNaN(n1) && !isNaN(n2) && v1.trim() !== '' && v2.trim() !== '') {
    out('t21out',
      `Both numeric → Allowed: +, -, *, /\n` +
      `Sum=${n1+n2} | Diff=${n1-n2} | Product=${n1*n2} | Quotient=${n2 !== 0 ? n1/n2 : 'undefined'}`
    );
  } else {
    out('t21out', `One or both are strings → Allowed: concatenation\nResult: "${v1}${v2}"`);
  }
}

/* ══════════════════════════════════════════
   TASK 22 – Validate: password minimum length rule
══════════════════════════════════════════ */
function t22() {
  const pw = document.getElementById('t22in').value;
  if (pw.length >= 8)
    out('t22out', `✅ Password is valid (length: ${pw.length})`);
  else
    out('t22out', `❌ Too short! Must be at least 8 chars. Current: ${pw.length}`);
}

/* ══════════════════════════════════════════
   TASK 23 – Validate: required field not empty
══════════════════════════════════════════ */
function t23() {
  const v = document.getElementById('t23in').value.trim();
  out('t23out', v
    ? `✅ Field is filled: "${v}"`
    : '❌ Field is required — cannot be empty!');
}

/* ══════════════════════════════════════════
   TASKS 24, 25, 26 – Signup form with submit/reset
══════════════════════════════════════════ */
function formSubmit() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const pass  = document.getElementById('f-pass').value;
  const age   = document.getElementById('f-age').value;
  const err   = document.getElementById('form-err');

  if (!name || !email || !pass) { err.textContent = '⚠ Name, Email and Password are required.'; return; }
  if (pass.length < 8)          { err.textContent = '⚠ Password must be at least 8 characters.'; return; }
  if (!/\S+@\S+\.\S+/.test(email)) { err.textContent = '⚠ Enter a valid email.'; return; }

  err.textContent = '';
  document.getElementById('t25out').innerHTML = `
    <table>
      <tr><th>Field</th><th>Value</th></tr>
      <tr><td>Full Name</td><td>${name}</td></tr>
      <tr><td>Email</td><td>${email}</td></tr>
      <tr><td>Password</td><td>${'*'.repeat(pass.length)}</td></tr>
      <tr><td>Age</td><td>${age || 'Not provided'}</td></tr>
    </table>`;
  document.getElementById('task25').scrollIntoView({ behavior: 'smooth' });
}

function formReset() {
  ['f-name', 'f-email', 'f-pass', 'f-age'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('form-err').textContent = '';
  document.getElementById('t25out').innerHTML = '<em style="color:var(--muted)">Form cleared — table removed.</em>';
}

/* ══════════════════════════════════════════
   TASKS 27 & 28 – Person object: update age + display
══════════════════════════════════════════ */
let person = { name: "Alice", age: 25, city: "Mumbai" };

function t27() {
  const newAge = parseInt(document.getElementById('t27age').value);
  if (isNaN(newAge) || newAge < 0) return out('t27out', '⚠ Enter a valid age.');
  person.age = newAge;
  out('t27out', `Age updated to ${newAge}`);
  document.getElementById('t28out').innerHTML = `
    <table>
      <tr><th>Property</th><th>Value</th></tr>
      <tr><td>name</td><td>${person.name}</td></tr>
      <tr><td>age</td><td>${person.age}</td></tr>
      <tr><td>city</td><td>${person.city}</td></tr>
    </table>`;
}

/* ══════════════════════════════════════════
   TASK 29 – Countdown timer using setInterval
            with Start / Pause / Reset
══════════════════════════════════════════ */
let timerInterval = null;
let timerVal = 0;

function timerStart() {
  if (timerInterval) return;
  const s = parseInt(document.getElementById('t29sec').value);
  if (!isNaN(s) && s > 0 && timerVal === 0) timerVal = s;
  if (timerVal <= 0) { out('t29out', '⚠ Enter seconds first.'); return; }
  out('t29out', '▶ Timer running...');
  timerInterval = setInterval(() => {
    timerVal--;
    document.getElementById('countdown-display').textContent = String(timerVal).padStart(2, '0');
    if (timerVal <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      out('t29out', '✅ Countdown finished!');
    }
  }, 1000);
}

function timerPause() {
  clearInterval(timerInterval);
  timerInterval = null;
  out('t29out', '⏸ Paused.');
}

function timerReset() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerVal = 0;
  document.getElementById('countdown-display').textContent = '00';
  document.getElementById('t29sec').value = '';
  out('t29out', '↺ Timer reset.');
}

/* ══════════════════════════════════════════
   TASK 30 – Hover event: change button style on mouse over
══════════════════════════════════════════ */
function hoverIn() { out('t30out', '🖱 Mouse OVER — style changed!'); }
function hoverOut() { out('t30out', 'Mouse left — style restored.'); }
