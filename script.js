const stage = document.querySelector('.stage');
const card = document.getElementById('card');
const shines = document.querySelectorAll('.shine');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const label = document.getElementById('proposalLabel');
const tagsEl = document.getElementById('tags');
const root = document.documentElement;

const MAX_TILT = 16; // 最大傾斜角度，數字越大轉動感越誇張

// 在這裡新增/修改提案，name 會顯示在名片下方，tags 會顯示在右下角
const proposals = [
  {
    name: '提案一',
    front: 'proposal1-front.jpg',
    back: 'proposal1-back.jpg',
    bg: '#FFFFFF',
    tags: '＃透明度 ＃模糊 ＃賽璐璐片',
  },
  {
    name: '提案二',
    front: 'proposal2-front.jpg',
    back: 'proposal2-back.jpg',
    bg: '#f4f1ea',
    tags: '＃拆解　＃符號與資訊',
  },
  {
    name: '提案三',
    front: 'proposal3-front.jpg',
    back: 'proposal3-back.jpg',
    bg: '#f4f1ea',
    tags: '＃拆解　＃符號與資訊',
  },
];

let current = 0;

function renderProposal(index) {
  const p = proposals[index];
  root.style.setProperty('--front-img', `url('${p.front}')`);
  root.style.setProperty('--back-img', `url('${p.back}')`);
  root.style.setProperty('--bg', p.bg);
  label.textContent = `${p.name}（${index + 1} / ${proposals.length}）`;
  tagsEl.textContent = p.tags;

  // 切換提案時翻回正面，避免使用者切換後還停留在背面
  card.classList.remove('flipped');
}

function goTo(index) {
  current = (index + proposals.length) % proposals.length;
  renderProposal(current);
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

// 也支援鍵盤左右鍵切換
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

function applyTilt(clientX, clientY) {
  const rect = stage.getBoundingClientRect();

  // 游標在卡片內的相對位置 (0 ~ 1)
  const px = (clientX - rect.left) / rect.width;
  const py = (clientY - rect.top) / rect.height;

  // 轉成 -0.5 ~ 0.5，方便算旋轉角度
  const rotateY = (px - 0.5) * 2 * MAX_TILT;   // 左右移動 -> 繞Y軸轉
  const rotateX = (0.5 - py) * 2 * MAX_TILT;   // 上下移動 -> 繞X軸轉

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // 光澤反射跟著游標跑
  shines.forEach(shine => {
    shine.style.setProperty('--mx', `${px * 100}%`);
    shine.style.setProperty('--my', `${py * 100}%`);
  });
}

function resetTilt() {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

// 桌面：滑鼠移動
stage.addEventListener('mousemove', (e) => {
  applyTilt(e.clientX, e.clientY);
});

stage.addEventListener('mouseleave', resetTilt);

// 手機：手指拖曳
stage.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  applyTilt(touch.clientX, touch.clientY);
}, { passive: true });

stage.addEventListener('touchend', resetTilt);

// 點擊 / 點按 翻面
card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

// 初始化：顯示第一個提案
renderProposal(current);
