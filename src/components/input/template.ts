export default {
  render() {
    return `
     ${this.css()}
     ${this.html()}
    `;
  },
  html() {
    return `
      <div class="container">
        <div class="todo__icon">
          <img src="images/icon-check.svg" alt="check" />
        </div>
        <input id="input" type="text" placeholder="Create a new todo..." />
      </div>
    `;
  },
  css() {
    return `
     <style>
      .container{
        width: 100%;
        position: relative
      }

      #input:focus,
      #input:not(focus){
        height: 57px;
        color: var(--secondary-color);
        border: none;
      }

      #input{
        width: 100%;
        padding: 15px 20px 15px 50px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        background: var(--primary-color);
        border-radius: 4px;
      }

      #input:focus{
        font-weight: 700;
      }

      #input:focus::placeholder{
        font-weight: 400;
      }
      
      .todo__icon{
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid var(--ternary-color);
        border-radius: 999px;
        top: 18px;
        left: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .todo__icon img {
        display: none;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    
      .todo__icon.show img {
          display: inline-block;
      }
     </style>
    `;
  },
};
