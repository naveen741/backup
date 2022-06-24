import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { gql, useQuery} from "@apollo/client";
// import { input } from "./data";
import { validation } from "./validation";
import { getProfileTemplate, createUserProfile } from "../../../utils/ApiMockData.js";

export default function Form() {
  const [language, setLanguage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { register, handleSubmit, formState: { errors },} = useForm();
  const navigate = useNavigate();
  const [profileTemplate, setProfileTemplate] = useState("");

  useEffect(()=>{
    //to get profileTemplate from backend
    setProfileTemplate(getProfileTemplate.data.getProfileTemplate.template)
    setLanguage(getProfileTemplate.data.getProfileTemplate.languageAvailable[0])
    setUserEmail(getProfileTemplate.data.getProfileTemplate.emailId)
    // console.log(userEmail)
    // console.log(JSON.stringify(profileTemplate))
  },[])

  if(profileTemplate === ""){
    return <div>Loading...</div>
  }

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      console.log(JSON.stringify(data));
      console.log(language);
      //code for sending input profileTemplate data to backend using createUserProfile
      if(true){
        const fullName = createUserProfile.data.createUserProfile.fullName;
        const examDuration = createUserProfile.data.createUserProfile.examDuration;
        console.log("fullName", fullName)
        console.log("examDuration", examDuration)
        navigate("/start");
      }
    }
  };
  console.log(errors);

  return (
    <div className="Form-container">
     
      {/* <div className='card-heading'>tringapps</div>
        <div className="card-subheading">complete the registration</div> */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="Form-input-container">
            <div className="Fields">
                <div>
                  <label>Name:</label>
                </div>
                <div className="inputfields">
                  <input
                      className="input-box"
                      type="text"
                      autoComplete="off"
                      placeholder={`Enter your Name`}
                      required
                      {...register("Name")}
                   />
                </div>
            </div>
            <div className="Fields">
                <div>
                  <label>Email:</label>
                </div>
                <div className="inputfields">
                  <input
                      className="input-box"
                      type="email"
                      value= {userEmail}
                      autoComplete="off"
                      placeholder={`Enter your Email`}
                      readOnly
                      required
                      {...register("Name")}
                   />
                </div>
            </div>
            {profileTemplate &&
              profileTemplate.map((data, index) => {
                let validation_rules = validation(data.description);
                {}
                return (
                  <div className="Fields" key={index}>
                    <div>
                      <label>{data.label}:</label>
                    </div>
                    <div className="inputfields">
                      {data.type === "TEXT" && (
                        <input
                          className="input-box"
                          type={data.type}
                          defaultValue={
                            data.description === "email"
                              ? "selvant382@gmail.com"
                              : ""
                          }
                          readOnly={data.description === "email" ? true : false}
                          autoComplete="off"
                          placeholder={`Enter your ${data.label}`}
                          required
                          {...register(data.label, validation_rules)}
                        />
                      )}
                      {data.type === "NUMBER" && (
                        <input
                          className="input-box"
                          type={data.type}
                          defaultValue={
                            data.description === "email"
                              ? "selvant382@gmail.com"
                              : ""
                          }
                          placeholder={`Enter your ${data.label}`}
                          required
                          {...register(data.label, validation_rules)}
                        />
                      )}
                      {data.type === "select" && (
                        <select
                          className="select-input"
                          {...register(data.label)}
                        >
                          {data.optionvalues.map((values, index) => {
                            return (
                              <option value={values} key={index}>
                                {values}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </div>
                    {errors[data.label] && (
                      <div className="Error-message">
                        <span>*Enter valid {data.label}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="Fields">
                <div>
                  <label>Choose prefered language:</label>
                </div>
                <div className="inputfields">
                  <select className="select-input"  {...register("Choose prefered language")} onChange={(event)=>setLanguage(event.target.value)}>
                          {getProfileTemplate.data.getProfileTemplate.languageAvailable.map((values, index) => {
                            return (
                              <option value={values} key={index}>
                                {values}
                              </option>
                            );
                          })}
                  </select>
                </div>
              </div>
          </div>
          <div className="Submit-container">
            <button className="Submit-Button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
