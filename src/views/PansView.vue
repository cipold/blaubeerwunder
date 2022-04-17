<template>
  <div>
    <img alt="ingredients" src="../assets/pan.svg" class="header-image" />
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
            <h4 class="part d-inline mr-4 mb-0">{{ pan.label }}</h4>
            <div class="align-self-center mr-2">
              <span class="text-muted">
                <BIconSlashCircle></BIconSlashCircle> {{ pan.diameter }} cm
              </span>
              <span class="text-muted ml-1">
                <BIconChevronExpand></BIconChevronExpand> {{ pan.height }} cm
              </span>
            </div>
            <b-link
              class="text-muted ml-auto align-self-center"
              v-if="pans.length > 1"
              @click="removePan(index)"
              title="Form entfernen"
            >
              <BIconTrash></BIconTrash>
            </b-link>
          </div>
          <b-row class="my-1">
            <b-col cols="3">
              <label :for="`name-${index}`">Name:</label>
            </b-col>
            <b-col cols="9">
              <b-input
                :id="`name-${index}`"
                type="text"
                v-model="pan.label"
                size="sm"
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col cols="3">
              <label :for="`diameter-${index}`">Breite:</label>
            </b-col>
            <b-col cols="9">
              <b-input-group append="cm" size="sm">
                <b-input
                  :id="`diameter-${index}`"
                  type="number"
                  v-model="pan.diameter"
                ></b-input>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col cols="3">
              <label :for="`height-${index}`">Höhe:</label>
            </b-col>
            <b-col cols="9">
              <b-input-group :id="`height-${index}`" append="cm" size="sm">
                <b-input type="number" v-model="pan.height"></b-input>
              </b-input-group>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-card-footer>
        <b-link class="text-muted small" @click="newPan">
          <BIconPlusCircle></BIconPlusCircle> weitere Form hinzufügen
        </b-link>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PansView",
  computed: {
    ...mapGetters(["pans"]),
  },
  methods: {
    ...mapActions(["newPan", "removePan"]),
  },
};
</script>
