 const passwordEl = document.getElementById('password');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const lengthBtns = document.querySelectorAll('.length-btn');

let selectedLength = 8;

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Length button selection
lengthBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    lengthBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedLength = parseInt(btn.dataset.length);
  });
});

function generatePassword() {
  let chars = '';
  let password = '';

  if (uppercaseEl.checked) chars += charSets.uppercase;
  if (lowercaseEl.checked) chars += charSets.lowercase;
  if (numbersEl.checked) chars += charSets.numbers;
  if (symbolsEl.checked) chars += charSets.symbols;

  if (chars === '') {
    passwordEl.textContent = 'Select at least one option';
    updateStrength(0);
    return;
  }

  for (let i = 0; i < selectedLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordEl.textContent = password;
  updateStrength(calculateStrength(password));
}

function calculateStrength(password) {
  let strength = 0;
  
  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  return Math.min(strength, 7);
}

function updateStrength(strength) {
  const percentage = (strength / 7) * 100;
  let color, text;

  if (strength <= 2) {
    color = '#e74c3c';
    text = 'Weak';
  } else if (strength <= 4) {
    color = '#f39c12';
    text = 'Medium';
  } else if (strength <= 5) {
    color = '#27ae60';
    text = 'Strong';
  } else {
    color = '#0c8741';
    text = 'Very Strong';
  }

  strengthFill.style.width = percentage + '%';
  strengthFill.style.background = color;
  strengthText.textContent = text;
  strengthText.style.color = color;
}

async function copyPassword() {
  const password = passwordEl.textContent;
  
  if (password === 'Click Generate' || password === 'Select at least one option') {
    return;
  }

  try {
    await navigator.clipboard.writeText(password);
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Generate initial password
generatePassword();
