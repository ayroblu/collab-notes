import themeList from "monaco-themes/themes/themelist.json";
import React from "react";
import { useRecoilState } from "recoil";
import { useForm } from "use-form-ts";

import { useStable } from "@/hooks/useStable";

import { checkEqual, handleTextAreaHeight, keys } from "../modules/utils";

import styles from "./Settings.module.css";
import { settingsSelector } from "./data-model";
import { Button } from "./shared/Button";
import {
  FormLabel,
  FormLabelWrapper,
  FormWrapper,
  InputField,
  TextArea,
} from "./shared/InputField";

export const Settings: React.FC = () => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const { isVim, name, theme, vimrc, websockets, wordWrap } = settings;
  const adjustedSettings = {
    isVim,
    vimrc,
    name,
    theme,
    wordWrap,
    websockets,
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
      setSettings(checkEqual(settings, { ...settings, ...tempSettings }));
    }
  };
  const persistStable = useStable(persist);
  React.useEffect(() => {
    persistStable();
  }, [persistStable, tempSettings]);

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    const dispose = handleTextAreaHeight(textArea);
    return () => {
      dispose();
    };
  }, []);

  return (
    <section className={styles.settings}>
      <h2 className={styles.heading}>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {form.createFormItem("name", {
            required: true,
            adaptor,
            meta: { label: "Nickname " },
          })(({ errorText, meta: { label }, ...props }) => (
            <InputField label={label} {...props} errorText={errorText || ""} />
          ))}
        </div>
        <div>
          {form.createFormItem("wordWrap", {
            adaptor: checkedAdaptor,
            meta: { label: "Word wrap enabled " },
          })(({ meta: { label }, name, onChange, value }) => (
            <FormLabelWrapper isOneLine>
              <FormLabel>{label}</FormLabel>
              <div className={styles.centered}>
                <input
                  checked={value}
                  name={name}
                  onChange={onChange}
                  type="checkbox"
                />
              </div>
            </FormLabelWrapper>
          ))}
        </div>
        <div>
          {form.createFormItem("isVim", {
            adaptor: checkedAdaptor,
            meta: { label: "Vim Mode enabled " },
          })(({ meta: { label }, name, onChange, value }) => (
            <FormLabelWrapper isOneLine>
              <FormLabel>{label}</FormLabel>
              <div className={styles.centered}>
                <input
                  checked={value}
                  name={name}
                  onChange={onChange}
                  type="checkbox"
                />
              </div>
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
              errorText={errorText || ""}
              label="vimrc"
              name={name}
              onChange={onChange}
              ref={textAreaRef}
              value={value}
            />
          ))}
        {form.createFormItem("theme", {
          required: true,
          adaptor,
        })(({ name, onChange, value }) => (
          <FormLabelWrapper>
            <FormLabel>Theme</FormLabel>
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
        {form.createFormItem(
          "websockets",
          {},
        )(({ onChange, value }) => (
          <FormWrapper>
            <FormLabel>Websockets</FormLabel>
            <div className={styles.lines}>
              {value.map((v, i) => (
                <div className={styles.checkedLine} key={i}>
                  <div className={styles.checkboxContainer}>
                    <input
                      onChange={(e) =>
                        onChange(
                          value.map((newV, j) =>
                            i === j
                              ? { ...newV, isEnabled: e.currentTarget.checked }
                              : newV,
                          ),
                        )
                      }
                      type="checkbox"
                    />
                  </div>
                  <input
                    className={styles.textInputLine}
                    onChange={(e) =>
                      onChange(
                        value.map((newV, j) =>
                          i === j
                            ? { ...newV, url: e.currentTarget.value }
                            : newV,
                        ),
                      )
                    }
                    value={v.url}
                  />
                  <Button
                    buttonType="inline"
                    onClick={() => onChange(value.filter((_, j) => i !== j))}
                  >
                    ???
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  onChange(value.concat({ isEnabled: false, url: "" }))
                }
              >
                ??? Add Connection
              </Button>
            </div>
          </FormWrapper>
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
  >,
) => T = (e) => e.target.value as any;
const checkedAdaptor: (e: React.ChangeEvent<HTMLInputElement>) => boolean = (
  e,
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
        const regex = /^(?<m>[ni])map +(?<before>\S+) +(?<after>\S+) *$/g;
        const { after, before, m } = regex.exec(l)!.groups!;
        return { mode: m === "i" ? "insert" : "normal", before, after };
      });
  } catch {
    return null;
  }
};
