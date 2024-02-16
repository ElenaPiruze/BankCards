import React, { useState } from "react";
import close from "../assets/close.svg";
import formError from "../assets/form-error.svg";


function ModalAdd({ addCard }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name_in_card: "",
    card_number: "",
    expiry_date: "",
    cvc: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear errors when input changes
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Basic validation
    const newErrors = {};
    if (formData.name_in_card.trim() === "") {
      newErrors.name_in_card = "Name is required";
    }
    if (formData.card_number.trim() === "") {
      newErrors.card_number = "Card Number is required";
    } else if (!/^\d{16}$/.test(formData.card_number)) {
      newErrors.card_number = "Card Number must contain exactly 16 digits";
    } else if (!/^\d+$/.test(formData.card_number)) {
      newErrors.card_number = "Card Number must contain only digits";
    }
    if (formData.expiry_date.trim() === "") {
      newErrors.expiry_date = "Expiry Date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry_date)) {
      newErrors.expiry_date = "Expiry Date must be in MM/YY format";
    } else {
      const [month, year] = formData.expiry_date.split('/');
      const currentYear = new Date().getFullYear().toString().substr(-2);
      const currentMonth = new Date().getMonth() + 1;
      if (+year < +currentYear || (+year === +currentYear && +month < currentMonth)) {
        newErrors.expiry_date = "Expiry Date must be in the future";
      }
    }
    if (formData.cvc.trim() === "") {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "CVC must contain exactly 3 digits";
    }

    // If there are errors, update state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addCard(formData);
    
    // If no errors, continue with form submission
    // Here you can push the formData to your array in another file
    // Example: cardsArray.push(formData);
  console.log(formData);
    // Reset form data
    setFormData({
      name_in_card: "",
      card_number: "",
      expiry_date: "",
      cvc: ""
    });

    // Hide modal
    setShow(false);
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
              <div className="flex flex-col  w-full mb-10">
                <div className="relative h-11 w-full mb-10">
                  <input
                    type="text"
                    name="name_in_card"
                    value={formData.name_in_card}
                    onChange={handleChange}
                    className={`peer h-full w-full ${errors.name_in_card ? "border-red" : "border-black"} border-b  bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all  focus:border-gray-900 focus:outline-0 disabled:border-0 `}
                  />
                  {errors.name_in_card && (
                  <img src={formError} alt="Form Error" className="absolute right-0 bottom-2"/>
                  )}
                  {errors.name_in_card && (
                    <p className="text-red">{errors.name_in_card}</p>
                  )}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Name in card
                  </label>
                </div>
                <div className="relative  w-full mb-10">
                  <input
                    type="text"
                    name="card_number"
                    value={formData.card_number}
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.card_number && (
                    <p className="text-red-500">{errors.card_number}</p>
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
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.expiry_date && (
                    <p className="text-red-500">{errors.expiry_date}</p>
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
                    onChange={handleChange}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {errors.cvc && <p className="text-red-500">{errors.cvc}</p>}
                  <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    CVC (Security Code)
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-purple text-white w-full py-3 rounded-lg"
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

