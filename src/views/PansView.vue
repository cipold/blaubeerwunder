<template>
  <div>
    <img alt="ingredients" src="../assets/icons/pan.svg" class="header-image" />
    <p class="mb-3 text-center">
      <em>
        Stelle hier ein, welche größe deine Formen haben und füge weitere Formen
        hinzu.
      </em>
    </p>

    <div class="divider"></div>

    <b-card no-body class="mb-4">
      <b-list-group flush>
        <b-list-group-item v-for="(pan, index) in pans" :key="`pan-${index}`">
          <div class="mb-3 d-flex flex-wrap">
            <p class="h4 part d-inline mr-4 mb-0">{{ pan.label }}</p>
            <div class="align-self-center mr-2">
              <span class="text-muted small">
                <BIconSlashCircle></BIconSlashCircle> {{ pan.diameter }} cm
              </span>
              <span class="text-muted ml-1 small">
                <BIconChevronExpand></BIconChevronExpand> {{ pan.height }} cm
              </span>
            </div>
            <b-link
              class="text-muted ml-auto align-self-center"
              v-if="pans.length > 1"
              @click="remove(index)"
              title="Form entfernen"
            >
              <BIconTrash></BIconTrash>
            </b-link>
          </div>
          <b-row class="my-1">
            <b-col cols="3">
              <label>Name:</label>
            </b-col>
            <b-col cols="9">
              <b-input
                :id="`name-${index}`"
                type="text"
                :value="pan.label"
                size="sm"
                @input="input(index, 'label', $event)"
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col cols="3">
              <label>Breite:</label>
            </b-col>
            <b-col cols="9">
              <b-input-group append="cm" size="sm">
                <b-input
                  :id="`diameter-${index}`"
                  type="number"
                  @input="input(index, 'diameter', $event)"
                  :value="pan.diameter"
                ></b-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col cols="3">
              <label>Höhe:</label>
            </b-col>
            <b-col cols="9">
              <b-input-group :id="`height-${index}`" append="cm" size="sm">
                <b-input
                  type="number"
                  :value="pan.height"
                  @input="input(index, 'height', $event)"
                ></b-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-card-footer>
        <b-link class="text-muted small" @click="add">
          <BIconPlusCircle></BIconPlusCircle>
          weitere Form hinzufügen
        </b-link>
      </b-card-footer>
    </b-card>
    <div class="d-flex">
      <b-link class="ml-auto text-muted small" @click="reset()">
        Zurücksetzen
      </b-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PansView",
  metaInfo: {
    title: "Formen",
  },
  computed: {
    ...mapState("pans", ["pans"]),
  },
  methods: {
    ...mapActions("pans", ["add", "remove", "update", "reset"]),
    input(index, key, value) {
      this.update({ index, key, value });
    },
  },
};
</script>
