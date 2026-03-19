import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_URL = "/api";

//setup 語法
export const useFoodStore = defineStore(
  "notes",
  () => {
    // ref() 就是 state 属性

    // const router = useRouter();

    const users = ref(null);
    const restaurants = ref(null);
    const reservations = ref(null);

    const loggedInUser = ref(null);
    const currentUsername = ref("user1");

    const isLoading = ref(false);
    const dataError = ref(null);

    const testFoodImages = ref([
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/103e6b95-ebea-4499-ab78-8a12c3260db4.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/49b0993f-3b3d-4e54-86a6-7a1f9576d140.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7c95fb14-79db-4e25-a11c-4625a25ec718.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b0fa1fd8-7b8c-42c0-a46c-c0d4f1e48970.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/6b96d76a-3259-47e3-86b9-441a4adaa89c.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c719966b-606c-4bc8-b174-157d8d64e288.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7e477cc1-d5f7-4711-9ef3-cb2d8c085f08.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/1a386717-441d-4dbd-b493-97992864747e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/150bbb9f-65bf-4c76-b760-42a5eea33172.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/07651fb8-92d0-4e4b-b84d-d965c02d4463.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/23b3b3a3-5ed9-4a82-b7db-54777b1ca73f.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b8530c78-f075-4f46-ab5d-962a704fd88e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/03da4e5c-9d4b-4dfb-8a05-1600103b77c6.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/bfdee97f-6fbe-4a6e-958a-4088686de189.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c8562d09-7b19-4efe-967a-16b080f63200.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8074c32f-caf2-4790-a55f-dd45245d0cf1.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e76eb96c-7c32-4f46-abe9-dcac6bcb91dd.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/040aad80-4e4d-4707-9e60-e569b423dd4e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fb67731f-7751-495a-8a5f-0a0ba6b03f40.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/806bc095-1b75-4066-b93d-439a9c77ec4b.png",
    ]);

    // computed() 就是 getters
    const hasLoadedMembers = computed(() => {
      return !!(
        users.value &&
        Array.isArray(users.value) &&
        users.value.length > 0
      );
    });

    // 取得登入使用者的基本資訊（避免暴露密碼 hash 等）

    const getLoggedInUserBasicInfo = computed(() => {
      if (loggedInUser.value) {
        // 只回傳需要顯示的資料欄位
        const {
          realName,
          username,
          email,
          phone,
          createdAt,
          userId,
          lastLogin,
          likedRestaurants,
          reviewAmount,
        } = loggedInUser.value;
        return {
          realName,
          username,
          email,
          phone,
          createdAt,
          userId,
          lastLogin,
          likedRestaurants,
          reviewAmount,
        };
      }
      return null;
    });

    // function() 就是 actions
    // 根據 username 設定登入使用者
    const fetchAllData = async () => {
      isLoading.value = true;
      dataError.value = null;

      try {
        console.log("開始載入資料...");
        const [memberRes, restaurantRes, reservationRes] = await Promise.all([
          axios.get(`${API_URL}/members`),
          axios.get(`${API_URL}/restaurants`),
          axios.get(`${API_URL}/reservations`),
        ]);

        users.value = memberRes.data;
        restaurants.value = restaurantRes.data;
        // console.log("前端收到的 restaurants:", restaurants.value);
        reservations.value = reservationRes.data;
        console.log("所有資料載入完成");

        //執行自動登入
        const targetUsername = currentUsername.value || "user1";
        const userExists = users.value.find(
          (m) => m.username === targetUsername,
        );

        if (userExists) {
          loggedInUser.value = userExists;
          console.log(`成功登入用戶 ${targetUsername} 。`);
        } else {
          loggedInUser.value = null;
          console.warn(`找不到用戶 ${targetUsername} 。`);
        }
      } catch (err) {
        console.error("載入資料時發生錯誤:", err);
        dataError.value = "無法載入部分或所有資料。";
      } finally {
        isLoading.value = false;
      }
    };

    const loginUserByUsername = (username) => {
      if (!hasLoadedMembers.value) {
        console.error("錯誤: 會員資料尚未載入，無法執行登入。");
        return false;
      }

      const user = users.value.find((m) => m.username === username);

      if (user) {
        loggedInUser.value = user;
        console.log(`User ${username} logged in successfully.`);
        return true;
      } else {
        console.error(`User ${username} not found.`);
        loggedInUser.value = null; // 清空狀態
        return false;
      }
    };

    const getRestaurantInfo = (id) => {
      if (!restaurants.value || !Array.isArray(restaurants.value)) {
        return { id: "", name: "載入中...", address: "..." };
      }
      return (
        restaurants.value.find((r) => r.id === id) || {
          id: "",
          name: "餐廳不存在",
          address: "",
          contactPhone: "",
          rating: "",
          reviewCount: "",
          image: "",
        }
      );
    };

    // 將 reservations 裡每筆資料，結合對應餐廳的 imageUrl
    const myReservations = computed(() => {
      if (
        !reservations.value ||
        !restaurants.value ||
        restaurants.value.length === 0
      ) {
        return [];
      }

      const userReservations = reservations.value.filter(
        (resv) => resv.userId === loggedInUser.value.userId,
      );

      return reservations.value.map((resv) => {
        // 透過ID尋找餐廳物件
        const restaurant = getRestaurantInfo(resv.restaurantId);

        return {
          ...resv,
          // 如果有找到，就加上 imageUrl，否則留空字串
          restaurantName: restaurant.name || "未知餐廳",
          restaurantAddress: restaurant.address || "無地址資訊",
          restaurantPhone: restaurant.contactPhone || "無電話資訊",
          restaurantImage: restaurant.image || "",
        };
      });
    });

    const newReservation = async (
      restaurantId,
      date,
      dayOfWeek,
      time,
      partySize,
      name,
      phone,
      email,
      note,
    ) => {
      if (!name || !phone || !partySize) {
        return false;
      }

      try {
        const restaurantName =
          getRestaurantInfo(restaurantId)?.name || "未知餐廳";

        const payload = {
          userId: loggedInUser.value.userId || "guest",
          restaurantId,
          restaurantName,
          date,
          dayOfWeek,
          time,
          partySize,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          note,
        };

        const response = await axios.post(`${API_URL}/reservations`, payload);

        if (!reservations.value) {
          reservations.value = [];
        }
        reservations.value.push(response.data.reservation);

        console.log("預約成功，API回傳: ", response.data);
        return true;
      } catch (error) {
        console.error("預約失敗: ", error);
        return false;
      }
    };

    const findReservationById = (id) => {
      const target = reservations.value.find((res) => res.bookingId === id);
      return target || null;
    };

    const cancelReservation = async (id) => {
      try {
        await axios.delete(`${API_URL}/reservations/${id}`);

        const index = reservations.value.findIndex(
          (res) => res.bookingId === id,
        );

        if (index !== -1) {
          reservations.value.splice(index, 1);
          console.log(`已取消 bookingId 為 ${id} 的預約紀錄。`);
        }
      } catch (error) {
        console.error("取消預約失敗: ", error);
      }
    };

    const editReservation = async (
      id,
      newDate,
      newPartySize,
      newTime,
      newNote,
      newDayOfWeek,
    ) => {
      try {
        await axios.put(`${API_URL}/reservations/${id}`, {
          date: newDate,
          partySize: newPartySize,
          time: newTime,
          note: newNote,
          dayOfWeek: newDayOfWeek,
        });

        //本地狀態
        const target = reservations.value.find((res) => res.bookingId === id);
        if (target) {
          target.date = newDate;
          target.partySize = newPartySize;
          target.time = newTime;
          target.note = newNote;
          target.dayOfWeek = newDayOfWeek;
        }

        console.log("訂位編輯成功");
        return true;
      } catch (error) {
        console.error("編輯失敗", error);
        return false;
      }
    };

    const results = ref([]);
    function search(keyword) {
      const kw = keyword.trim().toLowerCase();
      if (!kw) {
        results.value = [];
        return;
      }
      results.value = restaurants.value.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(kw);
        const addressMatch = item.address.toLowerCase().includes(kw);
        const dishesMatch =
          Array.isArray(item.signatureDishes) &&
          item.signatureDishes.some((dish) => dish.toLowerCase().includes(kw));

        return nameMatch || addressMatch || dishesMatch;
      });
    }

    const directUnfinished = () => {
      router.push("/this-page-is-developing");
    };

    const randomIdGenerator = (count, minNum, maxNum) => {
      // 檢查範圍是否足夠生成所需數量的 ID
      if (maxNum - minNum + 1 < count) {
        console.error(
          `錯誤：範圍 (共 ${
            maxNum - minNum + 1
          } 個) 太小，無法生成 ${count} 個唯一 ID。`,
        );
        return [];
      }

      const uniqueIds = new Set(); // 使用 Set 來高效地儲存和檢查 ID 的唯一性
      const totalPossible = maxNum - minNum + 1; // 總共可能的 ID 數量

      // 方法 1：隨機抽取法（適用於需要的數量較少時）
      while (uniqueIds.size < count) {
        // 1. 生成範圍內的隨機數字
        // Math.random() * (max - min + 1) -> 產生 0 到 (max - min) 之間的數
        // Math.floor(...) + min -> 確保是 min 到 max 之間的整數
        const randomNum =
          Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

        // 2. 組裝成 ID 格式
        const newId = `r${randomNum}`;

        // 3. 將新的 ID 加入 Set。Set 只會儲存唯一的值，如果 ID 已存在，size 不會增加
        uniqueIds.add(newId);
      }

      // 將 Set 轉換回陣列並回傳
      return Array.from(uniqueIds);
    };

    const changeUserName = (newName) => {
      currentUsername.value = newName;
      window.location.reload();
    };

    return {
      restaurants,
      users,
      reservations,
      currentUsername,
      loggedInUser,
      getLoggedInUserBasicInfo,
      isLoading,
      dataError,
      hasLoadedMembers,
      results,
      testFoodImages,
      myReservations,
      fetchAllData,
      loginUserByUsername,
      newReservation,
      getRestaurantInfo,
      search,
      directUnfinished,
      randomIdGenerator,
      changeUserName,
      findReservationById,
      cancelReservation,
      editReservation,
    };
  },
  { persist: false }, // 啟用持久化
);

// option語法
// export const useFruitStore = defineStore('fruits', {
//     state: () => ({
//         name: "水蜜桃",
//         price: 100
//     }),

//     getters: {
//     },

//     actions: {

//     },
// })
