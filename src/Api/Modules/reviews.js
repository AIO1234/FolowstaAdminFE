import { api } from "../index";
import notification from "@/ApiConstance/toast";

export default {
  async AllReviews() {
    return await api.get("/reviews");
  },
  async DeleteReview(id) {
    return await api.delete(`/deletereview/${id}`).then(() => {
      notification.toast("Successfully Deleted", "success");
      window.location.href = "/reviews";
    });
  },
};
