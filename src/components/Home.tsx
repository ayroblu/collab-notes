import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "use-form-ts";

import { getRoom } from "@/modules/documents";
import { joinNewRoom } from "@/modules/onboarding";
import { getRandomName } from "@/modules/utils";

import { SettingsContext } from "./Contexts";
import { InputField } from "./InputField";

export const Home: React.FC = () => {
  const { setSettings, settings } = React.useContext(SettingsContext);
  const [initialSetup, setInitialSetup] = React.useState({
    ...settings,
    roomName: "",
    roomId: "",
    roomPassword: "",
    fileName: "",
  });
  const form = useForm({
    values: initialSetup,
    onChange: (value) => setInitialSetup({ ...initialSetup, ...value }),
  });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate()) {
      const { fileName, ...settings } = initialSetup;
      joinNewRoom({
        navigate,
        roomName: getRandomName(),
        setSettings,
        settings,
        fileName,
      });
    }
  };
  React.useEffect(() => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    const { files } = getRoom(room.id, room.password);
    if (!files.length) return;
    const { name } = files.get(0);
    navigate({ pathname: "files", search: `?${createSearchParams({ name })}` });
  }, []);

  return (
    <section>
      <h1>Welcome to Collab Notes</h1>
      <p>
        This is decentralised way of keeping notes, none of your notes data is
        stored on our servers (this doesn't have any servers)
      </p>
      <form onSubmit={handleSubmit}>
        <p>
          {form.createFormItem("name", {
            required: true,
            adaptor,
            meta: { label: "Enter your nickname: " },
          })(({ errorText, meta: { label }, ...props }) => (
            <InputField label={label} {...props} errorText={errorText || ""} />
          ))}
        </p>
        <div>
          {form.createFormItem("fileName", {
            required: true,
            adaptor,
          })(({ errorText, ...props }) => (
            <InputField
              label="File name: "
              {...props}
              errorText={errorText || ""}
            />
          ))}
        </div>
        <input type="submit" value="Start!" />
      </form>
    </section>
  );
};
const adaptor: <T = string>(e: React.ChangeEvent<HTMLInputElement>) => T = (
  e
) => e.target.value as any;
