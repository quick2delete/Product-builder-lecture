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
                        <textarea id="message" name="message" placeholder="제휴 관련 내용을  상세히 적어주세요" required></textarea>
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

class ProfessionalComments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.comments = JSON.parse(localStorage.getItem('lotto-comments')) || [
            { id: 1, author: '김철수', text: '번호가 정말 잘 나오네요! 오늘 1등 예감입니다.', date: '2026-02-19 14:20', likes: 12 },
            { id: 2, author: '이영희', text: '다크 모드 디자인이 정말 깔끔하고 보기 편해요.', date: '2026-02-19 15:05', likes: 5 }
        ];
    }

    connectedCallback() {
        this.render();
    }

    saveComments() {
        localStorage.setItem('lotto-comments', JSON.stringify(this.comments));
    }

    addComment(author, text) {
        const newComment = {
            id: Date.now(),
            author: author || '익명 사용자',
            text: text,
            date: new Date().toLocaleString('ko-KR', { hour12: false }).replace(/\. /g, '-').replace('.', ''),
            likes: 0
        };
        this.comments.unshift(newComment);
        this.saveComments();
        this.render();
    }

    handleLike(id) {
        const comment = this.comments.find(c => c.id === id);
        if (comment) {
            comment.likes++;
            this.saveComments();
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 40px;
                    text-align: left;
                    font-family: 'Roboto', sans-serif;
                }
                .comments-card {
                    background: var(--container-bg, #ffffff);
                    padding: 32px;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px var(--card-shadow, rgba(0, 0, 0, 0.1));
                }
                h2 {
                    margin: 0 0 24px 0;
                    font-family: 'Montserrat', sans-serif;
                    color: var(--text-color, #333);
                    font-size: 1.6rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                h2::after {
                    content: '';
                    flex: 1;
                    height: 2px;
                    background: linear-gradient(to right, var(--btn-bg, #008CBA), transparent);
                }
                .input-section {
                    margin-bottom: 32px;
                    background: var(--bg-color, #f8f9fa);
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .input-row {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                input, textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background: white;
                    color: #333;
                    font-family: inherit;
                    font-size: 0.95rem;
                    transition: all 0.3s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--btn-bg, #008CBA);
                    box-shadow: 0 0 0 3px rgba(0, 140, 186, 0.15);
                }
                .submit-row {
                    display: flex;
                    justify-content: flex-end;
                }
                .btn-submit {
                    padding: 10px 24px;
                    background: var(--btn-bg, #008CBA);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }
                .btn-submit:hover {
                    background: var(--btn-hover, #005f7a);
                    transform: translateY(-1px);
                }
                .comment-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .comment-item {
                    display: flex;
                    gap: 16px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    animation: slideIn 0.4s ease-out;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--btn-bg, #008CBA), #8E44AD);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }
                .comment-content {
                    flex: 1;
                }
                .comment-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .author {
                    font-weight: 700;
                    color: var(--text-color, #333);
                }
                .date {
                    font-size: 0.8rem;
                    color: #888;
                }
                .text {
                    color: var(--text-color, #444);
                    line-height: 1.5;
                    margin-bottom: 10px;
                }
                .actions {
                    display: flex;
                    gap: 16px;
                }
                .action-btn {
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 0.85rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                .action-btn:hover {
                    background: rgba(0,0,0,0.05);
                    color: var(--btn-bg, #008CBA);
                }
                .like-count {
                    font-weight: bold;
                }
            </style>
            <div class="comments-card">
                <h2>커뮤니티 대화</h2>
                <div class="input-section">
                    <div class="input-row">
                        <input type="text" id="author-input" placeholder="이름 (닉네임)" style="max-width: 150px;">
                    </div>
                    <textarea id="text-input" placeholder="댓글을 입력해 주세요..." rows="3"></textarea>
                    <div class="submit-row">
                        <button class="btn-submit" id="add-btn">댓글 등록</button>
                    </div>
                </div>
                <div class="comment-list">
                    ${this.comments.map(c => `
                        <div class="comment-item">
                            <div class="avatar">${c.author[0]}</div>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <span class="author">${c.author}</span>
                                    <span class="date">${c.date}</span>
                                </div>
                                <div class="text">${c.text}</div>
                                <div class="actions">
                                    <button class="action-btn like-btn" data-id="${c.id}">
                                        👍 추천 <span class="like-count">${c.likes > 0 ? c.likes : ''}</span>
                                    </button>
                                    <button class="action-btn">답글</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('add-btn').addEventListener('click', () => {
            const author = this.shadowRoot.getElementById('author-input').value;
            const text = this.shadowRoot.getElementById('text-input').value;
            if (text.trim()) {
                this.addComment(author, text);
            }
        });

        this.shadowRoot.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleLike(parseInt(btn.dataset.id));
            });
        });
    }
}

customElements.define('professional-comments', ProfessionalComments);


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
