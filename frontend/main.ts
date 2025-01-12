import './src/styles/index.css';   // Global styles
import './src/styles/components.css';  // Component-specific styles

import Navbar from './src/components/Navbar';  // Correct path to Navbar
import Sidebar from './src/components/Sidebar';  // Correct path to Sidebar
import Footer from './src/components/Footer';  // Correct path to Footer
import Modal from './src/components/Modal';  // Correct path to Modal
// Render components dynamically
const renderApp = () => {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    ${Navbar()}
    <div class="d-flex">
      ${Sidebar()}
      <div class="content p-4" id="main-content"></div>
    </div>
    ${Footer()}
    ${Modal('editInspectionModal', 'Edit Inspection', '<form>...</form>', '<button>Save</button><button>Cancel</button>')}
  `;
};


renderApp();
