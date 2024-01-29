<template>
  <div>
    <br />
    <div>
      <portal-target name="service" />
    </div>
    <br /><br />
    <ServiceTable />
  </div>
</template>

<script>
import ServiceTable from "./Components/ServiceTable.vue";

export default {
  name: "service",
  components: {
    ServiceTable,
  },
};
</script>
