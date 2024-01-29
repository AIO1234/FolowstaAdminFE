import { api } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async AddService(payload) {
    return await api.post("/addservice", payload).then((res) => {
      notification.toast("Successfully Added", "success");
      window.location.href = "/services";
    });
  },

  async UpdateService(id, payload) {
    return await api.put(`/updateceservice/${id}`, payload).then((res) => {
      notification.toast("Successfully Updated", "success");
      window.location.href = "/services";
    });
  },

  async DeleteService(id) {
    return await api.delete(`/deleteservice/${id}`).then((res) => {
      notification.toast("Successfully Deleted", "success");
      window.location.href = "/services";
    });
  },

  async AllServices() {
    return await api.get("/allcategories");
  },
};
