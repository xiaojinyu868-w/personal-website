// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 0';
    navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '15px 0';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// 移动端导航菜单
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

if (navToggle) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });
}

// 点击遮罩层关闭菜单
if (navOverlay) {
  navOverlay.addEventListener('click', function() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('no-scroll');
  });
}

// 滚动平滑效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // 关闭移动菜单（如果打开）
    if (navToggle && navToggle.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      body.classList.remove('no-scroll');
    }

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // 平滑滚动到目标位置
      window.scrollTo({
        top: targetSection.offsetTop - 70, // 减去导航栏高度
        behavior: 'smooth'
      });
      
      // 更新活动导航项
      document.querySelectorAll('.nav-menu li').forEach(item => {
        item.classList.remove('active');
      });
      this.parentElement.classList.add('active');
    }
  });
});

// 表单提交处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 这里可以添加发送邮件的API调用
    alert(`感谢您的留言，${name}！\n我会尽快回复您的邮件：${email}`);
    
    // 重置表单
    contactForm.reset();
  });
}

// 动态调整活动导航项
function setActiveNavItem() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-menu li');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.querySelector('a').getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavItem);

// 页面加载完成后隐藏加载动画
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// 返回顶部按钮
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 侧边联系方式面板交互
const contactToggle = document.querySelector('.contact-toggle');
const sideContact = document.querySelector('.side-contact');
const closeContact = document.querySelector('.close-contact');

if (contactToggle && sideContact) {
  contactToggle.addEventListener('click', function() {
    sideContact.classList.toggle('active');
  });
  
  if (closeContact) {
    closeContact.addEventListener('click', function() {
      sideContact.classList.remove('active');
    });
  }
  
  // 点击面板外部关闭
  document.addEventListener('click', function(e) {
    if (!sideContact.contains(e.target) && sideContact.classList.contains('active')) {
      sideContact.classList.remove('active');
    }
  });
}

// 粒子效果调整
document.addEventListener('DOMContentLoaded', function() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 100,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 200,
            "size": 4,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }
});

// 添加打字机效果
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.querySelector('.typing-text');
  if(typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
  }
  
  // 添加社交图标动画
  const socialIcons = document.querySelectorAll('.hero-social a');
  socialIcons.forEach((icon, index) => {
    icon.style.setProperty('--i', index + 1);
  });
  
  // 粒子背景优化
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
        },
        "opacity": {
          "value": 0.5,
          "random": true,
        },
        "size": {
          "value": 3,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }
  
  // 滚动进度条
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-progress';
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
});

// 添加技能进度条动画
function animateSkills() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  skillLevels.forEach(level => {
    const value = level.style.width;
    level.style.width = '0%';
    
    setTimeout(() => {
      level.style.width = value;
    }, 100);
  });
}

// 触发技能动画的观察器
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// 增强页面滚动体验
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      smoothScroll(targetId);
    }
  });
});

// 统一交互延迟时间
const ANIMATION_DURATION = {
    SHORT: 300,
    MEDIUM: 500,
    LONG: 800
};

// 优化滚动体验
function smoothScroll(target, duration = ANIMATION_DURATION.MEDIUM) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const offset = 100; // 导航栏高度偏移
    const distance = targetPosition - startPosition - offset;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = ease(progress);
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t) {
        // 使用更自然的缓动函数
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    requestAnimationFrame(animation);
}

// 改善首屏加载体验
document.addEventListener('DOMContentLoaded', function() {
    // 预加载处理
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // 添加阶段性加载指示
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                // 触发首屏内容动画
                document.querySelector('.hero-content').classList.add('loaded');
            }, ANIMATION_DURATION.SHORT);
        }, ANIMATION_DURATION.MEDIUM);
    }
    
    // 初始化其他功能
    initSkillsAnimation();
    initNavigationEffects();
});

