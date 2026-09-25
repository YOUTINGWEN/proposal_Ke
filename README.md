# 互動名片 Demo（滑鼠轉動效果 + 提案切換）

用純 HTML / CSS / JavaScript 做的 3D 傾斜名片（直式、無圓角），游標移動時
卡片會即時轉動，還有跟著游標移動的反光效果，點擊可以翻到背面。畫面左右有
箭頭按鈕，可以在同一個頁面切換不同提案。不需要任何框架或建置工具，可以
直接放上 GitHub Pages 免費架設分享給客戶。

## 檔案結構

```
business-card-tilt/
├── index.html          # 頁面結構（含左右切換箭頭）
├── style.css           # 外觀、3D 效果、反光、箭頭樣式
├── script.js           # 追蹤滑鼠位置、轉動角度、提案切換邏輯
├── proposal1-front.jpg # 提案一 正面
├── proposal1-back.jpg  # 提案一 背面
├── proposal2-front.jpg # 提案二 正面（目前是提案一的複製檔，換成你的第二個提案）
└── proposal2-back.jpg  # 提案二 背面（同上）
```

## 換上你的第二個提案

`proposal2-front.jpg` / `proposal2-back.jpg` 目前只是暫時複製提案一的圖，
把這兩個檔案換成你真正的第二個提案設計（檔名維持一樣）即可。

## 新增第三個、第四個提案

打開 `script.js`，找到最上面的 `proposals` 陣列：

```js
const proposals = [
  { name: '提案一', front: 'proposal1-front.jpg', back: 'proposal1-back.jpg' },
  { name: '提案二', front: 'proposal2-front.jpg', back: 'proposal2-back.jpg' },
];
```

要加提案，直接在陣列裡多加一行，例如：

```js
{ name: '提案三', front: 'proposal3-front.jpg', back: 'proposal3-back.jpg' },
```

把對應的圖片放進資料夾就會自動出現在切換清單裡，左右箭頭會自動循環。

## 圖片規格

名片尺寸為 5.4cm x 9cm（寬:高 = 0.6:1），`style.css` 裡的 `--card-w` /
`--card-h` 已經照這個比例設定（240px x 400px）。JPG 圖片建議也用同樣比例
輸出（例如 540px x 900px 或更高解析度的等比例圖），避免
`background-size: cover` 裁到重要內容。

## 操作方式

- 滑鼠移動：卡片跟著轉動、反光跟著跑
- 點擊卡片：翻到背面 / 翻回正面
- 點左右箭頭 或 按鍵盤 ← →：切換提案（切換時會自動翻回正面）

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
- `proposals`：提案清單，如上所述
