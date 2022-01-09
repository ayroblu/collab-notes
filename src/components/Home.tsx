import React from "react";
import { SettingsContext } from "./Contexts";
import { useForm } from "use-form-ts";
import { InputField } from "./InputField";
import { generatePassword, slugify } from "../modules/utils";
import { getRoom } from "../modules/documents";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const { settings, setSettings } = React.useContext(SettingsContext);
  const [initialSetup, setInitialSetup] = React.useState({
    ...settings,
    isNewRoom: "yes" as "yes" | "no",
    roomName: "",
    roomId: "",
    autogeneratedPassword: getCachedAutogeneratedPassword(),
    roomPassword: "",
  });
  const form = useForm({
    values: initialSetup,
    onChange: (value) => setInitialSetup({ ...initialSetup, ...value }),
  });
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.validate()) {
      const { isNewRoom, roomName, autogeneratedPassword, ...settings } =
        initialSetup;
      if (isNewRoom === "yes") {
        const roomId = `${slugify(roomName)}-${generatePassword({
          validCharsType: "lowerLettersNumbers",
          length: 12,
        })}`;
        setSettings({
          ...settings,
          rooms: [
            ...settings.rooms,
            {
              id: roomId,
              password: autogeneratedPassword,
            },
          ],
          activeRoomId: roomId,
        });
        const { files, name } = getRoom(roomId, autogeneratedPassword);
        name.insert(0, roomName);
        const newFile = { id: uuidv4(), name: "README.md", tags: [] };
        files.insert(0, [newFile]);
        navigate(`files?name=${newFile.name}`);
      } else {
        const { isNewRoom, roomId, roomPassword, ...settings } = initialSetup;
        setSettings({
          ...settings,
          rooms: [...settings.rooms, { id: roomId, password: roomPassword }],
          activeRoomId: roomId,
        });
        getRoom(roomId, autogeneratedPassword);
        navigate("files");
      }
      resetCachedAutogeneratedPassword();
    }
  };
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
          })(({ meta: { label }, errorText, ...props }) => (
            <InputField label={label} {...props} errorText={errorText || ""} />
          ))}
        </p>
        {form.createFormItem("isNewRoom", {
          required: true,
          adaptor,
        })(({ name, value, onChange }) => (
          <div>
            <div>
              <label>
                <input
                  type="radio"
                  name={name}
                  value="yes"
                  checked={"yes" === value}
                  onChange={onChange}
                />
                Create a new room
              </label>
              {"yes" === value && (
                <div>
                  {form.createFormItem("roomName", {
                    required: true,
                    adaptor,
                  })(({ errorText, ...props }) => (
                    <InputField
                      label="Room Name: "
                      {...props}
                      errorText={errorText || ""}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={name}
                  value="no"
                  checked={"no" === value}
                  onChange={onChange}
                />
                Existing room id
              </label>
              {"no" === value && (
                <div>
                  {form.createFormItem("roomId", {
                    required: true,
                    adaptor,
                  })(({ errorText, ...props }) => (
                    <InputField
                      label="Room ID: "
                      {...props}
                      errorText={errorText || ""}
                    />
                  ))}
                  {form.createFormItem("roomPassword", {
                    required: true,
                    adaptor,
                  })(({ errorText, ...props }) => (
                    <InputField
                      label="Room Password: "
                      type="password"
                      {...props}
                      errorText={errorText || ""}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <input type="submit" value="Start!" />
      </form>
    </section>
  );
};
const adaptor: <T = string>(e: React.ChangeEvent<HTMLInputElement>) => T = (
  e
) => e.target.value as any;

let cachedAutogeneratedPassword = "";
function getCachedAutogeneratedPassword() {
  if (cachedAutogeneratedPassword) {
    return cachedAutogeneratedPassword;
  }
  cachedAutogeneratedPassword = generatePassword({ length: 40 });
  return cachedAutogeneratedPassword;
}
function resetCachedAutogeneratedPassword() {
  cachedAutogeneratedPassword = "";
}
