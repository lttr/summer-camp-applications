<template>
  <PageWithBar>
    <div class="container has-text-centered">
      <h1 class="title">Nová akce - {{ eventName }}</h1>
    </div>
    <section class="section" v-if="isAdmin">
      <div class="columns">
        <div class="column">
          <form>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="event-name">název</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="event-name" type="text" v-model="eventName" class="input is-large" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="titulek">titulek</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="titulek" type="text" v-model="params.titulek" class="input" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="podtitulek">podtitulek</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="podtitulek" type="text" v-model="params.podtitulek" class="input" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="termin">termin</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="termin" type="text" v-model="params.termin" class="input" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="cena">cena</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="cena" type="number" v-model.number="params.cena" class="input" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="uvodniText">uvodniText</label></div>
              <div class="field-body">
                <div class="control">
                  <textarea
                    id="uvodniText"
                    v-model="params.uvodniText"
                    class="textarea"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="slevaSourozenci">slevaSourozenci</label>
              </div>
              <div class="field-body">
                <div class="control">
                  <input
                    id="slevaSourozenci"
                    type="number"
                    v-model.number="params.slevaSourozenci"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="slevaClenOddilu">slevaClenOddilu</label>
              </div>
              <div class="field-body">
                <div class="control">
                  <input
                    id="slevaClenOddilu"
                    type="number"
                    v-model.number="params.slevaClenOddilu"
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal"><label for="vudce">vudce</label></div>
              <div class="field-body">
                <div class="control">
                  <input id="vudce" type="text" v-model="params.vudce" class="input" />
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <!-- Left empty for spacing -->
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" @click.prevent="saveParams()">Uložit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <transition name="fade">
        <div v-if="successfullySaved" class="notification is-light">Uloženo</div>
      </transition>
    </section>
    <section class="section" v-else>
      <div class="columns is-centered">Musíš být admin abys viděl tento obsah</div>
    </section>
  </PageWithBar>
</template>

<script>
import PageWithBar from '../layouts/PageWithBar.vue'
import { db } from '../firebase'
import { authState } from '../auth'
import { defaultEventParameters } from '../config/defaultEventParameters'

export default {
  name: 'NewEvent',
  components: {
    PageWithBar,
  },
  data() {
    return {
      isAdmin: authState.isAdmin,
      eventName: `Tábor ${new Date().getFullYear()}`,
      eventParameters: {},
      params: {},
      successfullySaved: false,
    }
  },
  methods: {
    saveParams: function () {
      db.collection('events')
        .add({
          name: this.eventName,
          parameters: this.params,
        })
        .then(() => {
          this.successfullySaved = true
          setTimeout(() => {
            this.successfullySaved = false
          }, 5000)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
  },
  mounted: function () {
    this.params = { ...defaultEventParameters, ...this.eventParameters }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
