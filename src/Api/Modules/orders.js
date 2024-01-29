import { api } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async Addorder(payload) {
    return await api.post("/addorder", payload).then((res) => {
      notification.toast("Successfully Added", "success");
    });
  },

  async Allorders() {
    return await api.get("/allorderss");
  },

  async ChangeStatus(payload) {
    return await api.post("/changeorderststus", payload).then((res) => {
      notification.toast("Successfully Status Updated", "success");
      window.location.href = "/orders";
    });
  },
};
