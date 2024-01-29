<template>
  <div>
    <br />
    <div>
      <portal-target name="category" />
    </div>
    <br /><br />
    <CateoryTable />
  </div>
</template>

<script>
import CateoryTable from "./Components/CategoryTable.vue";

export default {
  name: "category",
  components: {
    CateoryTable,
  },
};
</script>
