

## 檔案結構

```
business-card-tilt/
├── index.html          # 頁面結構（含左右切換箭頭）
├── style.css           # 外觀、3D 效果、反光、箭頭樣式
├── script.js           # 提案清單（分輪）、轉動角度、切換邏輯
├── proposal1-front.jpg # 提案一 正面
├── proposal1-back.jpg  # 提案一 背面
└── proposalN-front/back.jpg  # 各提案正反面（9.26：一～三，10.17：四、五）
```

## 新增一輪提案 / 新增提案

打開 `script.js`，找到 `rounds` 陣列。每一輪提案是一個物件，**最新的一輪放最上面**，
網址不帶參數時會先顯示它；右上角會自動出現各輪的日期可以切換，
舊的一輪也能用 `?round=0926` 這種網址直接打開。

```js
{
  id: '1017',          // 用在網址 ?round=1017 和頁面標題 proposal_Ke_1017
  label: '10.17',      // 右上角顯示的日期
  proposals: [
    {
      name: '提案四',
      from: '延續 9.26 提案二、三',   // 名片下方的小字，可省略
      front: 'proposal4-front.jpg',
      back: 'proposal4-back.jpg',
      bg: '#f4f1ea',                  // 頁面背景色
      tags: '＃拆解　＃符號與資訊',     // 右下角標籤
      // note: ['English Font | ...', 'Size | ...'],  // 字型/尺寸與預設不同時才加
    },
  ],
},
```

在某一輪的 `proposals` 裡多加一個物件，就會多一張可以左右切換的名片。

## 圖片規格

名片尺寸為 5.4cm x 9cm（寬:高 = 0.6:1），`style.css` 裡的 `--card-w` /
`--card-h` 已經照這個比例設定（螢幕上顯示為 4.5cm x 7.5cm）。JPG 圖片建議也用同樣比例
輸出（例如 540px x 900px 或更高解析度的等比例圖），避免
`background-size: cover` 裁到重要內容。

## 操作方式

- 滑鼠移動：卡片跟著轉動、反光跟著跑
- 點擊卡片：翻到背面 / 翻回正面
- 點左右箭頭 或 按鍵盤 ← →：切換提案（切換時會自動翻回正面）
- 點右上角日期：切換不同輪的提案

## 本機預覽

直接用瀏覽器打開 `index.html` 即可看到效果，不需要伺服器。

## 放上 GitHub 並開啟線上網址（GitHub Pages）

1. 到 GitHub 建立一個新的 repository（例如叫 `business-card`）。
2. 在終端機切換到這個資料夾，初始化並推上去：
   ```
   git init
   git add .
   git commit -m "init: interactive business card"
   git branch -M main
   git remote add origin https://github.com/你的帳號/business-card.git
   git push -u origin main
   ```
3. 到該 repository 的 **Settings → Pages**。
4. 在 "Build and deployment" → Source 選擇 **Deploy from a branch**，
   Branch 選 `main`，資料夾選 `/ (root)`，按 Save。
5. 等 1-2 分鐘，GitHub 會給你一個網址，例如：
   `https://你的帳號.github.io/business-card/`
   這就是你可以分享給客戶的線上名片連結。

## 客製化重點

打開 `style.css` 修改：
- `--bg`：頁面背景色（目前是白色）
- `--accent`：箭頭 hover 時的強調色
- `--card-w` / `--card-h`：卡片尺寸

打開 `script.js` 修改：
- `MAX_TILT`：轉動幅度，數字越大轉動感越明顯（建議 8～20 之間）
- `rounds`：各輪提案清單，如上所述
- `DEFAULT_NOTE`：左上角的字型/尺寸標註
