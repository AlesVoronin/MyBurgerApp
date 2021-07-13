import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";

class App extends React.Component {
  state = {
    burgers: {},
    order: {},
  };

  addBurger = (burger) => {
    //1) Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    //2) Добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    //3) Записпть новый наш новый объект burgers в state
    this.setState({ burgers });
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Hot Burger" />
        </div>
        <Order />
        <MenuAdmin addBurger={this.addBurger} />
      </div>
    );
  }
}
export default App;
