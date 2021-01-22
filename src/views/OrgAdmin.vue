<template>
  <PageWithBar>
    <div class="container has-text-centered">
      <h1 class="title">Evidované akce</h1>
    </div>
    <section class="section" v-if="isAdmin">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <table class="table is-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>název</th>
                <th>přihláška</th>
                <th colspan="2">administrace</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.id">
                <td>
                  {{ event.id }}
                </td>
                <td>
                  {{ event.name }}
                </td>
                <td>
                  <router-link :to="{ name: 'Application', params: { event: event.id } }">
                    přihláška
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ name: 'CampParameters', params: { event: event.id } }">
                    parametry
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ name: 'CampAdmin', params: { event: event.id } }">
                    výpis přihlášek
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <router-link :to="{ name: 'NewEvent' }" class="button is-light">
            Založit novou
          </router-link>
        </div>
      </div>
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

export default {
  name: 'OrgAdmin',
  components: {
    PageWithBar,
  },
  data() {
    return {
      events: [],
      isAdmin: authState.isAdmin,
    }
  },
  mounted() {
    db.collection('events')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.events.push({
            id: doc.id,
            name: doc.data().name,
          })
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
</script>
<style></style>
