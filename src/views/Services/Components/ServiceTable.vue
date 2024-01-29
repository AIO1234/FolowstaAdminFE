<template>
  <div>
    <b-card>
      <b-form-group
        label="Select a Social Networking Service"
        label-class="text-danger font-weight-bold"
      >
        <v-select
          v-model="selected"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="name"
          @input="() => (subcategories = selected.subcategory)"
          :options="options"
        />
      </b-form-group>
    </b-card>

    <div v-for="item in subcategories" :key="item.id">
      <b-card :title="item.name">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Reference</th>
                <th scope="col">High Quality</th>
                <th scope="col">Low Quality</th>
                <th scope="col">Duration</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody v-for="service in selected.service" :key="service.id">
              <tr v-if="service.subcategory_id == item.id">
                <td>{{ service.reference }}</td>
                <td>
                  <span class="text-danger font-weight-bold">Price</span>
                  : {{ service.high_quality.price }} <br /><span
                    class="text-danger font-weight-bold"
                    >Quantity
                  </span>
                  : {{ service.high_quality.quantity }}
                </td>
                <td>
                  <span class="text-danger font-weight-bold">Price</span>
                  : {{ service.real_quality.price }} <br /><span
                    class="text-danger font-weight-bold"
                    >Quantity
                  </span>
                  : {{ service.real_quality.quantity }}
                </td>
                <td>{{ service.duration }} Hours</td>
                <div class="mt-1">
                  <b-row>
                    <b-col md="4" cols="7">
                      <b-button
                        variant="success"
                        @click="openUpdateModal(service)"
                        >Edit</b-button
                      ></b-col
                    >

                    <b-col md="4" cols="5">
                      <b-button
                        variant="danger"
                        @click="deleteService(service.id)"
                        >Delete</b-button
                      ></b-col
                    >
                  </b-row>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </b-card>
      <b-modal ref="updatemodal" v-model="show" hide-footer title="Update Service" >
        <UpdateService :serviceydata="selectedItem" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import UpdateService from "@/views/Services/Components/UpdateService";
import {
  BCard,
  BModal,
  BTable,
  BBadge,
  BButton,
  BCol,
  BRow,
  BCardText,
  BLink,
  BContainer,
  BFormGroup,
} from "bootstrap-vue";
import categoryApi from "@/Api/Modules/category";
import serviceApi from "@/Api/Modules/servcices";

export default {
  name: "InstergramService",
  components: {
    BCard,
    BButton,
    UpdateService,
    BModal,
    BCol,
    BBadge,
    BTable,
    BRow,
    BContainer,
    BCardText,
    BLink,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      show: false,
      selected: "Select a Service",
      options: [],
      selectedItem: {},
      subcategories: [],
      items: [],
      services: [],
    };
  },
  computed: {
    selectedRows() {
      return "hay";
    },
  },

  async mounted() {
    await this.AllCategories();
  },
  methods: {
    openUpdateModal(item) {
      this.selectedItem = item;
      this.show = true;
    },
    setCellPadding(value, key, item) {
      // Add a custom class to table cells based on your requirements
      return "custom-cell-padding";
    },
    async AllCategories() {
      await this.$vs.loading({
        scale: 0.8,
      });
      const res = await categoryApi.AllCategories();
      this.options = res.data.data;
      this.$vs.loading.close();
    },
    async deleteService(id) {
      await this.$vs.loading({
        scale: 0.8,
      });
      await serviceApi
        .DeleteService(id)
        .then(() => {
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
  },
};
</script>

<style>
.custom-cell-padding {
  height: 70px; /* Set your desired padding value */
}
</style>
