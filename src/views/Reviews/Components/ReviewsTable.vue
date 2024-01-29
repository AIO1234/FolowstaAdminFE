<template>
  <div>
    <br />
    <b-card title="All Reviews">
      <b-table sticky-header="" responsive :items="items" :fields="fields">
        <template #cell(created_at)="data">
          {{ momentFormat(data.value, "YYYY-MM-DD HH:mm:ss A") }}
        </template>

        <template #cell(action)="data">
          <b-button variant="danger" @click="deleteReview(data.item.id)">
            <feather-icon icon="DeleteIcon" class="mr-25"
          /></b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTab,
  BModal,
  BTabs,
  BTable,
  BBadge,
  BButton,
  BCol,
  BRow,
  BCardText,
  BLink,
  BContainer,
} from "bootstrap-vue";
import reviewApi from "@/Api/Modules/reviews";

export default {
  components: {
    BTab,
    BTabs,
    BModal,
    BCard,
    BButton,
    BCol,
    BBadge,
    BTable,
    BRow,
    BContainer,
    BCardText,
    BLink,
  },
  props: {
    type: String,
    titleProp: String,
  },
  data() {
    return {
      fields: [
        {
          key: "service",
          label: "Service",
          sortable: true,
          // thStyle: { width: "5%" },
          // tdClass: "custom-cell-padding",
        },
        {
          key: "order_id",
          label: "Order Id",
          sortable: true,
        },
        {
          key: "first_name",
          label: "First name",
          sortable: true,
        },
        {
          key: "last_name",
          label: "Last name",
          sortable: true,
        },
        {
          key: "review",
          label: "Review",
          sortable: true,
        },

        {
          key: "created_at",
          label: "Created Date",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
        },
        {
          key: "action",
          label: "Action",
          sortable: true,
        },
      ],

      items: [],
    };
  },
  async mounted() {
    await this.allReviews();
  },
  methods: {
    async allReviews() {
      // get all order data
      await this.$vs.loading({
        scale: 0.8,
      });
      const res = await reviewApi.AllReviews();
      this.items = res.data.data;

      this.$vs.loading.close();
    },

    async deleteReview(id) {
      await this.$vs.loading({
        scale: 0.8,
      });

       await reviewApi.DeleteReview(id);

      this.$vs.loading.close();
    },
  },
};
</script>

<style>
.custom-cell-padding {
  height: 70px; /* Set your desired padding value */
}
</style>
