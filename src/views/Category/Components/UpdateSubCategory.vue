<template>
  <div>
    <b-card>
      <div>
        <div>
          <validation-observer ref="SubCategoryValidation">
            <b-form
              ref="form"
              class="repeater-form"
              @submit.prevent="repeateAgain"
            >
              <!-- Row Loop -->
              <b-row>
                <!-- Category Name -->

                <!-- Sub Category Name -->
                <b-col lg="12">
                  <b-form-group
                    label="Sub Category name"
                    label-class="h6"
                    label-for="item-name"
                  >
                    <validation-Provider
                      name="Sub Category name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        id="item-name"
                        type="text"
                        v-model="form.name"
                        placeholder="Sub Category Name"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-Provider>
                  </b-form-group>
                </b-col>

                <b-col lg="12">
                  <b-form-group
                    label="Sub Category Image"
                    label-class="h6"
                    label-for="item-name"
                  >
                    <validation-Provider
                      name="Sub Category Image"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <b-form-file
                        @change="handleImageUpload(index)"
                        v-model="file1"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-Provider>
                  </b-form-group>
                </b-col>

                <b-col lg="12">
                  <b-form-group
                    label="Sub Category Type"
                    label-class="h6"
                    label-for="item-name"
                  >
                    <validation-Provider
                      name="Sub Category Type"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="d-flex justify-content-around mt-1">
                        <b-form-radio
                          v-model="form.type"
                          checked
                          name="some-radios"
                          value="main"
                          >Main</b-form-radio
                        >

                        <b-form-radio
                          v-model="form.type"
                          checked
                          name="some-radios"
                          value="other"
                          >Other</b-form-radio
                        >
                      </div>
                      <br />
                      <span v-if="form.type">
                        Selected Type :
                        <b class="text-danger">{{ form.type }}</b></span
                      >
                      <span v-else>
                        <b class="text-danger">Type is reuired</b></span
                      >
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-Provider>
                  </b-form-group>
                </b-col>

                <!-- <input
                    hidden
                    id="item-category_id"
                    type="number"
                    :value="category_id"
                   
                  /> -->
                <!-- Remove Button -->
                <br /><br />
                <b-col lg="12">
                  <b-button
                    variant="primary"
                    block
                    @click="validationSubCategoryForm()"
                  >
                    <span>Update</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  BFormRadio,
  BFormGroup,
  BInputGroup,
  BFormTextarea,
  BForm,
  BTable,
  BBadge,
  BButton,
  BCol,
  BRow,
  BFormFile,
  BCardText,
  BLink,
  BFormInput,
  BContainer,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import subcategoryApi from "@/Api/Modules/subcategory";
export default {
  components: {
    BCard,
    BFormRadio,
    BFormFile,
    BForm,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
    BFormTextarea,
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
      file: [],
      form1: {},
      file1: "",
      category_id: "",
      emitData: {
        nextclicked: false,
      },
    };
  },
  props: {
    subcategorydata: Object,
  },
  async created() {
    await this.$vs.loading({
      scale: 0.8,
    });
    this.form = await this.subcategorydata;
    console.log(this.form);
    this.$vs.loading.close();
  },
  methods: {
    async validationSubCategoryForm() {
      if (await this.$refs.SubCategoryValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        await subcategoryApi.UpdateSubCategory(this.form.id, this.form);
      }
    },

    handleImageUpload(index) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.image = reader.result;
      };
    },
  },
};
</script>
