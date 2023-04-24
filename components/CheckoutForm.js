import React from "react";

import { useForm } from "react-hook-form";

function CheckoutForm({ onSubmit }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Contact information
          </h2>

          <div className="mt-4">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Email address﹡
            </label>
            <div className="mt-1">
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                id="email-address"
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />

              {errors.email && (
                <p role="alert" className="text-red-500 mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">
            Shipping information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.firstName && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.lastName && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="line1"
                className="block text-sm font-medium text-gray-700"
              >
                Address﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("line1", {
                    required: "Address is required",
                  })}
                  type="text"
                  id="line1"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.line1 && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.line1?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="line2"
                className="block text-sm font-medium text-gray-700"
              >
                Apartment, suite, etc.
              </label>
              <div className="mt-1">
                <input
                  {...register("line2")}
                  type="text"
                  id="line2"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("city", {
                    required: "City is required",
                  })}
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.city && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.city?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("country", {
                    required: "Country is required",
                  })}
                  id="country"
                  type="text"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.country && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.country?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("state", {
                    required: "State is required",
                  })}
                  type="text"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.state && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.state?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700"
              >
                Postal code﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("postCode", {
                    required: "Post code is required",
                  })}
                  type="text"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.postCode && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.postCode?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone﹡
              </label>
              <div className="mt-1">
                <input
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  type="text"
                  id="phone"
                  autoComplete="tel"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.phone && (
                  <p role="alert" className="text-red-500 mt-1">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Select Shipping Method
          </button>
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
