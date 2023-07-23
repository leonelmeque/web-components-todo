export default {
  render() {
    return `
    ${this.css()}
    ${this.html()}
  `;
  },
  html() {
    return `
     <div id="container">
       <ul class="all">
       </ul>
       <slot name="footer"></slot>
     </div>
  `;
  },
  css() {
    return `
    <style>
      #container {
        display: flex;
        flex-flow: wrap column;
        margin: 20px 0 0;
        border-radius: 4px;
        box-shadow: var(--todo-shadow);
        background: var(--background-color);
      }

      .all{
        padding: 0;
        margin:0;
      }

      // .todos.all .todos_item.marked{
      //   display: flex;
      // }

      // .todos.active .todos__item.marked {
      //   display: none;
      // }

      // .todos.completed [class=todos__item]{
      //   display: none;
      // }


      // .todos__item,
      // .todos__filter-mobile {
      //     padding: 0px 20px 0px 15px;
      //     height: 57px;
      //     background: var(--primary-color);
      //     color: var(--primary-text-color);
      //     display: flex;
      //     border-bottom: 1px solid var(--ternary-color);
      //     font-size: 0.8em;
      //     align-items: center;
      // }

      // .todos__item:nth-child(1) {
      //     border-radius: 5px 5px 0 0;
      // }
    </style>
  `;
  },
};
