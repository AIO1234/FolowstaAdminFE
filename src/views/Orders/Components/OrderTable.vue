<template>
  <div>
    <br />
    <b-card :title="type">
      <b-table responsive="sm" :items="orderarray" :fields="fields" sticky-header="">
        <template #cell(created_at)="data">
          {{ momentFormat(data.value, "YYYY-MM-DD HH:mm:ss A") }}
        </template>

        <template #cell(user)="data">
          <b>{{ data.value.firstname + " " + data.value.lastname }}</b>
          <br />
          <br />
          <ul style="list-style-type: square">
            <li>Email : {{ data.value.email }}</li>
          </ul>
        </template>

        <template #cell(order_details)="data">
          <b>{{ data.value.category }} {{ data.value.subcategory }}</b>
          <br />
          <br />
          <ul style="list-style-type: square">
            <li>Quantity : {{ data.value.quantity }}</li>
            <li>Price : {{ getPrice(data.value.price) }}</li>
            <li>Quality : {{ data.value.quality }}</li>
            <li v-if="data.value.quality === 'Instant'">
              Post Url : {{ data.value.post_link }}
            </li>
            <li v-if="data.value.quality != 'Instant'">
              Requested Link : {{ data.value.link }}
            </li>
          </ul>
        </template>
        <template #cell(status)="data">
          <b-badge variant="warning">{{ data.value }}</b-badge>
        </template>
        <template #cell(action)="data">
          <b-button variant="success" @click="openStatusModal(data.item)">
            Change Status</b-button
          >
          <!-- <b-row>
            <b-col md="6">
              <b-button variant="success">
                <feather-icon icon="EditIcon" class="mr-25"
              /></b-button>
            </b-col>
            <b-col md="6">
              <b-button variant="danger">
                <feather-icon icon="DeleteIcon" class="mr-25"
              /></b-button>
            </b-col>
          </b-row> -->
        </template>
      </b-table>
    </b-card>

    <b-modal ref="ordermodal" hide-footer title="Change Status">
      <div>
        <ChangeStatus :orderdata="selectedItem" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import ChangeStatus from "@/views/Orders/Components/ChangeStatus";
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
import orderApi from "@/Api/Modules/orders";

export default {
  name: "InstergramService",
  components: {
    BTab,
    BTabs,
    ChangeStatus,
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
      selectedItem: {},
      orderarray: [],
      pendingOrders: [],
      processingOrders: [],
      completedOrders: [],
      fields: [
        {
          key: "reference",
          label: "Reference",
          sortable: true,
        },

        {
          key: "user",
          label: "Requested User Details",
          sortable: true,
        },
        // {
        //   key: "customer",
        //   label: "Customer",
        //   sortable: true,
        //   // thStyle: { width: "2%" },
        //   // tdClass: "custom-cell-padding",
        // },
        {
          key: "order_details",
          label: "Order Info",
          sortable: true,
          // thStyle: { width: "5%" },
          // tdClass: "custom-cell-padding",
        },
        {
          key: "created_at",
          label: "Created Date",
        },
        {
          key: "status",
          label: "Status",
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
    await this.allOrders();
  },
  computed: {
    pendingArray() {
      const selectedata = this.items.filter((value) => {
        return value.status == "Pending";
      });
      return selectedata;
    },
    progressArray() {
      const selectedata = this.items.filter((value) => {
        return value.status == "In Progress";
      });
      return selectedata;
    },
    completedArray() {
      const selectedata = this.items.filter((value) => {
        return value.status == "Completed";
      });
      return selectedata;
    },
  },
  methods: {
    setCellPadding(value, key, item) {
      // Add a custom class to table cells based on your requirements
      return "custom-cell-padding";
    },

    openStatusModal(data) {
      this.$refs.ordermodal.show();
      this.selectedItem = data;
    },

    async allOrders() {
      // get all order data
      await this.$vs.loading({
        scale: 0.8,
      });
      const res = await orderApi.Allorders();
      this.items = res.data.data;

      // store data to pending orders array

      if (this.titleProp === "Pending") {
        this.orderarray = this.pendingArray;
      }

      // store data to processing orders array

      if (this.titleProp === "In Progress") {
        this.orderarray = this.progressArray;
      }

      // store data to completed orders array

      if (this.titleProp === "Completed") {
        this.orderarray = this.completedArray;
      }
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
