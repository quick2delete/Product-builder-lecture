class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const number = this.getAttribute('number') || '';
        const color = this.getBallColor(number);
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    margin: 5px;
                }
                .ball {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: ${color};
                    color: white;
                    font-size: 20px;
                    font-weight: bold;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 -4px 6px rgba(0, 0, 0, 0.1);
                    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                }
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getBallColor(number) {
        const num = parseInt(number);
        if (num <= 10) return 'linear-gradient(135deg, #fbc02d, #f9a825)'; // Yellow
        if (num <= 20) return 'linear-gradient(135deg, #0288d1, #01579b)'; // Blue
        if (num <= 30) return 'linear-gradient(135deg, #e53935, #b71c1c)'; // Red
        if (num <= 40) return 'linear-gradient(135deg, #757575, #424242)'; // Grey
        return 'linear-gradient(135deg, #43a047, #1b5e20)'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();

    while(numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', number);
            lottoNumbersContainer.appendChild(ball);
        }, index * 100);
    });
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = 'Light Mode';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
