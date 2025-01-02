// pages/Price/Price.ts

import { fetchPrices, addPrice, updatePrice, deletePrice } from '../../services/priceService';

const loadPrices = async () => {
    try {
        const prices = await fetchPrices();
        console.log("Prices loaded:", prices);
        // Handle the display of prices on your page here
    } catch (error) {
        console.error("Error loading prices:", error);
    }
};

// Example usage for adding a new price
const newPrice = { vehicleType: "SUV", price: 100 };
const addNewPrice = async () => {
    try {
        const addedPrice = await addPrice(newPrice);
        console.log("Price added:", addedPrice);
    } catch (error) {
        console.error("Error adding price:", error);
    }
};

// Example usage for updating a price
const updatedPrice = { vehicleType: "SUV", price: 120 };
const updateExistingPrice = async (id: string) => {
    try {
        const updatedPriceData = await updatePrice(id, updatedPrice);
        console.log("Price updated:", updatedPriceData);
    } catch (error) {
        console.error("Error updating price:", error);
    }
};

// Example usage for deleting a price
const deleteExistingPrice = async (id: string) => {
    try {
        await deletePrice(id);
        console.log("Price deleted");
    } catch (error) {
        console.error("Error deleting price:", error);
    }
};

loadPrices(); // Call the loadPrices function when the page is loaded
