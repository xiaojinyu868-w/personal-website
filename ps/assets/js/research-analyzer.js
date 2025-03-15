/**
 * 研究方向智能分析系统
 * 基于硅基流动API实现，支持Qwen/QwQ-32B, deepseek-ai/DeepSeek-R1, deepseek-ai/DeepSeek-V3模型
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const modelSelector = document.getElementById('modelSelector');
    const tabs = document.querySelectorAll('.analyzer-tabs .tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // 兼容性分析相关元素
    const compatibilityPrompt = document.getElementById('compatibilityPrompt');
    const compatibilityWordCount = compatibilityPrompt.parentElement.querySelector('.word-count');
    const analyzeCompatibilityBtn = document.getElementById('analyzeCompatibility');
    const compatibilityResult = document.getElementById('compatibilityResult');
    const compatibilityTypingIndicator = compatibilityResult.querySelector('.typing-indicator');
    const compatibilityResultText = compatibilityResult.querySelector('.result-text');
    
    // 项目构思相关元素
    const projectPrompt = document.getElementById('projectPrompt');
    const projectWordCount = projectPrompt.parentElement.querySelector('.word-count');
    const generateProjectBtn = document.getElementById('generateProject');
    const projectResult = document.getElementById('projectResult');
    const projectTypingIndicator = projectResult.querySelector('.typing-indicator');
    const projectResultText = projectResult.querySelector('.result-text');
    
    // 反馈建议相关元素
    const feedbackPrompt = document.getElementById('feedbackPrompt');
    const feedbackWordCount = feedbackPrompt.parentElement.querySelector('.word-count');
    const provideFeedbackBtn = document.getElementById('provideFeedback');
    const feedbackResult = document.getElementById('feedbackResult');
    const feedbackTypingIndicator = feedbackResult.querySelector('.typing-indicator');
    const feedbackResultText = feedbackResult.querySelector('.result-text');
    
    // 联系表单
    const contactForm = document.getElementById('contactForm');
    
    // 复制和保存按钮
    const copyButtons = document.querySelectorAll('.copy-btn');
    const saveButtons = document.querySelectorAll('.save-btn');
    
    // 硅基流动API配置
    const API_URL = "https://api.siliconflow.cn/v1/chat/completions";
    const API_KEY = "sk-mvjozupcukoxdmaqoujhwpmqdyefkhyyfmvcvplucwpefjxo"; // 请替换为你的实际API密钥
    
    // 标签页切换功能
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签页的active类
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // 添加当前标签页的active类
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 文本框字数统计
    function updateWordCount(textarea, countElement) {
        const text = textarea.value;
        const count = text.length;
        countElement.textContent = `${count}/500`;
        
        if (count > 500) {
            countElement.style.color = '#e74c3c';
        } else {
            countElement.style.color = '#5a6a7e';
        }
    }
    
    // 为所有文本框添加字数统计功能
    compatibilityPrompt.addEventListener('input', () => updateWordCount(compatibilityPrompt, compatibilityWordCount));
    projectPrompt.addEventListener('input', () => updateWordCount(projectPrompt, projectWordCount));
    feedbackPrompt.addEventListener('input', () => updateWordCount(feedbackPrompt, feedbackWordCount));
    
    // 分析兼容性按钮点击事件
    analyzeCompatibilityBtn.addEventListener('click', function() {
        const prompt = compatibilityPrompt.value.trim();
        if (prompt.length < 10) {
            alert('请输入至少10个字符的描述');
            return;
        }
        
        const model = modelSelector.value;
        const systemPrompt = "你是一位研究兼容性分析专家。你需要分析用户描述的研究兴趣与李浩同学的研究方向的兼容性。李浩的研究兴趣包括：大模型后训练、大模型评测、强化学习、基于LLM的多智能体系统，以及AI在教育与社会科学领域的应用等。请详细分析兼容点、潜在合作方向，并给出1-5颗星的兼容性评分。";
        
        // 显示结果容器和加载动画
        compatibilityResult.classList.add('active');
        compatibilityTypingIndicator.style.display = 'flex';
        compatibilityResultText.textContent = '';
        
        // 禁用按钮
        analyzeCompatibilityBtn.disabled = true;
        analyzeCompatibilityBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 分析中...';
        
        // 调用API进行流式输出
        streamResponse(model, systemPrompt, prompt, compatibilityTypingIndicator, compatibilityResultText, analyzeCompatibilityBtn, '<i class="fas fa-brain"></i> 分析兼容性');
    });
    
    // 生成项目构思按钮点击事件
    generateProjectBtn.addEventListener('click', function() {
        const prompt = projectPrompt.value.trim();
        if (prompt.length < 10) {
            alert('请输入至少10个字符的描述');
            return;
        }
        
        const model = modelSelector.value;
        const systemPrompt = "你是一位研究项目构思专家。基于用户描述的研究兴趣，你需要生成3-5个可行的研究项目构思，这些项目应该与李浩同学的研究方向相关。李浩的研究兴趣包括：大模型后训练、大模型评测、强化学习、基于LLM的多智能体系统，以及AI在教育与社会科学领域的应用等。对每个项目构思，请提供项目名称、简短描述、可能的研究方法和预期成果。";
        
        // 显示结果容器和加载动画
        projectResult.classList.add('active');
        projectTypingIndicator.style.display = 'flex';
        projectResultText.textContent = '';
        
        // 禁用按钮
        generateProjectBtn.disabled = true;
        generateProjectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
        
        // 调用API进行流式输出
        streamResponse(model, systemPrompt, prompt, projectTypingIndicator, projectResultText, generateProjectBtn, '<i class="fas fa-lightbulb"></i> 生成项目构思');
    });
    
    // 提供反馈按钮点击事件
    provideFeedbackBtn.addEventListener('click', function() {
        const prompt = feedbackPrompt.value.trim();
        if (prompt.length < 10) {
            alert('请输入至少10个字符的描述');
            return;
        }
        
        const model = modelSelector.value;
        const systemPrompt = "你是一位研究方向专家顾问。基于用户描述的研究方向和挑战，你需要提供专业的反馈和建议。你的反馈应该基于李浩同学的研究背景，包括：大模型后训练、大模型评测、强化学习、基于LLM的多智能体系统，以及AI在教育与社会科学领域的应用等。请提供具体的改进建议、可能的研究方向调整，以及相关的学术资源推荐。";
        
        // 显示结果容器和加载动画
        feedbackResult.classList.add('active');
        feedbackTypingIndicator.style.display = 'flex';
        feedbackResultText.textContent = '';
        
        // 禁用按钮
        provideFeedbackBtn.disabled = true;
        provideFeedbackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 分析中...';
        
        // 调用API进行流式输出
        streamResponse(model, systemPrompt, prompt, feedbackTypingIndicator, feedbackResultText, provideFeedbackBtn, '<i class="fas fa-comment-dots"></i> 获取反馈');
    });
    
    // 流式响应处理函数
    async function streamResponse(model, systemPrompt, userPrompt, typingIndicator, resultText, button, buttonText) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "model": model,
                    "messages": [
                        {
                            "role": "system",
                            "content": systemPrompt
                        },
                        {
                            "role": "user",
                            "content": userPrompt
                        }
                    ],
                    "stream": true,
                    "max_tokens": 1024,
                    "temperature": 0.7,
                    "top_p": 0.7,
                    "top_k": 50,
                    "frequency_penalty": 0.5,
                    "n": 1,
                    "response_format": {"type": "text"}
                })
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = '';
            
            // 隐藏加载动画
            typingIndicator.style.display = 'none';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                // 解码二进制数据
                const chunk = decoder.decode(value, { stream: true });
                
                // 处理SSE格式的数据
                const lines = (buffer + chunk).split('\n');
                buffer = lines.pop();
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        
                        try {
                            const json = JSON.parse(data);
                            const content = json.choices[0].delta.content || '';
                            if (content) {
                                resultText.textContent += content;
                                // 自动滚动到底部
                                resultText.parentElement.scrollTop = resultText.parentElement.scrollHeight;
                            }
                        } catch (e) {
                            console.error('解析JSON失败:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('API调用错误:', error);
            resultText.textContent = `发生错误: ${error.message}。请稍后再试。`;
        } finally {
            // 恢复按钮状态
            button.disabled = false;
            button.innerHTML = buttonText;
        }
    }
    
    // 复制结果功能
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resultType = this.getAttribute('data-result');
            let resultText;
            
            switch (resultType) {
                case 'compatibility':
                    resultText = compatibilityResultText.textContent;
                    break;
                case 'project':
                    resultText = projectResultText.textContent;
                    break;
                case 'feedback':
                    resultText = feedbackResultText.textContent;
                    break;
                default:
                    return;
            }
            
            if (resultText) {
                navigator.clipboard.writeText(resultText)
                    .then(() => {
                        // 显示复制成功提示
                        const originalTitle = this.getAttribute('title');
                        this.setAttribute('title', '已复制!');
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        
                        setTimeout(() => {
                            this.setAttribute('title', originalTitle);
                            this.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('复制失败:', err);
                    });
            }
        });
    });
    
    // 保存结果功能
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resultType = this.getAttribute('data-result');
            let resultText, fileName;
            
            switch (resultType) {
                case 'compatibility':
                    resultText = compatibilityResultText.textContent;
                    fileName = '研究兼容性分析.txt';
                    break;
                case 'project':
                    resultText = projectResultText.textContent;
                    fileName = '项目构思.txt';
                    break;
                case 'feedback':
                    resultText = feedbackResultText.textContent;
                    fileName = '专业反馈.txt';
                    break;
                default:
                    return;
            }
            
            if (resultText) {
                const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // 显示保存成功提示
                const originalTitle = this.getAttribute('title');
                this.setAttribute('title', '已保存!');
                this.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    this.setAttribute('title', originalTitle);
                    this.innerHTML = '<i class="fas fa-save"></i>';
                }, 2000);
            }
        });
    });
    
    // 联系表单提交
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 这里可以添加发送邮件或保存到数据库的代码
        // 示例：使用localStorage临时保存
        const contactData = {
            name,
            email,
            message,
            date: new Date().toISOString()
        };
        
        // 保存联系信息
        const savedContacts = JSON.parse(localStorage.getItem('researchContacts') || '[]');
        savedContacts.push(contactData);
        localStorage.setItem('researchContacts', JSON.stringify(savedContacts));
        
        // 显示成功消息
        alert(`谢谢你的留言，${name}！我会尽快回复你。`);
        
        // 清空表单
        contactForm.reset();
    });
}); 