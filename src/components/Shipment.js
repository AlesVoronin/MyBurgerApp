import React from "react";
import PropTypes from "prop-types";

class Shipment extends React.Component {
  static propTypes = {
    total: PropTypes.number,
  };

  render() {
    const { total } = this.props;
    const shipping = total > 0 && total < 30 ? 10 : 0;
    const shippingNeon =
      shipping === 99 ? (
        <span className="font-effect-neon total_wrap-cheap">
          {shipping} BYN
        </span>
      ) : (
        <span>{shipping} BYN</span>
      );

    return (
      <div className="total">
        <div className="total_warp">
          <div>
            <div>Доставка: {total > 0 ? shippingNeon : null}</div>
            <div className="total_warp-free">
              {total < 30
                ? `Закажите еще на ${30 - total} BYN для БЕСПЛАТНОЙ доставки`
                : null}
            </div>
          </div>
          <div className="total_wrap-final">Итого: {total + shipping} BYN</div>
        </div>
      </div>
    );
  }
}

export default Shipment;
