import axios from "axios";
import { useForm } from "react-hook-form";

function AddSchool() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email", data.email);

    try {
      const res = await axios.post("https://internshipassignment-eight.vercel.app/api/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white border border-green-100 shadow-md rounded-2xl p-8">
        <h1 className="sm:text-3xl text-xl font-bold text-center text-green-600 mb-6">
          Add a School
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="School Name"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
            required
          />
          <input
            {...register("address")}
            placeholder="Address"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("city")}
              placeholder="City"
              className="border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
              required
            />
            <input
              {...register("state")}
              placeholder="State"
              className="border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
              required
            />
          </div>
          <input
            {...register("contact")}
            placeholder="Contact Number"
            type="tel"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
            required
          />
          <input
            {...register("email")}
            placeholder="Email Address"
            type="email"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 outline-none transition"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload School Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="block w-full p-2 text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-green-400 transition"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSchool;
