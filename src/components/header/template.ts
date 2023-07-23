type Props = {
  activeTheme: "light" | "dark";
};
export default {
  render({ activeTheme }: Props) {
    return `${this.css()}
            ${this.html({ activeTheme })}
    `;
  },
  html({ activeTheme }: Props) {
    return `
    <header class="header">
    <div class="container">
    <h1 class="header__title">TODO</h1>
      <div class="header__theme-switcher">

      ${
        activeTheme === "dark"
          ? ' <img src="images/icon-moon.svg" class="theme-icon--dark" alt="Dark Mode">'
          : ""
      }
       
       ${
         activeTheme === "light"
           ? ' <img src="images/icon-sun.svg" class="theme-icon--light" alt="Light Mode">'
           : ""
       }
      </div>
    </div>
  </header>
    `;
  },
  css() {
    return `
     <style>
     .header {
       z-index: 1;
       position: relative;
       width: 100%;
     }

      .container {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        color: white;
        z-index: 0;
        margin: 0 auto;
        max-width: 500px;
    }

    .theme-icon--dark,
    .theme-icon--light {
      cursor: pointer;
    }
     </style>
    `;
  },
};
