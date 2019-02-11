<template>
  <main>
    <h1 class="title">Přihlášky</h1>
  </main>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "OrgAdmin",
  mounted() {
    db.collection("organizations")
      .doc("IOJYDqNsnKbEKvWJZmkG")
      .collection("events")
      .doc("AjvRi94cFhvjYGTyLd5e")
      .collection("applications")
      .get()
      .then(result => {
        result.forEach(item => {
          const p = document.createElement("p");
          p.textContent = `${item.id} => ${item.data().name}`;
          document.body.appendChild(p);
        });
      });
  },
  data() {
    return {
      applications: null
    };
  }
};
</script>
<style scoped></style>