// src/utils/fetchWrapper.ts

export class FetchWrapper {
    static async get(url: string) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await response.json();
      } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
      }
    }
  
    static async post(url: string, data: any) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
      }
    }
  
    static async put(url: string, data: any) {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      } catch (error) {
        console.error("Error in PUT request:", error);
        throw error;
      }
    }
  
    static async delete(url: string) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await response.json();
      } catch (error) {
        console.error("Error in DELETE request:", error);
        throw error;
      }
    }
  }
  