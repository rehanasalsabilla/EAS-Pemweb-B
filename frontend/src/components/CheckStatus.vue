<template>
  <div class="registration-status-container">
    <h2 class="registration-status-title">Check Registration Status</h2>
    <form @submit.prevent="checkStatus" class="registration-form">
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="email" required class="form-input" />
      </div>
      <button type="submit" class="check-status-button">
        Check Status
      </button>
    </form>

    <div v-if="status !== null" class="status-result">
      <h3 class="status-title">Registration Status:</h3>
      <p class="status-message">{{ status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      status: null,
    };
  },
  methods: {
    async checkStatus() {
      try {
        const apiUrl = `http://localhost:5000/api/registrasi?email=${this.email}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);

          if (responseData.docs && responseData.docs.length > 0) {
            const userDocument = responseData.docs.find(
              (doc) => doc.email === this.email
            );

            if (userDocument) {
              this.status = userDocument.status;
            } else {
              console.error("Error: Email not found in the API response.");
            }
          } else {
            console.error("Error: No documents found in the API response.");
          }
        } else {
          console.error(
            "Failed to fetch status. Status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.registration-status-container {
  max-width: 400px;
  margin: 8rem auto;
  padding: 1.5rem;
  background-color: #fbd38d;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.registration-status-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #347aeb;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #a0aec0;
  border-radius: 0.25rem;
  outline: none;
}

.check-status-button {
  background-color: #38a169;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.check-status-button:hover {
  background-color: #2f855a;
}

.status-result {
  margin-top: 1rem;
}

.status-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #805ad5;
}

.status-message {
  margin-top: 0.5rem;
  color: #6b7280;
}
</style>
