import http from "k6/http";
import { check, group, sleep } from "k6";
import { SharedArray } from "k6/data";

export let options = {
  stages: [
    { duration: "10s", target: 500 }, // 1 phút, 50 người dùng
    { duration: "1m", target: 2000 }, // 2 phút, tăng lên 500 người dùng
    { duration: "1m", target: 1000 }, // 1 phút, giảm về 50 người dùng
    { duration: "10s", target: 0 }, // 1 phút, giảm về 0 người dùng
  ],
  thresholds: {
    http_req_duration: ["p(95)<800"], // 95% thời gian phản hồi dưới 800ms
    http_req_failed: ["rate<0.01"], // Tỷ lệ yêu cầu thất bại dưới 1%
  },
};

export default function () {
  group("Load test group", () => {
    // Tạo mới một resource
    let res = http.post(
      "http://127.0.0.1:3000/api/posts",
      JSON.stringify({
        title: "First Post",
        content: "The first post made",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        tags: { name: "CreateResource" },
      }
    );
    check(res, {
      "status is 200": (r) => r.status === 200,
      "resource created": (r) => r.json("id") !== "",
    });
    let resourceId = res.json("id");
    sleep(1);

    // Xem chi tiết resource
    res = http.get(`http://127.0.0.1:3000/api/posts/${resourceId}`, {
      tags: { type: "GetResource" },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
      "resource id matches": (r) => r.json("id") === resourceId,
    });
    sleep(1);

    // Cập nhật resource
    res = http.patch(
      `http://127.0.0.1:3000/api/posts/${resourceId}`,
      JSON.stringify({
        title: "Updated Resource",
        content: "Updated value",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        tags: { name: "UpdateResource" },
      }
    );
    check(res, {
      "status is 200": (r) => r.status === 200,
      "resource updated": (r) => r.json("title") === "Updated Resource",
    });
    sleep(1);

    // Xóa resource
    res = http.del(
      `http://127.0.0.1:3000/api/posts`,
      JSON.stringify({
        id: resourceId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        tags: { name: "UpdateResource" },
      }
    );
    check(res, {
      "status is 200": (r) => r.status === 200,
      "resource delete": (r) => r.json("id") !== "", 
    });
    sleep(1);
  });
}
