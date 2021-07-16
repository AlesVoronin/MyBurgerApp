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
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSimpleBurgers={this.loadSimpleBurgers}
        />
      </div>
    );
  }
}
export default App;
