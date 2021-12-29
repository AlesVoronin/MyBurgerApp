import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import SignIn from "./Auth/SignIn";
import firebase from "firebase/app";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.restaurantId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.restaurantId}/burders`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    //1) Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    //2) Добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    //3) Записпть новый наш новый объект burgers в state
    this.setState({ burgers });
  };

  updateBurger = (key, updatedBurger) => {
    //1) Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    //2) Обновляем нужный burger
    burgers[key] = updatedBurger;
    //3) Записать наш новый объект burgers в state
    this.setState({ burgers });
  };

  deleteBurger = (key) => {
    //1) Делаем копию объекта state
    const burgers = { ...this.state.burgers };
    //2) Удаляем burger
    burgers[key] = null;
    //3) Записать наш новый объект burgers в state
    this.setState({ burgers });
  };

  deleteFromOrder = (key) => {
    //1) Делаем копию объекта state
    const order = { ...this.state.order };
    //2) Удаляем order
    delete order[key];
    //3) Записать наш новый order в state
    this.setState({ order });
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

  handleLogout = async () => {
    await firebase.auth().signOut();
    window.location.reload();
  };

  render() {
    return (
      <SignIn>
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
          <Order
            deleteFromOrder={this.deleteFromOrder}
            burgers={this.state.burgers}
            order={this.state.order}
          />
          <MenuAdmin
            addBurger={this.addBurger}
            loadSimpleBurgers={this.loadSimpleBurgers}
            burgers={this.state.burgers}
            updateBurger={this.updateBurger}
            deleteBurger={this.deleteBurger}
            handleLogout={this.handleLogout}
          />
        </div>
      </SignIn>
    );
  }
}
export default App;
