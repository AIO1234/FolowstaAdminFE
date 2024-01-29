import { api } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async UpdateSubCategory(id , payload) {
    return await api.put(`/updatesubcategory/${id}`, payload).then((res) => {
      notification.toast("Successfully Updated", "success");
    });
  },

  async DeleteSubCategory(id) {
    return await api.delete(`/deletesubcategory/${id}`).then((res) => {
      notification.toast("Successfully Deleted", "success");
    });
  },
};











