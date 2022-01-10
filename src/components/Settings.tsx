import React from "react";
import { useForm } from "use-form-ts";
import { SettingsContext } from "./Contexts";
import { InputField } from "./InputField";

export const Settings: React.FC = () => {
  const { settings, setSettings } = React.useContext(SettingsContext);
  const { isVim, vimrc, name, theme } = settings;
  const adjustedSettings = {
    isVim,
    vimrc,
    name,
    theme,
  };
  const [tempSettings, setTempSettings] = React.useState(adjustedSettings);
  const form = useForm({
    values: tempSettings,
    onChange: (value) => setTempSettings({ ...tempSettings, ...value }),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate()) {
      setSettings({ ...settings, ...tempSettings });
      // todo
    }
  };
  return (
    <section>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <p>
          {form.createFormItem("name", {
            required: true,
            adaptor,
            meta: { label: "Nickname: " },
          })(({ meta: { label }, errorText, ...props }) => (
            <InputField label={label} {...props} errorText={errorText || ""} />
          ))}
        </p>
        <p>
          {form.createFormItem("isVim", {
            adaptor: checkedAdaptor,
            meta: { label: "Vim Mode enabled: " },
          })(({ meta: { label }, name, onChange, value }) => (
            <label>
              {label}
              <input
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={value}
              />
            </label>
          ))}
        </p>
        <input type="submit" value="Save!" />
        <button>Cancel</button>
      </form>
      <ul>
        <li>vimrc settings</li>
        <li>Theme</li>
      </ul>
    </section>
  );
};

const adaptor: <T = string>(e: React.ChangeEvent<HTMLInputElement>) => T = (
  e
) => e.target.value as any;
const checkedAdaptor: (e: React.ChangeEvent<HTMLInputElement>) => boolean = (
  e
) => e.target.checked;
