<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <b-card>
        <b-card-title>
          <b-row>
            <b-col lg="6">
              <h2>{{ item.name }}</h2>
            </b-col>
            <b-col lg="6">
              <div class="text-right">
                <b-button variant="danger" @click="deleteCategory(item.id)">
                  <feather-icon icon="DeleteIcon" class="mr-25"
                /></b-button>
              </div>
            </b-col>
          </b-row>
        </b-card-title>
        <div class="pt-3"></div>

        <div v-if="item.subcategory.length === 0">
          <center>
            <b-card
              ><span class="text-danger font-bold"
                ><b>No Data Available</b></span
              >
            </b-card>
          </center>
        </div>
        <b-table
          v-else
          sticky-header=""
          responsive="sm"
          :items="item.subcategory"
          :fields="fields"
        >
          <template #cell(action)="data">
            <b-row>
              <b-col md="auto">
                <b-button variant="success" @click="openUpdateModal(data.item)">
                  <feather-icon icon="EditIcon" class="mr-25"
                /></b-button>
              </b-col>
              <b-col md="auto">
                <b-button
                  variant="danger"
                  @click="deleteSubCategory(data.item.id)"
                >
                  <feather-icon icon="DeleteIcon" class="mr-25"
                /></b-button>
              </b-col>
            </b-row>
          </template>
        </b-table>
      </b-card>
      <b-modal
        ref="updatemodal"
        v-model="show"
        hide-footer
        title="Update Sub Category"
      >
        <UpdateSubCategory :subcategorydata="selectedItem" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  BModal,
  BCard,
  BTable,
  BBadge,
  BButton,
  BCol,
  BRow,
  BCardText,
  BAvatar,
  BLink,
  BContainer,
} from "bootstrap-vue";
import categoryApi from "@/Api/Modules/category";
import UpdateSubCategory from "@/views/Category/Components/UpdateSubCategory";

import subcategoryApi from "@/Api/Modules/subcategory";

export default {
  name: "InstergramService",
  components: {
    BCard,
    BModal,
    UpdateSubCategory,
    BButton,
    BCol,
    BBadge,
    BAvatar,
    BTable,
    BRow,
    BContainer,
    BCardText,
    BLink,
  },
  data() {
    return {
      show: false,
      selectedItem: {},
      fields: [
        {
          key: "reference",
          label: "Reference",
          sortable: true,
          // thStyle: { width: "2%" },
          // tdClass: "custom-cell-padding",
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          // thStyle: { width: "2%" },
          // tdClass: "custom-cell-padding",
        },

        {
          key: "type",
          label: "Type",
          sortable: true,
          // thStyle: { width: "2%" },
          // tdClass: "custom-cell-padding",
        },

        {
          key: "action",
          label: "Action",
          sortable: true,
          // thStyle: { width: "2%" },
          // tdClass: "custom-cell-padding",
        },
      ],
      items: [],
    };
  },
  async created() {
    await this.AllCategories();
  },

  methods: {
    setCellPadding(value, key, item) {
      // Add a custom class to table cells based on your requirements
      return "custom-cell-padding";
    },
    async AllCategories() {
      await this.$vs.loading({
        scale: 0.8,
      });
      const res = await categoryApi.AllCategories().catch(() => {
        this.$vs.loading.close();
      });
      this.items = res.data.data;
      this.$vs.loading.close();
    },

    async deleteSubCategory(id) {
      await this.$vs.loading({
        scale: 0.8,
      });
      await subcategoryApi
        .DeleteSubCategory(id)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    openUpdateModal(item) {
      this.selectedItem = item;
      this.show = true;
    },

    async deleteCategory(id) {
      await this.$vs.loading({
        scale: 0.8,
      });
      await categoryApi.DeleteCategory(id);

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
