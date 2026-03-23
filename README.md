# Foodie

本專案基於 **Vue 3** ，採用現代前端技術，後端為Node.js，資料庫使用firebase；實現了從產品瀏覽、全域狀態管理到訂單處理的完整美食電商流程。

---

## 專案核心特色

- **Vue 3 框架**：利用最新版的 Composition API 與 Script Setup 語法，構建高效且易於維護的組件。
- **全域狀態管理 (Pinia)**：
  - 使用 `foodie_store.js` 集中管理前端資料。
- **動態路由導航**：使用 **Vue Router 4** 實現流暢的頁面切換與動態參數路由。
- **時間格式優化**：利用 **Day.js** 處理訂單時間與日期顯示。
- **響應式介面設計**：採用部分 **Bootstrap 5** 佈局，完美適配手機、平板與桌上型電腦。
- **後端環境**：
  - 後端使用**Node.js**，佈署至Railway ，並同步資料至Firebase資料庫。
  - 前端透過 **Axios** 非同步讀取後端API。
  - 具備 `members` (會員)、`restaurants` (餐廳) 及 `reservations` (預訂) 資料結構。

---

## 技術表

| 技術分類     | 工具名稱       | 版本 / 說明              |
| :----------- | :------------- | :----------------------- |
| **核心框架** | **Vue.js 3**   | 進階響應式框架           |
| **建構工具** | **Vite**       | 次世代快速開發工具       |
| **狀態管理** | **Pinia**      | 全域狀態管理             |
| **路由管理** | **Vue Router** | 單頁應用路由導航         |
| **資料請求** | **Axios**      | 處理 JSON 資料非同步讀取 |
| **UI 框架**  | **Bootstrap**  | 響應式 UI 與 Bootstrap   |
| **工具庫**   | **Day.js**     | 輕量化時間處理           |

---

## 專案目錄結構

```text
project foodie/
├── public/
├── src/
│   ├── assets/            # 靜態資源 (圖片、SVG)
│   ├── components/        # 可複用 UI 組件
│   ├── pages/             # 頁面級組件 (Home, Menu, Order...)
│   ├── router/            # Vue Router 路由配置 (router.js)
│   └── store/             # Pinia 狀態管理 (foodie_store.js)
├── package.json           # 專案依賴與腳本
└── vite.config.js         # Vite 環境設定
```
