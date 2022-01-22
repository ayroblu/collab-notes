import isEqual from "lodash/isEqual";
import themeList from "monaco-themes/themes/themelist.json";
import React from "react";
import { useForm } from "use-form-ts";

import { keys } from "../modules/utils";

import { SettingsContext } from "./Contexts";
import {
  FormLabel,
  FormLabelWrapper,
  InputField,
  TextArea,
} from "./InputField";
import styles from "./Settings.module.css";

export const Settings: React.FC = () => {
  const { setSettings, settings } = React.useContext(SettingsContext);
  const { isVim, name, theme, vimrc, wordWrap } = settings;
  const adjustedSettings = {
    isVim,
    vimrc,
    name,
    theme,
    wordWrap,
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
  const cancelHandler = () => {
    setTempSettings(adjustedSettings);
  };
  const isNoChanges = isEqual({ isVim, vimrc, name, theme }, tempSettings);

  return (
    <section className={styles.settings}>
      <h2 className={styles.heading}>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {form.createFormItem("name", {
            required: true,
            adaptor,
            meta: { label: "Nickname: " },
          })(({ errorText, meta: { label }, ...props }) => (
            <InputField label={label} {...props} errorText={errorText || ""} />
          ))}
        </div>
        <div>
          {form.createFormItem("wordWrap", {
            adaptor: checkedAdaptor,
            meta: { label: "Word wrap enabled: " },
          })(({ meta: { label }, name, onChange, value }) => (
            <FormLabelWrapper>
              <FormLabel>{label}</FormLabel>
              <input
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={value}
              />
            </FormLabelWrapper>
          ))}
        </div>
        <div>
          {form.createFormItem("isVim", {
            adaptor: checkedAdaptor,
            meta: { label: "Vim Mode enabled: " },
          })(({ meta: { label }, name, onChange, value }) => (
            <FormLabelWrapper>
              <FormLabel>{label}</FormLabel>
              <input
                type="checkbox"
                name={name}
                onChange={onChange}
                checked={value}
              />
            </FormLabelWrapper>
          ))}
        </div>
        {tempSettings.isVim &&
          form.createFormItem("vimrc", {
            adaptor,
            custom: (v) => {
              return parseVimrc(v)
                ? null
                : "Failed to parse vimrc, syntax should match: imap jk <Esc>";
            },
          })(({ errorText, name, onChange, value }) => (
            <TextArea
              label="vimrc"
              value={value}
              name={name}
              onChange={onChange}
              errorText={errorText || ""}
            />
          ))}
        {form.createFormItem("theme", {
          required: true,
          adaptor,
        })(({ name, onChange, value }) => (
          <FormLabelWrapper>
            <FormLabel>Theme:</FormLabel>
            <select name={name} onChange={onChange} value={value}>
              <optgroup label="Built in themes">
                {builtInThemes.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom themes">
                {themes.map(({ label, value }) => (
                  <option key={value} value={label}>
                    {label}
                  </option>
                ))}
              </optgroup>
            </select>
          </FormLabelWrapper>
        ))}
        <div className={styles.buttonRow}>
          <FormLabel />
          <input
            type="submit"
            value="Save"
            className={styles.submit}
            disabled={isNoChanges}
          />
          <button
            type="button"
            onClick={cancelHandler}
            className={styles.cancel}
            disabled={isNoChanges}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};
export const builtInThemes = [
  { label: "VS Code light", value: "vs" },
  { label: "VS Code dark", value: "vs-dark" },
  { label: "High Contrast Black", value: "hc-black" },
];

const adaptor: <T = string>(
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => T = (e) => e.target.value as any;
const checkedAdaptor: (e: React.ChangeEvent<HTMLInputElement>) => boolean = (
  e
) => e.target.checked;

const themes = keys(themeList).map((key) => {
  return {
    label: themeList[key],
    value: key,
  };
});
export const parseVimrc = (vimrc: string) => {
  try {
    return vimrc
      .split("\n")
      .filter((l) => l.trim())
      .map((l) => {
        const regex = /^([ni])map +(\S+) +(\S+) *$/g;
        const [, m, before, after] = regex.exec(l)!;
        return { mode: m === "i" ? "insert" : "normal", before, after };
      });
  } catch {
    return null;
  }
};
