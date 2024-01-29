<template>
  <div>
    <div v-if="!emitData.nextclicked">
      <b-card>
        <b-form @submit.prevent>
          <validation-observer ref="CategoryValidation">
            <b-row>
              <b-col md="12" class="mb-1">
                <b-form-group label="Service Category">
                  <validation-Provider
                    name="Category Name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <b-form-input
                      placeholder="Service Category"
                      v-model="form.name"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </validation-Provider>
                </b-form-group>
              </b-col>

              <b-col md="12" class="mb-1">
                <b-form-group label="Service Icon">
                  <validation-Provider
                    name="Category Icon"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <b-form-file v-model="file"></b-form-file>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </validation-Provider>
                </b-form-group>
              </b-col>

              <b-col md="12" class="mb-1">
                <b-form-group label="Service Color Code">
                  <validation-Provider
                    name="Category Color Code"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <b-form-input
                      placeholder="Service Color Code"
                      v-model="form.color_code"
                    ></b-form-input>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </validation-Provider>
                </b-form-group>
              </b-col>

              <b-col md="12" class="mb-1 text-center">
                <b-button variant="primary" @click="save()" type="submit">
                  Save and Continue &nbsp;
                  <span class="mt-4"> <i class="bi bi-arrow-right"></i></span
                ></b-button>
              </b-col>
            </b-row>
          </validation-observer>
        </b-form>
      </b-card>
    </div>

    <div v-else-if="emitData.nextclicked">
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
                <b-row
                  v-for="(item, index) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >
                  <!-- Category Name -->
                  <b-col md="4">
                    <b-form-group
                      label="Category name"
                      label-for="item-name"
                      label-class="h6"
                    >
                      <b-form-input
                        id="item-name"
                        type="text"
                        readonly
                        v-model="form.name"
                        placeholder="Sub Category Name"
                      />
                    </b-form-group>
                  </b-col>

                  <!-- Sub Category Name -->
                  <b-col md="4">
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
                          v-model="item.name"
                          @input="() => (item.category_id = category_id)"
                          placeholder="Sub Category Name"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-Provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="4">
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
                        <b-form-file @change="handleImageUpload(index)" v-model="file1"/>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-Provider>
                    </b-form-group>
                  </b-col>

                  <b-col md="4">
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
                            v-model="item.type"
                            checked
                            name="some-radios"
                            value="main"
                            >Main</b-form-radio
                          >

                          <b-form-radio
                            v-model="item.type"
                            checked
                            name="some-radios"
                            value="other"
                            >Other</b-form-radio
                          >
                        </div>
                        <br />
                        <span v-if="item.type">
                          Selected Type :
                          <b class="text-danger">{{ item.type }}</b></span
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
                  <b-col lg="2" md="3" class="mb-50">
                    <b-button
                      variant="outline-danger"
                      class="mt-0 mt-md-2"
                      @click="removeItem(index)"
                    >
                      <feather-icon icon="XIcon" class="mr-25" />
                      <span>Delete</span>
                    </b-button>
                  </b-col>
                  <b-col cols="12">
                    <hr />
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>

          <div class="desktop_view_category_add">
            <b-row>
              <b-col md="8" cols="8">
                <b-button variant="primary" @click="repeateAgain">
                  <feather-icon icon="PlusIcon" class="mr-25" />
                  <span>Add New</span>
                </b-button>
              </b-col>

              <b-col md="4" cols="4" class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  @click="validationSubCategoryForm()"
                >
                  <span>Submit</span>
                </b-button>
              </b-col>
            </b-row>
          </div>

          <div class="mobile_view_category_add">
            <b-row>
              <b-col md="6">
                <b-button variant="primary" block @click="repeateAgain">
                  <feather-icon icon="PlusIcon" class="mr-25" />
                  <span>Add New</span>
                </b-button>
              </b-col>
              <br /><br />
              <b-col md="6">
                <b-button
                  variant="primary"
                  block
                  @click="validationSubCategoryForm()"
                >
                  <span>Submit</span>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-card>
    </div>
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
import categoryApi from "@/Api/Modules/category";
import { api } from "@/Api/index";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import notification from "@/ApiConstance/toast";

export default {
  name: "AddCategory",
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
      file1:'',
      category_id: "",
      emitData: {
        nextclicked: false,
      },
      items: [
        {
          id: 1,
          name: "",
          category_id: "",
          type: "",
          image:'',
        },
      ],
      nextTodoId: 2,
    };
  },

  methods: {
    async save() {
      if (await this.$refs.CategoryValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        let form = new FormData();
        form.append("name", this.form.name);
        form.append("icon", this.file);
        form.append("color_code", this.form.color_code);
        console.log(form);
        await api
          .post("/addcategory", form)
          .then((res) => {
            notification.toast("Successfully Added", "success");
            this.$vs.loading.close();
            this.category_id = res.data.data.id;
            this.emitData.nextclicked = true;
          })
          .catch((res) => {
            this.$vs.loading.close();
          });
      }
    },
    repeateAgain() {
      this.items.push({
        id: (this.nextTodoId += this.nextTodoId),
        name: "",
        category_id: this.category_id,
        type: "",
        image: '',
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    handleImageUpload(index) {
      const file = event.target.files[0];
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.items[index].image = reader.result;
        console.log(this.items[index].image);
      };
     
    },
    async validationSubCategoryForm() {
      
      this.form1.items = this.items;
      if (await this.$refs.SubCategoryValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        await categoryApi
          .AddSubCategory(this.form1)
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
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
.repeater-form {
  overflow: hidden;
  transition: 0.35s height;
}
</style>
