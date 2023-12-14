<template>
  <div class="registration-form-container">
    <h2 class="form-title">Registration Form</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="nama" class="form-label">Name:</label>
        <input type="text" id="nama" v-model="formData.nama" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="formData.email" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="asal_sekolah" class="form-label">School:</label>
        <input type="text" id="asal_sekolah" v-model="formData.asal_sekolah" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="tanggal_pendaftaran" class="form-label">Registration Date:</label>
        <input type="date" id="tanggal_pendaftaran" v-model="formData.tanggal_pendaftaran" required class="form-input" />
      </div>
      <button type="submit" class="submit-button">
        Register
      </button>
    </form>
  </div>
</template>



<script>
export default {
  data() {
    return {
      formData: {
        nama: "",
        email: "",
        asal_sekolah: "",
        tanggal_pendaftaran: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const apiUrl = "http://localhost:5000/api/registrasi";

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const responseData = await response.json();

        console.log("Registration Data Successfully Submitted:", responseData);

        // Reset form after submission
        this.formData = {
          nama: "",
          email: "",
          asal_sekolah: "",
          tanggal_pendaftaran: "",
        };
      } catch (error) {
        console.error("An error occurred while submitting data:", error);
      }
    },
  },
};
</script>

<style scoped>
.registration-form-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 1.5rem;
  background-color: #f0f4f8;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #2b6cb0;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: #4a5568;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  outline: none;
}

.submit-button {
  background-color: #2b6cb0;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2c5282;
}
</style>
