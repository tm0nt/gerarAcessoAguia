<template>
  <div>
    <v-card
      v-for="(codigo, index) in codigos"
      :key="index"
      :class="{ 'expired-card': isExpirado(codigo.dataExpiracao) }"
    >
      <v-card-text>
        Código de acesso: {{ codigo.codigo }} Criado em:
        {{ codigo.dataCriacao }} Expira em: {{ codigo.dataExpiracao }}
        <v-btn @click="removerCodigo(codigo.id)" color="error">Remover</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return {
      codigos: [],
    };
  },
  created() {
    // Carregar os códigos do Firebase na inicialização do componente
    this.carregarCodigos();
  },
  methods: {
    carregarCodigos() {
      const db = firebase.firestore();
      db.collection("codigos").onSnapshot((snapshot) => {
        this.codigos = [];
        snapshot.forEach((doc) => {
          this.codigos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    },
    removerCodigo(id) {
      const db = firebase.firestore();
      db.collection("codigos").doc(id).delete();
    },
    isExpirado(dataExpiracao) {
      const dataExpiracaoTimestamp = new Date(dataExpiracao).getTime();
      const hojeTimestamp = new Date().getTime();
      return hojeTimestamp > dataExpiracaoTimestamp;
    },
  },
};
</script>

<style>
.expired-card {
  background-color: #ffdddd;
}
</style>
