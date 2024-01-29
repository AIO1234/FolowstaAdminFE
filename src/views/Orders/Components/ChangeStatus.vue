<template>
  <div>
    <b-card>
      <validation-observer ref="UpdateStatusValidation" v-slot="{ invalid }">
        <b-form @submit.prevent>
          <b-row>
            <b-col md="12" class="mb-1">
              <b-form-group label="Order Status">
                <validation-Provider
                  name="Order Status"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="status"
                    :options="options"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-button
                variant="primary"
                type="submit"
                @click="UpdateStatusValidation()"
                :disabled="invalid"
                >Change</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  BFormGroup,
  BInputGroup,
  BFormTextarea,
  BTable,
  BBadge,
  BButton,
  BCol,
  BRow,
  BCardText,
  BLink,
  BFormInput,
  BContainer,
  BForm,
} from "bootstrap-vue";
import vSelect from "vue-select";
import serviceApi from "@/Api/Modules/servcices";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import orderApi from "@/Api/Modules/orders";
export default {
  name: "InstergramService",
  components: {
    BCard,
    BForm,
    BFormInput,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    BFormGroup,
    BInputGroup,
    vSelect,
    BButton,
    BCol,
    BBadge,
    BTable,
    BRow,
    BContainer,
    BCardText,
    BLink,
  },
  data() {
    return {
      form: {},
      selected: {},
      options: [
        {
          status: "Pending",
        },
        {
          status: "In Progress",
        },
        {
          status: "Completed",
        },
      ],
    };
  },
  created() {
    this.initializeProps();
  },
  props: {
    orderdata: Object,
  },

  methods: {
    initializeProps() {
      this.selected = this.orderdata;
      console.log(this.selected);
    },
    async UpdateStatusValidation() {
      this.form.id = this.orderdata.id;
      this.form.status = this.selected.status;
      if (await this.$refs.UpdateStatusValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        await orderApi
          .ChangeStatus(this.form)
          .then(() => {
            this.$vs.loading.close();
          })
          .catch(() => {
            this.$vs.loading.close();
          });
      }
    },
  },
};
</script>
