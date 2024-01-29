import { api } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async AddCategory(payload) {
    return await api.post("/addcategory", payload).then((res) => {
      notification.toast("Successfully Added", "success");
    });
  },

  async UpdateCategory(id , payload) {
    return await api.put(`/updatececategory/${id}`, payload).then((res) => {
      notification.toast("Successfully Updated", "success");
      window.location.href = "/categories";
    });
  },

  async DeleteCategory(id) {
    return await api.delete(`/deletecategory/${id}`).then((res) => {
      notification.toast("Successfully Deleted", "success");
      window.location.href = "/categories";
    });
  },

  async AddSubCategory(payload) {
    return await api.post("/addsubcategory", payload).then((res) => {
      notification.toast("Successfully Added", "success");
      window.location.href = "/categories";
    });
  },
  async AllCategories() {
    return await api.get("/allcategories");
  },
};
