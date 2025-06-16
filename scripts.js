document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('site-url').textContent = window.location.href;
    updateBrowserInfo();
    setInterval(updateCurrentTime, 1000);
});

function updateBrowserInfo() {
    document.getElementById('user-agent').textContent = navigator.userAgent;
    document.getElementById('screen-resolution').textContent = `${window.screen.width}x${window.screen.height}`;
}

function updateCurrentTime() {
    document.getElementById('current-time').textContent = new Date().toLocaleString();
}

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    showResult("生成的密码: " + password);
}

function formatJSON() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 90%;
        width: 500px;
    `;

    const textarea = document.createElement('textarea');
    textarea.style.cssText = `
        width: 100%;
        height: 100px;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
    `;

    const button = document.createElement('button');
    button.textContent = '格式化';
    button.style.marginRight = '10px';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '关闭';

    modal.appendChild(document.createTextNode('请输入JSON字符串：'));
    modal.appendChild(textarea);
    modal.appendChild(button);
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);

    button.onclick = () => {
        try {
            const formatted = JSON.stringify(JSON.parse(textarea.value), null, 2);
            showResult(formatted);
            document.body.removeChild(modal);
        } catch (e) {
            showResult("无效的JSON格式");
        }
    };

    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
}

function base64Convert() {
    const input = prompt("请输入要转换的文本:");
    const encoded = btoa(input);
    showResult(`原文: ${input}\n编码: ${encoded}`);
}

function showResult(text) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = text;
}

// 添加鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// 鼠标离开时重置卡片位置
document.querySelector('.card').addEventListener('mouseleave', () => {
    const card = document.querySelector('.card');
    card.style.transform = 'rotateY(0) rotateX(0)';
});