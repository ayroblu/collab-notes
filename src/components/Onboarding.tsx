import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "use-form-ts";

import { joinNewRoom } from "@/modules/onboarding";
import { getRandomName } from "@/modules/utils";

import { SettingsContext } from "./Contexts";
import { InputField } from "./InputField";

export const Onboarding: React.FC = () => {
  const [initialSetup, setInitialSetup] = React.useState({
    fileName: "",
  });
  const form = useForm({
    values: initialSetup,
    onChange: (value) => setInitialSetup({ ...initialSetup, ...value }),
  });
  const { setSettings, settings } = React.useContext(SettingsContext);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate()) {
      const { fileName } = initialSetup;
      joinNewRoom({
        navigate,
        roomName: getRandomName(),
        setSettings,
        settings,
        fileName,
      });
    }
  };
  return (
    <section>
      <h1>Onboarding</h1>
      <form onSubmit={handleSubmit}>
        {form.createFormItem("fileName", {
          required: true,
          adaptor,
          meta: { label: "Enter your nickname: " },
        })(({ errorText, meta: { label }, ...props }) => (
          <InputField label={label} {...props} errorText={errorText || ""} />
        ))}
      </form>
    </section>
  );
};

const adaptor: <T = string>(e: React.ChangeEvent<HTMLInputElement>) => T = (
  e
) => e.target.value as any;
