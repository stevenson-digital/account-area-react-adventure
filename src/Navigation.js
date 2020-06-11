import React from 'react';
import { Link } from '@reach/router';

import OrderHistoryIcon from './OrderHistory/OrderHistoryIcon';

const Navigation = () => {
  return (
    <div className="column is-one-fifth acc-menu is-hidden-touch">
      <ul className="menu-list acc-menu-list">
        <li className="acc-menu-overview">
          <Link to="/">
            <div className="acc-menu-item">
              <div className="acc-menu-icon is-hidden-tablet-only">
                <img
                  alt="Profile"
                  className="image"
                  src="https://www.gravatar.com/avatar/013688f95c442156af947819c17a1a99.jpg?d=identicon"
                />
              </div>
              <div className="acc-menu-customer">
                <p>Hey there</p>
                <span>Account Overview</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <ul className="menu-list acc-menu-list">
        <li style={{marginBottom: '1.2rem'}}>
          <Link to="/history">
            <div className="acc-menu-item">
              <div className="acc-menu-icon is-hidden-tablet-only">
                <OrderHistoryIcon width="20" height="20" color="#000" />
              </div>
              <span>Order History (dynamic)</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/history-original">
            <div className="acc-menu-item">
              <div className="acc-menu-icon is-hidden-tablet-only">
                <OrderHistoryIcon width="20" height="20" color="#000" />
              </div>
              <span>Order History (original)</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
