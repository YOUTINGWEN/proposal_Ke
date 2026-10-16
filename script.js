const stage = document.querySelector('.stage');
const card = document.getElementById('card');
const shines = document.querySelectorAll('.shine');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const label = document.getElementById('proposalLabel');
const fromEl = document.getElementById('proposalFrom');
const tagsEl = document.getElementById('tags');
const noteEl = document.getElementById('pageNote');
const roundNav = document.getElementById('roundNav');
const root = document.documentElement;

const MAX_TILT = 16; // 最大傾斜角度，數字越大轉動感越誇張

// 預設的左上角標註（字型 / 尺寸）。某個提案若不同，可在該提案加上 note 覆蓋。
const DEFAULT_NOTE = [
  'English Font | Altivo',
  'Traditional Chinese Font | Hiragino Kaku Gothic',
  'Size | 54 × 90 mm',
];

// 每一輪提案。最新的一輪放最上面，網址不帶參數時會先顯示它。
// 舊的一輪用 ?round=0926 這種網址也能直接打開。
const rounds = [
  {
    id: '1016',
    label: '10.16',
    proposals: [
      {
        name: '提案四',
        from: '延續 9.26 提案二、三',
        front: 'proposal4-front.jpg',
        back: 'proposal4-back.jpg',
        bg: '#f4f1ea',
        tags: '＃拆解　＃符號與資訊',
      },
      {
        name: '提案五',
        from: '延續 9.26 提案二、三',
        front: 'proposal5-front.jpg',
        back: 'proposal5-back.jpg',
        bg: '#f4f1ea',
        tags: '＃拆解　＃符號與資訊',
      },
    ],
  },
  {
    id: '0926',
    label: '9.26',
    proposals: [
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
    ],
  },
];

const requested = new URLSearchParams(location.search).get('round');
let round = rounds.find(r => r.id === requested) || rounds[0];
let current = 0;

// 右上角：各輪提案的切換
rounds.forEach(r => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = r.label;
  btn.dataset.round = r.id;
  btn.addEventListener('click', () => selectRound(r.id));
  roundNav.appendChild(btn);
});

function selectRound(id) {
  round = rounds.find(r => r.id === id) || rounds[0];
  current = 0;

  const url = new URL(location.href);
  if (round === rounds[0]) url.searchParams.delete('round');
  else url.searchParams.set('round', round.id);
  history.replaceState(null, '', url);

  document.title = `proposal_Ke_${round.id}`;
  roundNav.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.round === round.id);
  });

  renderProposal(current);
}

function renderProposal(index) {
  const list = round.proposals;
  const p = list[index];
  root.style.setProperty('--front-img', `url('${p.front}')`);
  root.style.setProperty('--back-img', `url('${p.back}')`);
  root.style.setProperty('--bg', p.bg);
  label.textContent = `${p.name}（${index + 1} / ${list.length}）`;
  fromEl.textContent = p.from || '';
  tagsEl.textContent = p.tags;
  noteEl.innerHTML = (p.note || DEFAULT_NOTE).join('<br>');

  // 只有一個提案時不需要左右箭頭
  const single = list.length < 2;
  prevBtn.style.visibility = single ? 'hidden' : '';
  nextBtn.style.visibility = single ? 'hidden' : '';

  // 切換提案時翻回正面，避免使用者切換後還停留在背面
  card.classList.remove('flipped');
}

function goTo(index) {
  const n = round.proposals.length;
  current = (index + n) % n;
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

// 手機：手指拖曳（style.css 的 touch-action 讓拖曳時頁面不會跟著捲動）
stage.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  applyTilt(touch.clientX, touch.clientY);
}, { passive: true });

stage.addEventListener('touchend', resetTilt);

// 點擊 / 點按 翻面
card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

// 初始化：顯示網址指定的那一輪（預設最新一輪）的第一個提案
selectRound(round.id);
