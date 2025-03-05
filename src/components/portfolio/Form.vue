<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="field">
      <label class="labelField" for="name">Name</label>
      <input id="name" v-model="name" type="text" v-bind="nameAttrs"/>
      <span class="errorMessage" v-if="errors['name']">{{errors['name']}}</span>
    </div>

    <div class="field">
      <label class="labelField" for="email">Email</label>
      <input id="email" v-model="email" type="email" v-bind="emailAttrs"/>
      <span class="errorMessage" v-if="errors['email']">{{ errors['email'] }}</span>
    </div>

    <div class="field">
      <label class="labelField" for="message">Message</label>
      <input id="message" v-model="message" type="text" v-bind="messageAttrs"/>
      <span class="errorMessage" v-if="errors['message']">{{ errors['message'] }}</span>
    </div>

    <button class="buttonForm" type="submit">Send</button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

const { serviceId, templateId, publicKey } = defineProps({
  serviceId: String,
  templateId: String,
  publicKey: String
});

// Esquema de validación con Yup
const schema = toTypedSchema(yup.object({
  name: yup.string().min(2, 'Minimum 2 characters required').required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  message: yup.string().min(6, 'Minimum 6 characters required').required('This field is required'),
}));

// Configuración del formulario
const { errors, handleSubmit, defineField, resetForm } = useForm({ validationSchema: schema });

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [message, messageAttrs] = defineField('message');


// Manejar el envío del formulario
const onSubmit = handleSubmit((values) => {
  emailjs
    .send(serviceId, templateId, {
      name: values.name,
      email: values.email,
      message: values.message,
    }, {
      publicKey: publicKey
    })
    .then(
      () => {
        Swal.fire({
          title: 'Success',
          text: 'Your form has been submitted, I will contact you as soon as possible.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {resetForm();});
      },
      (error) => {
        Swal.fire({
          title: 'Error sending the form',
          text: 'An unexpected error occurred, please try again later.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
});
</script>


<style scoped>
@reference "../../styles/global.css";

.form {
  @apply mb-10 w-[400px] flex flex-col gap-6 m-auto justify-center items-center;
}

.errorMessage{
  @apply text-red-500 text-sm font-geist-light absolute -bottom-5;
}

.labelField{
  @apply text-purple-500 font-geist-light mb-1;
}

.field {
  @apply flex flex-col relative w-full;
}

input {
  @apply p-[8px] border-[1px] border-white rounded-[4px] w-full;
}

.buttonForm{
  @apply border border-purple-500 font-geist-bold rounded-full w-[200px] hover:cursor-pointer hover:bg-purple-700 py-2
}



</style>
