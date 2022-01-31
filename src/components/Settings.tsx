import themeList from "monaco-themes/themes/themelist.json";
import React from "react";
import { useRecoilState } from "recoil";
import { useForm } from "use-form-ts";

import { useStable } from "@/hooks/useStable";

import { keys } from "../modules/utils";

import styles from "./Settings.module.css";
import { settingsSelector } from "./data-model";
import {
  FormLabel,
  FormLabelWrapper,
  InputField,
  TextArea,
} from "./shared/InputField";

export const Settings: React.FC = () => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
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
    persist();
  };
  const persist = () => {
    if (form.validate()) {
      setSettings({ ...settings, ...tempSettings });
    }
  };
  // This is just magic, try deleting your name, you should get invalid state
  const persistStable = useStable(persist, [tempSettings]);
  React.useEffect(() => {
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistStable]);

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
            custom: (v) =>
              parseVimrc(v)
                ? null
                : "Failed to parse vimrc, syntax should match: imap jk <Esc>",
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

const themes = keys(themeList).map((key) => ({
  label: themeList[key],
  value: key,
}));
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
