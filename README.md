# 找點吃 - 4 Foodies

> 使用 Vue 3 和 Leaflet 地圖製作的全面美食探索平台
> 🔗 **[Live Demo 線上預覽](https://mallow96.github.io/new-foodie/#/)**

## 專案簡介

本專案旨在設計並打造一個一站式、功能全面的美食探索平台，功能包括：

1. 尋找及比較餐廳
2. 線上候位或訂位
3. 評論及分享
4. 餐廳活動及優惠券

### 主要功能

- **文字與地圖搜尋**：使用者可透過關鍵字或使用地圖尋找心儀的餐廳。
- **動態預訂系統**：操作預訂系統，當日可現場候位，前日則可提前預訂。會員中心則有管理目前訂單和瀏覽歷史紀錄的功能。

## 核心技術

**前端框架與建構工具：**

- [Vue 3](https://vuejs.org/) 框架
- [Vite](https://vitejs.dev/) 專案結構
- [Vue Router](https://router.vuejs.org/) 路由管理及頁面切換
- [Pinia](https://pinia.vuejs.org/) 狀態管理

**UI 與地圖套件：**

- [Leaflet.js](https://leafletjs.com/) 地圖引擎
- [Bootstrap 5](https://getbootstrap.com/) UI 框架
- [Day.js](https://day.js.org/) 日期處理
- 原生 CSS 及變數管理

**後端及資料庫：**

- Node.js / Express
- Railway App 後端 API 託管
- Firebase 資料庫

**部署：**

- GitHub Actions CI/CD 自動化部署
- GitHub Pages 前端託管

## 目錄結構

```text
src/
 ├─ assets/        # 靜態資源 (圖片、全域 CSS)
 ├─ components/    # UI 組件 (BackBtn, Stars, Tabs...)
 ├─ pages/         # 頁面級組件 (SearchMap, Home...)
 ├─ router/        # Vue Router 路由設定 (包含巢狀路由)
 ├─ store/         # Pinia 狀態管理 (API 請求、全域狀態)
 └─ main.js        # Vue 實體進入點
```

<!-- ## 系統架構亮點

### 1. 以 URL 為單一真相來源 (URL as State)

[簡述你如何使用 Vue Router 取代傳統的狀態變數，讓側邊欄與地圖完美同步。]

### 2. 效能優化 (Performance Optimization)

[簡述你如何使用 `defineAsyncComponent` 延遲載入龐大的日曆組件，以及使用 `computed` 取代不必要的 `watch`。]

### 3. 動態組件與狀態保留

[簡述你如何使用 `<KeepAlive>` 搭配 `:key="route.fullPath"` 來解決表單切換時的狀態遺失與混淆問題。] -->
