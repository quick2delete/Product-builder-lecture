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

class PartnershipForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 40px;
                    text-align: left;
                }
                .form-container {
                    background: var(--container-bg, #ffffff);
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px var(--card-shadow, rgba(0, 0, 0, 0.1));
                    transition: all 0.3s ease;
                }
                h2 {
                    margin-top: 0;
                    font-family: 'Montserrat', sans-serif;
                    color: var(--text-color, #333);
                    font-size: 1.5rem;
                    border-bottom: 2px solid var(--btn-bg, #008CBA);
                    padding-bottom: 8px;
                    margin-bottom: 20px;
                }
                .form-group {
                    margin-bottom: 16px;
                }
                label {
                    display: block;
                    margin-bottom: 6px;
                    font-weight: bold;
                    color: var(--text-color, #333);
                    font-size: 0.9rem;
                }
                input, textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-sizing: border-box;
                    font-family: inherit;
                    font-size: 1rem;
                    background: var(--bg-color, #f9f9f9);
                    color: var(--text-color, #333);
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--btn-bg, #008CBA);
                    box-shadow: 0 0 0 3px rgba(0, 140, 186, 0.2);
                }
                textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    background-color: var(--btn-bg, #008CBA);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.1s;
                }
                .submit-btn:hover {
                    background-color: var(--btn-hover, #005f7a);
                }
                .submit-btn:active {
                    transform: scale(0.98);
                }
                .status-msg {
                    margin-top: 10px;
                    font-size: 0.9rem;
                    text-align: center;
                }
            </style>
            <div class="form-container">
                <h2>제휴 문의 (Partnership)</h2>
                <form id="contact-form" action="https://formspree.io/f/mkovvjzl" method="POST">
                    <div class="form-group">
                        <label for="company">회사명</label>
                        <input type="text" id="company" name="company" placeholder="회사명을 입력하세요" required>
                    </div>
                    <div class="form-group">
                        <label for="name">담당자명</label>
                        <input type="text" id="name" name="name" placeholder="성함을 입력하세요" required>
                    </div>
                    <div class="form-group">
                        <label for="email">이메일</label>
                        <input type="email" id="email" name="_replyto" placeholder="example@domain.com" required>
                    </div>
                    <div class="form-group">
                        <label for="message">문의 내용</label>
                        <textarea id="message" name="message" placeholder="제휴 관련 내용을 상세히 적어주세요" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">문의하기</button>
                </form>
                <div id="status" class="status-msg"></div>
            </div>
        `;

        const form = this.shadowRoot.getElementById('contact-form');
        const status = this.shadowRoot.getElementById('status');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            status.innerHTML = "보내는 중...";
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    status.style.color = "green";
                    status.innerHTML = "문의가 성공적으로 전달되었습니다!";
                    form.reset();
                } else {
                    const errorData = await response.json();
                    status.style.color = "red";
                    status.innerHTML = "오류가 발생했습니다: " + (errorData.errors ? errorData.errors.map(error => error.message).join(", ") : "다시 시도해주세요.");
                }
            } catch (error) {
                status.style.color = "red";
                status.innerHTML = "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
            }
        });
    }
}

customElements.define('partnership-form', PartnershipForm);

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
