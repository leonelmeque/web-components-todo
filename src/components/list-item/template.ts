type CustomClickFunction = (id: string) => (event: MouseEvent) => void;
export type ListItemProps = {
  status: string;
  id: string;
  onChangeStatus: CustomClickFunction | undefined;
  todo: string;
  onDeleteTodo: CustomClickFunction | undefined;
};

export default {
  render(props: ListItemProps) {
    return `${this.css()}
            ${this.html(props)}`;
  },
  html({ status, id, todo }: ListItemProps) {
    return `
      <li id="container" class="todo__item--${status}" data-state="false" id="${id}">
          <label for="todo-${id}" class="todo checkbox-container">
              <input id="todo-${id}" 
              class="todo__item--pending"
              type="checkbox" ${status === "marked" && "checked"}
              />
              <span class="label__text">${todo}</span>
              <span class="checkmark"></span>
          </label>
        <span class="todo__item-remove-icon" >
         <img src="images/icon-cross.svg" alt="delete todo">
        </span>
      </li> 
    `;
  },
  css() {
    return `
     <style>

      #container{
        display: flex;
        gap: .5rem;
        padding-inline: 16px;
        transition: all .2s ease-out;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: var(--secondary-color);
      }

      #container:hover{
        background: rgb(96 96 96 / 20%); 
      }

      #container:hover .checkbox-container{
        font-weight: 500;
      }

        .checkbox-container {
          padding-left: 30px;
          display: block;
          position: relative;
          flex: 1;
          cursor: pointer;
          color: var(--secondary-text-color);
          padding-block: 1rem;
        }

        .checkbox-container input[type=checkbox]{
          border: 0;
          padding: 0;
          margin: 0;
          height: 0;
          width: 0;
          opacity: 0;
          position: absolute;
        }

        .checkmark {
          position: absolute;
          top: 50%;
          left: 0%;
          height: 20px;
          width: 20px;
          border-radius: 999px;
          border: 1px solid var(--ternary-color);
          transform: translate(0%,-50%)
      }

        .checkbox-container input[type=checkbox]:checked~.checkmark {
          background: var(--checkbox-gradient);
        }

        .checkbox-container input[type=checkbox]:checked~.checkmark:after{
          content: "";
          display: block;
          position: relative;
          top: 4px;
          left: 4px;
          width: 100%;
          height: 100%;
          background: url('/images/icon-check.svg');
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }

        .checkbox-container [type=checkbox]:checked+.label__text{
          text-decoration: line-through;
          color: var(--secondary-text-color);
        }
      
        .todo__item-remove-icon {
          flex: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
        }
     </style>
    `;
  },
};
