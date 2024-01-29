<template>
  <div>
    <b-card>
      <validation-observer ref="AddServiceValidation" v-slot="{ invalid }">
        <b-form @submit.prevent>
          <b-row>
            <b-col md="12" class="mb-1">
              <b-form-group label="Social Networking Service">
                <validation-Provider
                  name="Social Networking Service"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="name"
                    @input="
                      () => (
                        (options1 = selected.subcategory),
                        (selected1 = options1[0])
                      )
                    "
                    :options="options"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-form-group label="Choose a category">
                <validation-Provider
                  name="Category"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    v-model="selected1"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="name"
                    :options="options1"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>
            <!-- 
            <b-col md="12" class="mb-1">
              <b-form-group
                label="Name of Required Feild"
                label-for="basicInput"
              >
                <validation-Provider
                  name="Instergram Username"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    placeholder="Instergram Username"
                    v-model="form.username"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col> -->

            <b-col md="6" class="mb-1">
              <span class="text-danger font-weight-bold"> Real Quality</span>
              <br /><br />
              <b-form-group label="Price" label-for="basicInput">
                <validation-Provider
                  name="Real Quality Price"
                  rules="required|double"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    type="number"
                    step="0.01"
                    v-model="form.real_quality.price"
                    placeholder="Price"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="6" class="mb-1">
              <br /><br />
              <b-form-group label="Quantity" label-for="basicInput">
                <validation-Provider
                  name="Real Quality Quantity"
                  rules="required|integer"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    type="number"
                    v-model="form.real_quality.quantity"
                    placeholder="Quantity"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="6" class="mb-1">
              <span class="text-danger font-weight-bold"> High Quality</span>
              <br /><br />
              <b-form-group label="Price" label-for="basicInput">
                <validation-Provider
                  name="High Quality Price"
                  rules="required|double"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    type="number"
                    step="0.01"
                    v-model="form.high_quality.price"
                    placeholder="Price"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="6" class="mb-1">
              <br /><br />
              <b-form-group label="Quantity" label-for="basicInput">
                <validation-Provider
                  name="High Quality Quantity"
                  rules="required|integer"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    type="number"
                    v-model="form.high_quality.quantity"
                    placeholder="Quantity"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-form-group label="Time Duration" label-for="basicInput">
                <validation-Provider
                  name="Time Duration"
                  rules="required|integer"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    placeholder="Time Duration"
                    v-model="form.duration"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <!-- <b>Page SEO informations</b>
            <br /><br />
            <b-col md="12" class="mb-1">
              <b-form-group label="URL Slug" label-for="basicInput">
                <b-input-group prepend="https://example.com/abc">
                  <validation-Provider
                    name="URL Slug"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <b-form-input
                      id="basicInput"
                      placeholder="buy-real-instergram-folowers"
                      v-model="form.urlslg"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </validation-Provider>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-form-group label="Page Title" label-for="basicInput">
                <validation-Provider
                  name="Page Title"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    placeholder="Buy Instergram Folowers"
                    v-model="form.pagetitle"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-form-group label="Meta Keywords" label-for="basicInput">
                <validation-Provider
                  name="Meta Keywords"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="basicInput"
                    placeholder="Buy Instergram Folowers"
                    v-model="form.metakeywords"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col>

            <b-col md="12" class="mb-1">
              <b-form-group label="Meta Description" label-for="basicInput">
                <validation-Provider
                  name="Meta Description"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-form-textarea
                    id="basicInput"
                    placeholder="Buy Instergram Folowers"
                    v-model="form.metadescription"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-Provider>
              </b-form-group>
            </b-col> -->
            <b-col md="12" class="mb-1">
              <b-button
                variant="primary"
                type="submit"
                @click="validationAddServiceForm()"
                :disabled="invalid"
                >Submit</b-button
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
import categoryApi from "@/Api/Modules/category";

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
      form: {
        high_quality: {},
        real_quality: {},
      },
      selected: "Select a Service",
      options: [],

      selected1: "Select a Category",

      options1: [],
    };
  },
  async mounted() {
    await this.AllCategories();
  },
  methods: {
    async validationAddServiceForm() {
      this.form.category_id = this.selected.id;
      this.form.subcategory_id = this.selected1.id;
      if (await this.$refs.AddServiceValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        await serviceApi
          .AddService(this.form)
          .then(() => {
            this.$vs.loading.close();
          })
          .catch(() => {
            this.$vs.loading.close();
          });
      }
    },
    async AllCategories() {
      const res = await categoryApi.AllCategories();
      this.options = res.data.data;
    },
  },
};
</script>
