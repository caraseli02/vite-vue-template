<template>
  <section class="mt-2 p-2 flex justify-center items-center flex-col">
    <h1 class="text-center my-4 mx-8 text-xs text-secondary font-bold">
      SI HAS OLVIDADO TU CONTRASEÑA, PROPORCIONA TU DIRECCIÓN DE CORREO ELECTRÓNICO Y TE
      ENVIAREMOS UN EMAIL CON INSTRUCCIONES DE CÓMO RECUPERARLA.
    </h1>
    <article class="p-5 mx-auto">
      <transition name="fade">
        <p
          v-if="state.error"
          class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
        >
          {{ state.error }}
        </p>
      </transition>
      <form @submit.prevent>
        <div class="mb-4">
          <label for="email" class="font-bold text-secondary pb-1">Email</label>
          <input
            id="emailForgot"
            v-model="state.email"
            type="email"
            placeholder="apimosa@apimosa.es"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <PrimaryBtn type="submit" @click="sendEmail">
            <transition name="fade" mode="out-in">
              <span v-if="!state.emailSending">Enviar</span>
              <span v-else>Sending...</span>
            </transition>
          </PrimaryBtn>
        </div>
      </form>
    </article>
    <slot />
  </section>
</template>

<script setup lang="ts">
// import Swal from "sweetalert2";

// const emit = defineEmits<{ (e: "closePopUp", value: boolean): void }>();

const state = $ref({
  email: "",
  error: "",
  emailSending: false,
});

const sendEmail = async () => {
  if (!state.email) {
    state.error = "Por favor, escriba una dirección de correo electrónico válida.";
    return;
  }
  state.error = "";
  state.emailSending = true;
  // await store
  //   .dispatch("auth/resetPassword", state.email)
  //   .then(() => {
  //     state.emailSending = false;
  //     emit("closePopUp", false);
  //     Swal.fire("Enviado", "Comprueba tu dirección de email", "info");
  //   })
  //   .catch((error: { message: string }) => {
  //     state.emailSending = false;
  //     state.error = error.message;
  //   });
};
</script>
