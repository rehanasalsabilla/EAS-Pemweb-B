<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-yellow-200 rounded-md shadow-md">
    <h2 class="text-2xl mb-4 font-semibold text-green-800">Check Status Pendaftaran</h2>
    <form @submit.prevent="checkStatus">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-800">Email:</label>
        <input type="email" id="email" v-model="email" required class="mt-1 p-2 border border-gray-500 rounded-md w-full focus:outline-none focus:border-blue-700" />
      </div>
      <button type="submit" class="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-900">
        Check Status
      </button>
    </form>

    <div v-if="status !== null" class="mt-4">
      <h3 class="text-lg font-semibold text-purple-800">Status Pendaftaran:</h3>
      <p class="mt-2 text-purple-600">{{ status }}</p>
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
        const apiUrl = `http://localhost:3100/api/registrasi?email=${this.email}`;
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
