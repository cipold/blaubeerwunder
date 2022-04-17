<template>
  <div>
    <b-card no-body>
      <b-list-group flush>
        <b-list-group-item button v-b-modal.modal-pans>
          <div class="d-flex">
            <h4 class="part d-inline mr-4 mb-0">
              {{ selectedPan.label }}
            </h4>
            <div class="align-self-center ml-auto">
              <span class="text-muted">
                <BIconSlashCircle></BIconSlashCircle>
                {{ selectedPan.diameter }} cm
              </span>
              <span class="text-muted ml-1">
                <BIconChevronExpand></BIconChevronExpand>
                {{ selectedPan.height }} cm
              </span>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-modal
      id="modal-pans"
      centered
      title="BootstrapVue"
      hide-header
      hide-footer
      size="xs"
    >
      <b-card no-body>
        <b-card-header class="d-flex">
          <span class="card-header-title">Formen</span>
          <router-link
            class="text-muted small ml-auto align-self-center"
            to="/pans"
          >
            <BIconPencil class="mr-1"></BIconPencil>
            anpassen
          </router-link>
        </b-card-header>
        <b-list-group flush>
          <b-list-group-item
            v-for="(pan, index) in pans"
            :key="`pan-${index}`"
            button
            @click="
              select(index);
              $bvModal.hide('modal-pans');
            "
          >
            <div class="d-flex">
              <h4 class="part d-inline mr-4 mb-0">{{ pan.label }}</h4>
              <div class="align-self-center ml-auto">
                <span class="text-muted">
                  <BIconSlashCircle></BIconSlashCircle> {{ pan.diameter }} cm
                </span>
                <span class="text-muted ml-1">
                  <BIconChevronExpand></BIconChevronExpand>
                  {{ pan.height }} cm
                </span>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PanSelect",
  computed: {
    ...mapState("pans", ["pans"]),
    ...mapGetters("pans", ["selectedPan"]),
  },
  methods: {
    ...mapActions("pans", ["select"]),
  },
};
</script>

<style>
.modal-body {
  padding: 0 !important;
}

.modal-dialog {
  max-width: 400px;
}
</style>
