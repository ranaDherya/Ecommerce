import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../store/actions/cart-actions";
import MetaData from "../layout/MetaData";
import {
  PinDrop,
  Home,
  LocationCity,
  Public,
  Phone,
  TransferWithinAStation,
} from "@mui/icons-material";
import { Country, State } from "country-state-city";
import CheckoutStep from "./CheckoutStep";

import "./Shipping.css";
import Alert from "../Alert/Alert";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [err, setErr] = useState();

  const clearErr = () => {
    setErr();
  };

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const navigate = useNavigate();

  const shippingSubmitHandler = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      setErr("      Phone Number should be 10 digits long.");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      {" "}
      {err && <Alert type="error" message={err} clearErrors={clearErr} />}
      <MetaData title="Shipping Details" />
      <CheckoutStep activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmitHandler}
          >
            <div>
              <Home />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDrop />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <Phone />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
