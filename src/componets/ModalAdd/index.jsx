import React, { useState } from "react";
import close from "../assets/close.svg";
import formError from "../assets/form-error.svg";
import formSuccess from "../assets/form-success.svg";

function ModalAdd({ addCard }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name_in_card: "",
    card_number: "",
    expiry_date: "",
    cvc: "",
    card_is: "",
  });
  const [errors, setErrors] = useState({});
  const [isInputEdited, setIsInputEdited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    setIsInputEdited(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (formData.name_in_card.trim() === "") {
      newErrors.name_in_card = "Please fill in your name";
    }
    if (formData.card_number.trim() === "") {
      newErrors.card_number = "Please enter a valid credit card number";
    } else if (!/^\d{16}$/.test(formData.card_number)) {
      newErrors.card_number = "Card Number must contain exactly 16 digits";
    } else if (!/^\d+$/.test(formData.card_number)) {
      newErrors.card_number = "Card Number must contain only digits";
    } else if (!isMasterOrVisaCard(formData.card_number)) {
      newErrors.card_number =
        "Please enter a valid Mastercard or Visa card number";
    } else {
      formData.card_is = getCardType(formData.card_number);
    }
    if (formData.expiry_date.trim() === "") {
      newErrors.expiry_date = "Please enter a valid expiry date";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry_date)) {
      newErrors.expiry_date = "Expiry Date must be in MM/YY format";
    } else {
      const [month, year] = formData.expiry_date.split("/");
      const currentYear = new Date().getFullYear().toString().substr(-2);
      const currentMonth = new Date().getMonth() + 1;
      if (
        +year < +currentYear ||
        (+year === +currentYear && +month < currentMonth)
      ) {
        newErrors.expiry_date = "Expiry Date must be in the future";
      }
    }
    if (formData.cvc.trim() === "") {
      newErrors.cvc = "Please enter a valid security code";
    } else if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "CVC must contain exactly 3 digits";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addCard(formData);
    console.log(formData);
    setFormData({
      name_in_card: "",
      card_number: "",
      expiry_date: "",
      cvc: "",
      card_is: "",
    });
    setShow(false);
  };

  const isMasterOrVisaCard = (cardNumber) => {
    const mastercardRegex = /^(5[1-5][0-9]{14})$/;
    const visaRegex = /^(4[0-9]{15})$/;

    return mastercardRegex.test(cardNumber) || visaRegex.test(cardNumber);
  };

  const getCardType = (cardNumber) => {
    const mastercardRegex = /^(5[1-5][0-9]{14})$/;
    const visaRegex = /^(4[0-9]{15})$/;

    if (mastercardRegex.test(cardNumber)) {
      return "Mastercard";
    } else if (visaRegex.test(cardNumber)) {
      return "Visa";
    } else {
      return "Unknown";
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-purple text-white w-full py-3 rounded-lg"
      >
        Add new card
      </button>

      <div
        className={`${
          show
            ? "block overflow-y-auto overflow-x-hidden fixed bg-transparent top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full "
            : "hidden"
        }  `}
      >
        <div className="relative h-full w-full z-10 after:content-['*']  pt-32 after:bg-black after:absolute after:inset-0 after:-z-10 after:w-full after:h-full after:opacity-30">
          <div className="bg-white w-full h-full  rounded-t-2xl p-5  relative z-50 overflow-y-scroll">
            <button
              onClick={() => setShow(false)}
              className="w-full flex justify-end mb-10"
            >
              {" "}
              <img src={close} alt="close" />
            </button>
            <form onSubmit={handleSubmit} className="mb-10">
              <h2 className="text-2xl font-bold mb-10">
                Add your card details
              </h2>
              <div className="flex flex-col w-full mb-10">
                <div className="relative h-11 w-full mb-10">
                  <input
                    type="text"
                    name="name_in_card"
                    value={formData.name_in_card}
                    placeholder="John Doe"
                    onChange={handleChange}
                    className={`peer h-full w-full ${
                      errors.name_in_card ? "border-red" : "border-black"
                    }${
                      formData.name_in_card.trim()
                        ? "border-green"
                        : "border-black"
                    } 
                    peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-bold text-green outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-transparent"`}
                  />
                  {errors.name_in_card && (
                    <img
                      src={formError}
                      alt="Form Error"
                      className="absolute right-0 bottom-2"
                    />
                  )}
                  {errors.name_in_card && (
                    <p className="text-red">{errors.name_in_card}</p>
                  )}
                  {formData.name_in_card.trim() && (
                    <img
                      src={formSuccess}
                      alt="Form Success"
                      className="absolute right-0 bottom-2 text-green"
                    />
                  )}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Name in card
                  </label>
                </div>
                <div className="relative w-full mb-10">
                  <input
                    type="text"
                    name="card_number"
                    value={formData.card_number}
                    placeholder="0000 0000 0000 0000"
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-bold text-green outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.card_number && (
                    <img
                      src={formError}
                      alt="Form Error"
                      className="absolute right-0 bottom-2"
                    />
                  )}
                  {errors.card_number && (
                    <p className="text-red">{errors.card_number}</p>
                  )}

                  {formData.card_number.trim() && (
                    <img
                      src={formSuccess}
                      alt="Form Success"
                      className="absolute right-0 bottom-2 text-green"
                    />
                  )}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Card number
                  </label>
                </div>
                <div className="relative  w-full mb-10">
                  <input
                    type="text"
                    name="expiry_date"
                    value={formData.expiry_date}
                    placeholder="00/00"
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-bold text-green outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.expiry_date && (
                    <img
                      src={formError}
                      alt="Form Error"
                      className="absolute right-0 bottom-2"
                    />
                  )}
                  {errors.expiry_date && (
                    <p className="text-red">{errors.expiry_date}</p>
                  )}

                  {formData.expiry_date.trim() && (
                    <img
                      src={formSuccess}
                      alt="Form Success"
                      className="absolute right-0 bottom-2 text-green"
                    />
                  )}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Expiry date
                  </label>
                </div>
                <div className="relative  w-full ">
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    placeholder="000"
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text- font-bold text-green outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.cvc && (
                    <img
                      src={formError}
                      alt="Form Error"
                      className="absolute right-0 bottom-2"
                    />
                  )}
                  {errors.cvc && <p className="text-red">{errors.cvc}</p>}

                  {formData.cvc.trim() && (
                    <img
                      src={formSuccess}
                      alt="Form Success"
                      className="absolute right-0 bottom-2 text-green"
                    />
                  )}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    CVC (Security Code)
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={!isInputEdited}
                className="bg-purple text-white w-full py-3 rounded-lg disabled:opacity-30 disabled:bg-grey "
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAdd;
