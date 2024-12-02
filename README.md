# 寶可夢訓練家記事簿 Pokémon Trainer TodoList

## 專案亮點
### 1. 每日訓練清單
![每日訓練清單](.\public\todoPreview.gif)
* 能新增、修改、刪除事項
  - [x] 輸入項防止只有空白內容、去除前後空白字元
  - [x] 每筆事項皆能更改狀態
  - [x] 操作後的動態動畫
  - [ ] 不允許重複事項
  - [ ] 時間戳表明刊登時間 
* 依照狀態篩選顯示 
  - [x] 分別有已完成、已刪除
* 與API串接
  
### 2. 寶可夢圖鑑
![寶可夢圖鑑](.\public\handbookPreview.gif)
* 關鍵詞搜尋
* 採用Lazyload優化效能
* 分頁顯示內容
  - [x] 使用每100筆call一次api方式，再將資料存取至data
  - [ ] 存至暫存
* 各寶可夢內頁資訊
  - [x] 內頁路由
  - [x] 能切換上下筆
  - [ ] 能隨機切換
  
### 3. 登入系統
![登入系統](.\public\loginPreview.gif)
* 會員註冊、會員登入
* 流程錯誤訊息判斷
* 與API串接

### 4. 其他
* RWD 響應式頁面
* Loading等待畫面

## 專案安裝
### Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```
