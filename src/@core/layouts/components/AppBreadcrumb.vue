<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" md="6">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="6"
    >
      <portal to="service">
        <b-button variant="primary" v-b-modal.modal-service
          >Add Service</b-button
        >
      </portal>
      <portal to="category">
        <b-button variant="primary" v-b-modal.modal-category
          >Add Category</b-button
        >
      </portal>
    </b-col>

    <b-modal
      id="modal-service"
      hide-backdrop
      hide-footer
      size="lg"
      no-close-on-backdrop
      content-class="shadow"
      title="Add Service"
    >
      <AddService />
    </b-modal>

    <b-modal
      id="modal-category"
      hide-backdrop
      hide-footer
      size="lg"
      no-close-on-backdrop
      content-class="shadow"
      title="Add Category"
    >
      <AddCategory />
    </b-modal>
  </b-row>
</template>

<script>
import VBToggle from "bootstrap-vue";
import AddService from "@/views/Services/Components/AddService.vue";
import AddCategory from "@/views/Category/Components/AddCategory.vue";
import {
  BSidebar,
  BImg,
  BBreadcrumb,
  BBreadcrumbItem,
  BModal,
  VBModal,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
    "v-b-toggle": VBToggle,
    "b-modal": VBModal,
  },
  data() {
    return {
      modalTitle: "Add Category",
      emitedData: {},
    };
  },
  components: {
    BImg,
    AddCategory,
    AddService,
    BModal,
    VBModal,
    BBreadcrumb,
    BSidebar,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
