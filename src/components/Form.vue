<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="field">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" v-bind="nameAttrs"/>
      <span v-if="errors['name']">{{errors['name']}}</span>
    </div>

    <div class="field">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" v-bind="emailAttrs"/>
      <span v-if="errors['email']">{{ errors['email'] }}</span>
    </div>

    <div class="field">
      <label for="message">Message:</label>
      <input id="message" v-model="message" type="text" v-bind="messageAttrs"/>
      <span v-if="errors['message']">{{ errors['message'] }}</span>
    </div>

    <button type="submit">Enviar</button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import {toTypedSchema} from '@vee-validate/yup'
import * as yup from 'yup';
import emailjs from '@emailjs/browser';


// Esquema de validación con Yup
const schema = toTypedSchema(yup.object({
  name: yup.string().min(2, 'Minimum 2 characters required').required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
  message: yup.string().min(6, 'Minimum 6 characters required').required('This field is required'),
}));

// Configuración del formulario
const { errors, handleSubmit, defineField } = useForm({ validationSchema: schema });

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [message, messageAttrs] = defineField('message');


// Manejar el envío del formulario
const onSubmit = handleSubmit((values) => {
  emailjs
    .send('service_ui7emwz', 'template_13z7ebr', {
      name: values.name,
      email: values.email,
      message: values.message,
    }, {
      publicKey: '5geefgiCTpTNz75xZ',
    })
    .then(
      () => {
        console.log('Email sent successfully:', values);
      },
      (error) => {
        console.error('Email sending failed:', error);
      }
    );
});
</script>


<style scoped>
.form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

span {
  color: red;
  font-size: 0.9em;
}

button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
