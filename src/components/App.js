import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger.js";

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

  loadSimpleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };

  addToOrder = (key) => {
    // 1. Делаем копию объекта state
    const order = { ...this.state.order };
    // 2. Добавить ключ к заказу со значением 1, либо обновить текущее значение
    order[key] = order[key] + 1 || 1;
    // 3. Записываем новый обхект order в state
    this.setState({ order });
    //равняется this.setState ({order: order})
  };

  render() {
    return (
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Hot Burger" />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order burgers={this.state.burgers} order={this.state.order} />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSimpleBurgers={this.loadSimpleBurgers}
        />
      </div>
    );
  }
}
export default App;
