import {useState} from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './form.css'


export const Form = () => {
  
  const [isFocused, setIsFocused] = useState(false);


  const form = useForm({
    defaultValues: {
      username: "",
      email: "" ,
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    },
    mode: 'onBlur'
  });
  const { register, control, handleSubmit, formState, watch, onBlur } = form
  const { errors, isDirty, isValid, touchedFields } = formState;

  //watch passwords to ensure matching is validated
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  
  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control
  })
  
  const onSubmit = (data) => {
    console.log('Form Submitted', data);
  }


  return (
    <div className=' text-white font-athiti px-12 py-10'>
        <h1 className='font-athiti text-3xl font-semibold'>Create Account</h1>
        <form className='flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div className='mt-10 mb-4'>
              <input 
                type="text" 
                id='username' 
                placeholder='Username'
                {...register("username", {
                  required: "Username is required"
                })}
                className='w-80 border-2 border-solid rounded-md border-white focus:border-blue-400 transition ease-in delay-200 focus:outline-none bg-transparent py-1 px-1 drop-shadow-md text-slate-600 placeholder-gray'
              />
              <p className='text-red-700'>{errors.username?.message}</p>
            </div>
            

            <div className='mb-4'>
              <input 
                type="email" 
                id='email' 
                placeholder='Email'
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Invalid email entered'
                  },
                  required: 'An email is required',
                  //can also return multiple validate objects if, say you wanted to also look for some other invalid e-mail type
                  validate: (fieldValue) => {
                    return fieldValue !== "admin@example.com" 
                    || "Enter a different email address"
                  }
                })}
                className='w-80 border-2 border-solid focus:border-blue-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
              />
              <p className='text-red-700'>{errors.email?.message}</p>
            </div>

            <div className='mb-4'>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{ required: "A phone number is required" }}
                render={({ field }) => (
                  <PhoneInput
                    international
                    defaultCountry="US"
                    placeholder="Phone Number"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    withCountryCallingCode
                    countryCallingCodeEditable={false}
                    className={`w-80 border-2 border-solid focus:border-blue-400 transition ease-in delay-200 
                    focus:outline-none rounded-md border-white 
                    bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray
                    ${isFocused ? 'border-blue-400' : 'border-white'}`}
                  />
                )}
              />
              <p className='text-red-700'>{errors.phoneNumber && errors.phoneNumber.message}</p>
          </div>
            
            

            <div className='mb-4'>
              <input 
                type="password" 
                id="password" 
                placeholder='Password'
                {...register("password", {
                  required: "A password is required"
                })}
                className='w-80 border-2 border-solid focus:border-blue-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
              />
              <p className='text-red-700'>{errors.password?.message}</p>
            </div>
            

            <div className='mb-10'>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder='Confirm Password'
                {...register("confirmPassword", {
                  required: "Password confirmation is required",
                  validate: value => value === password || "The passwords do not match"
                })}
                className='w-80 border-2 border-solid focus:border-blue-400 transition ease-in delay-200 focus:outline-none rounded-md border-white bg-transparent py-1 px-1 drop-shadow-md text-slate-700 placeholder-gray'
              />
             <p className='text-red-700'>{formState.touchedFields.confirmPassword && errors.confirmPassword && errors.confirmPassword.message}</p>
            </div>
            


            <button disabled={!isDirty || !isValid} className='border-2 rounded-lg bg-white text-slate-700 text-lg w-80 font-semibold'>Create Account</button>
        </form>
        {/* <DevTool control={control} /> */}
    </div>
  )
}
