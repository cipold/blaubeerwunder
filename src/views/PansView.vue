<template>
  <div>
    <PageIntro :image="require('@/assets/icons/pan.svg')">
      Passe die Größen deiner Formen an<br />
      und füge weitere Formen hinzu.
    </PageIntro>

    <ContentDivider />

    <b-card no-body>
      <b-list-group flush>
        <b-list-group-item v-for="(pan, index) in pans" :key="`pan-${index}`">
          <div class="d-flex align-items-center">
            <span
              class="text-muted mr-2"
              title="Anpassen"
              v-b-toggle="`pan-${index}`"
            >
              <BIconPencil />
            </span>
            <PanLine :pan="pan" class="flex-grow-1" />
            <b-link
              class="text-muted ml-2"
              v-if="pans.length > 1"
              @click="remove(index)"
              title="Form entfernen"
            >
              <BIconTrash />
            </b-link>
          </div>

          <b-collapse :id="`pan-${index}`" accordion="pans">
            <div class="mt-3">
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
            </div>
          </b-collapse>
        </b-list-group-item>
      </b-list-group>
      <b-card-footer class="d-flex flex-wrap" style="gap: 10px">
        <b-link class="text-muted small flex-grow-1" @click="add">
          <BIconPlusCircle class="mr-1" />Form hinzufügen
        </b-link>
        <b-link class="text-muted small" @click="reset()">
          <BIconXCircle class="mr-1" />alle zurücksetzen
        </b-link>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PanLine from "@/components/PanLine";

export default {
  name: "PansView",
  metaInfo: {
    title: "Formen",
  },
  components: {
    PanLine,
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
