function Contact() {
  return (
    <div className="flex justify-center p-20">
      <div className="bg-slate-600 bg-opacity-90 text-center border-2 border-slate-500 rounded-lg shadow-white shadow-md w-4/5 p-2">
        <h1 className="text-white font-bold text-xl mt-2">Contact Me</h1>
        <hr className="m-5 border-2 rounded" />
        <div className="grid grid-cols-2 gap-3 justify-center items-center">
          <label htmlFor="textboxFirstName" className="text-white">
            First Name:
          </label>
          <input
            type="firstName"
            name="textboxFirstName"
            id="textboxFirstName"
            className="m-2 p-1 rounded-lg text-center text-sm"
          />
          <label htmlFor="textboxLastName" className="text-white">
            Last Name:
          </label>
          <input
            type="lastName"
            name="textboxLastName"
            id="textboxLastName"
            className="m-2 p-1 rounded-lg text-center text-sm"
          />
          <label htmlFor="textboxEmailAddress" className="text-white">
            Email Address:
          </label>
          <input
            type="email"
            name="textboxEmailAddress"
            id="textboxEmailAddress"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="m-2 p-1 rounded-lg text-center text-sm"
          />
          <label htmlFor="textboxQuery" className="text-white">
            Message:
          </label>
          <textarea
            name="textboxQuery"
            id="textboxQuery"
            cols="30"
            rows="5"
            className="m-2 p-2 rounded-lg text-sm col-span-2"
          ></textarea>
        </div>
         <div className="flex justify-center">
            <button type="submit" className="m-2 p-2 rounded-lg bg-blue-500 text-white w-60 font-semibold">
              Submit
            </button>
          </div>
      </div>
    </div>
  );
}

export default Contact;