// 优化导航体验
function initNavigationEffects() {
    // 处理固定导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // 使用Intersection Observer替代滚动事件监听
        const navObserver = new IntersectionObserver(
            (entries) => {
                navbar.classList.toggle('nav-fixed', !entries[0].isIntersecting);
            },
            { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
        );
        
        // 创建一个观察点
        const navObservePoint = document.querySelector('.hero') || document.body.firstElementChild;
        if (navObservePoint) {
            navObserver.observe(navObservePoint);
        }
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'));
                
                // 关闭移动端菜单
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// 添加关于我部分的卡片滑入效果
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 为个人资料添加动画
          const profileElement = aboutSection.querySelector('.about-profile');
          if (profileElement) {
            profileElement.style.opacity = '0';
            profileElement.style.transform = 'translateY(30px)';
            profileElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
              profileElement.style.opacity = '1';
              profileElement.style.transform = 'translateY(0)';
            }, 300);
          }
          
          // 为卡片添加动画
          const cards = aboutSection.querySelectorAll('.about-card');
          cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
          });
          
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  
  aboutObserver.observe(aboutSection);
}

// 技能栏动画
function initSkillsAnimation() {
    // 如果技能部分存在
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    // 初始状态下添加动画类（使宽度为0）
    skillsSection.classList.add('animate');
    
    // 获取所有技能类别
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // 检测元素是否在视窗内
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // 应用动画效果
    function animateSkills() {
        // 移除动画类以触发动画
        if (isInViewport(skillsSection)) {
            skillsSection.classList.remove('animate');
            // 给每个技能卡片添加动画效果
            skillCategories.forEach((category, index) => {
                setTimeout(() => {
                    category.classList.add('appear');
                }, index * 150);
            });
            // 移除滚动监听器
            window.removeEventListener('scroll', animateSkills);
        }
    }

    // 添加滚动监听器
    window.addEventListener('scroll', animateSkills);
    // 立即检查一次，以防技能部分已经在视窗内
    animateSkills();
    
    // 给技能卡片添加悬浮效果
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'float 3s ease-in-out infinite';
                }, 10);
            }
        });
    });
}

// 给技能描述添加悬浮效果
function initSkillDescriptions() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const description = item.querySelector('.skill-description');
        if (!description) return;
        
        // 添加工具提示效果
        item.addEventListener('mouseenter', function() {
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            description.style.opacity = '0.8';
            description.style.transform = 'translateY(10px)';
        });
    });
}

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化预加载器
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // 初始化技能动画
    initSkillsAnimation();
    initSkillDescriptions();
    
    // 处理固定导航栏
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('nav-fixed');
            } else {
                navbar.classList.remove('nav-fixed');
            }
        });
    }
    
    // 处理响应式菜单
    const navToggler = document.querySelector('.nav-toggler');
    const navLinks = document.querySelector('.nav-links');
    if (navToggler && navLinks) {
        navToggler.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggler.classList.toggle('active');
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 100; // 顶部偏移量
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 如果是在移动设备上，点击后关闭菜单
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggler.classList.remove('active');
                }
            }
        });
    });
    
    // 处理回到顶部按钮
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 联系表单处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // 显示发送中状态
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟表单提交 (在此处添加真实的表单提交逻辑)
            setTimeout(() => {
                submitBtn.textContent = '已发送！';
                contactForm.reset();
                
                // 3秒后恢复原始状态
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // 添加粘性便签hover效果
    const stickyNotes = document.querySelectorAll('.sticky-note');
    if (stickyNotes.length > 0) {
        stickyNotes.forEach(note => {
            // 随机旋转角度
            const randomRotate = (Math.random() - 0.5) * 6;
            note.style.transform = `rotate(${randomRotate}deg)`;
            
            // 随机偏移
            const randomTranslateX = (Math.random() - 0.5) * 10;
            const randomTranslateY = (Math.random() - 0.5) * 10;
            
            // 添加hover效果
            note.addEventListener('mouseenter', function() {
                this.style.transform = `rotate(0deg) translateX(0) translateY(-10px)`;
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                this.style.zIndex = '10';
            });
            
            note.addEventListener('mouseleave', function() {
                this.style.transform = `rotate(${randomRotate}deg) translateX(${randomTranslateX}px) translateY(${randomTranslateY}px)`;
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
                this.style.zIndex = '1';
            });
            
            // 初始应用随机效果
            note.style.transform = `rotate(${randomRotate}deg) translateX(${randomTranslateX}px) translateY(${randomTranslateY}px)`;
        });
    }
});

// 移动端底部导航
function updateMobileNav() {
  // 已移除底部导航，此函数保留但不执行任何操作
  return;
}

// 添加滚动事件监听器
// 已移除底部导航相关的事件监听器 