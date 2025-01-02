const Modal = (id: string, title: string, content: string, footer: string) => {
    return `
      <div id="${id}" class="modal">
        <div class="modal-content">
          <span class="close" id="close-${id}">&times;</span>
          <h4>${title}</h4>
          <div class="modal-body">${content}</div>
          <div class="modal-footer">${footer}</div>
        </div>
      </div>
    `;
  };
  
  export default Modal;
  
  