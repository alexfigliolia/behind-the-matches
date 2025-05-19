import { Fragment, use } from "react";
import { Closer } from "Components/Closer";
import { CartItem } from "Layouts/Global/CartItem";
import { CheckoutContext } from "../../Context";
import { Panel, PanelProps } from "../Panel";
import "./styles.scss";

export const ConfirmationPanel = ({
  titleID,
  descriptionID,
  ...props
}: Props) => {
  const { email, toggle, orderId, cartItems, cartTotal, shippingAddress } =
    use(CheckoutContext);
  return (
    <Panel {...props} className="confirm">
      <Closer onClick={toggle.close} aria-label="Close Window" />
      <div className="padded">
        <h2 id={titleID}>Success!</h2>
        <p id={descriptionID}>Your order is on its way!</p>
        <div className="order-number">
          <div>Order:&nbsp;&nbsp;{orderId}</div>
        </div>
        <div className="order-summary">
          <div className="items">
            <h3 className="summary-item">Your Order:</h3>
            <ul>
              {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </ul>
            <div>
              <p>Order Total:</p>
              <p>{cartTotal}</p>
            </div>
          </div>
          {shippingAddress && (
            <div className="shipping-to">
              <h3 className="summary-item">Shipping To:</h3>
              <address>
                <div>
                  <p>
                    <strong>Name:</strong>
                  </p>
                  <p>{shippingAddress.name}</p>
                </div>
                <div>
                  <p>
                    <strong>Address:</strong>
                  </p>
                  <p>
                    {shippingAddress.address.line1}
                    {shippingAddress.address.line2 && (
                      <Fragment>
                        <br />
                        {shippingAddress.address.line2}
                      </Fragment>
                    )}
                    <br />
                    {shippingAddress.address.city},{" "}
                    {shippingAddress.address.state}
                    <br />
                    {shippingAddress.address.postal_code}
                  </p>
                </div>
                {email && (
                  <div>
                    <p>
                      <strong>Email:</strong>
                    </p>
                    <p>{email}</p>
                  </div>
                )}
              </address>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
};

interface Props extends PanelProps {
  titleID: string;
  descriptionID?: string;
}
