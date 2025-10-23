<script lang="ts" setup></script>
<template>
  <section
    id="formContactUs"
    class="bg-white dark:bg-primary-900 py-8 md:pt-16 px-10"
  >
    <div class="pyc-container-section mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="flex flex-col justify-center">
        <form class="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            class="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            class="p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Mensaje"
            class="p-3 border border-gray-300 rounded-md h-32"
          ></textarea>
          <button
            type="submit"
            class="bg-primary-700 text-white p-3 rounded-md hover:bg-primary-800 transition"
          >
            {{ $t('contactUs.form.send_button') }}
          </button>
        </form>
      </div>
      <div class="flex items-center justify-center">
        <iframe
          title="Ubicación PYC"
          aria-label="Mapa de la sede principal de PYC en San Isidro, Lima"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.271335216167!2d-77.04236122141955!3d-12.09356791218803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85c5cc42cb3%3A0x45c895b2fd2298e1!2sC.%20Los%20Sauces%20325%2C%20San%20Isidro%2015073%2C%20Per%C3%BA!5e0!3m2!1ses-419!2sus!4v1741960237139!5m2!1ses-419!2sus"
          width="100%"
          height="100%"
          style="min-height: 340px"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
</template>
