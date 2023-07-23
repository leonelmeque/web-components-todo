type Props = {
  itemsLeft: number;
};

export default {
  render(props: Props) {
    return `
      ${this.css()}
      ${this.html(props)}
    `;
  },
  html(props: Props) {
    return `
     <div id="container">
      <span id="items-left">${props.itemsLeft} ${
      props.itemsLeft > 1 ? "items" : "item"
    } left</span>
        <div id="filters">
          <button type="button" name="All">All</button>
          <button type="button" name="Active">Active</button>
          <button type="button" name="Completed">Completed</button>
        </div>
        <button type="button" name="Clear">Clear Completed</button>
     </div>
    `;
  },
  css() {
    return `
    <style>
     #container {
      box-sizing: border-box;
      display: flex;
      gap: 0.5rem;
      width: 100%;
      justify-content: space-between;
      padding: 1rem;
     }

     #items-left{
      font-size: .8rem;
      color: var(--secondary-color);
      font-weight: bold;
     }

     #filters {
      display: flex;
      justify-content: space-between;
      gap: .5rem;
     }

     button{
      cursor: pointer;
      background: none;
      outline: none;
      border: none;
      font-weight: bold;
      color: var(--secondary-color);
     }

     button:hover{
      color: var(--secondary-text-color);
     }
    </style>
    `;
  },
};
