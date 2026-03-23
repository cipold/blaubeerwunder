<template>
  <div>
    <PageIntro :image="panIcon">
      Passe die Größen deiner Formen an<br />
      und füge weitere Formen hinzu.
    </PageIntro>

    <ContentDivider />

    <div class="card">
      <div class="list-group list-group-flush">
        <div class="list-group-item" v-for="(pan, index) in pans" :key="`pan-${index}`">
          <div
            class="d-flex align-items-center flex-grow-1 cursor-pointer"
            data-bs-toggle="collapse"
            :data-bs-target="`#pan-${index}`"
          >
            <PanLine :pan="pan" class="flex-grow-1" />
          </div>

          <div :id="`pan-${index}`" class="collapse" data-bs-parent=".list-group">
            <div class="pt-2 mx-1">
              <div class="row my-1 align-items-center">
                <div class="col-3">
                  <label :for="`name-${index}`" class="col-form-label-sm">Name:</label>
                </div>
                <div class="col-9">
                  <input
                    :id="`name-${index}`"
                    type="text"
                    :value="pan.label"
                    class="form-control form-control-sm"
                    @input="input(index, 'label', $event.target.value)"
                  />
                </div>
              </div>
              <div class="row my-1 align-items-center">
                <div class="col-3">
                  <label :for="`diameter-${index}`" class="col-form-label-sm">Breite:</label>
                </div>
                <div class="col-9">
                  <div class="input-group input-group-sm">
                    <input
                      :id="`diameter-${index}`"
                      type="number"
                      class="form-control"
                      :value="pan.diameter"
                      @input="input(index, 'diameter', parseFloat($event.target.value))"
                    />
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
              <div class="row my-1 align-items-center">
                <div class="col-3">
                  <label :for="`height-${index}`" class="col-form-label-sm">Höhe:</label>
                </div>
                <div class="col-9">
                  <div class="input-group input-group-sm">
                    <input
                      :id="`height-${index}`"
                      type="number"
                      class="form-control"
                      :value="pan.height"
                      @input="input(index, 'height', parseFloat($event.target.value))"
                    />
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
              <div class="text-end mt-2">
                <button
                  type="button"
                  class="btn btn-link btn-sm text-muted p-0 text-decoration-none"
                  v-if="pans.length > 1"
                  @click="remove(index)"
                  title="Form entfernen"
                >
                  <i class="bi bi-trash me-1"></i>entfernen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex flex-wrap">
        <button
          type="button"
          class="btn btn-link btn-sm text-muted p-0 me-3 flex-grow-1 text-start text-decoration-none"
          @click="add"
        >
          <i class="bi bi-plus-circle me-1"></i>Form hinzufügen
        </button>
        <button
          type="button"
          class="btn btn-link btn-sm text-muted p-0 text-decoration-none"
          @click="reset()"
        >
          <i class="bi bi-x-circle me-1"></i>alle zurücksetzen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePansStore } from '@/stores/pans'
import PanLine from '@/components/PanLine.vue'
import panIcon from '@/assets/icons/pan.svg'

const pansStore = usePansStore()
const pans = computed(() => pansStore.pans)

function add() {
  pansStore.add()
}

function remove(index) {
  pansStore.remove(index)
}

function input(index, key, value) {
  pansStore.update({ index, key, value })
}

function reset() {
  pansStore.reset()
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
