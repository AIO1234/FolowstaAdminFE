<template>
  <div>
    <div>
      <b-tabs align="right">
        <b-tab title="Pending">
          <OrderTable type="Pending Orders" titleProp="Pending" />
        </b-tab>
        <b-tab title="In Progress">
          <OrderTable type="Processing Orders" titleProp="In Progress" />
        </b-tab>
        <b-tab title="Completed">
          <OrderTable type="Completed Orders" titleProp="Completed" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { BTab, BTabs } from "bootstrap-vue";
import OrderTable from "@/views/Orders/Components/OrderTable.vue";

export default {
  name: "InstergramService",
  components: {
    BTab,
    BTabs,
    OrderTable,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
