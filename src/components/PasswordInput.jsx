import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({value,onChange,placeholder}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100 border border-secondary rounded-3 shadow-sm">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Password'}
        type={isShowPassword ? 'text' : 'password'}
        className="form-control px-4 py-2 border-0"
        required
      />
      <button onClick={toggleShowPassword} className="btn border-0 bg-transparent">
        {isShowPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className=" cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
