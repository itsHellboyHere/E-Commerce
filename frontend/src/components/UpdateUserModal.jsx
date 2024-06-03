import { useState } from "react";
import { toast } from 'react-toastify';

const UpdateUserModal = ({ user, onUpdateUser, onUpdatePassword }) => {
  const [name, setName] = useState(user.name ??'');
  const [email, setEmail] = useState(user.email ??'');
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
      await onUpdateUser({ email, name });
      setEmail("")
      setShowModal(false); // Close the modal after successful update
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      await onUpdatePassword({ oldPassword, newPassword: password });
      setPassword(""); // Clear the password field
      setShowModal(false); // Close the modal after successful update
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <button className="btn btn-xs btn-outline btn-primary" onClick={() => setShowModal(true)}>Update Profile</button>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-60">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-neutral rounded-lg p-6 relative">
              <button className="absolute top-2 right-2 text-primary hover:text-gray-900" onClick={handleCloseModal}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-xl font-semibold mb-4 text-base-500">Update User Information</h2>
              <form onSubmit={handleSubmitUserInfo} className="mb-4 text-secondary">
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="grow"
                    placeholder="Name"
                    required
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="grow"
                    placeholder="Email"
                    required
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>


                </label>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
              <h2 className="text-xl font-semibold mb-4">Update Password</h2>
              <form onSubmit={handleSubmitPassword} className="mb-4 text-secondary">
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    id="oldPassword"
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="grow"
                    placeholder="Old Password"
                    required
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
</svg>

                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>


                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

                    )}
                  </button>
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="grow"
                    placeholder="New Password"
                    required
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
</svg>

                </label>
                <button type="submit" className="btn btn-primary">Update Password</button>
              </form>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserModal;
