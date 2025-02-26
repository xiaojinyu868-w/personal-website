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

if (navToggle) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
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
      smoothScroll(targetElement, 1000);
    }
  });
});

function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 70;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
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