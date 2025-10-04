import { useEffect, useRef, useState } from "react";
import EmojiPicker, {} from "emoji-picker-react";

import styles from "./TextEditor.module.css";

export default function TextEditor({
  className,
  register = () => {},
  name = "text",
  reset = true,
}) {
  const fullClassName = `${styles.textEditor} ${className}`;

  const cursorPosition = useRef(0);
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [reset]);

  const handleOnChange = (event) => {
    if (event.target.localName === "textarea") {
      cursorPosition.current = event.target.selectionStart;
      setValue(event.target.value);
    }
  };
  const handleOnClick = (event) => {
    if (event.target.localName === "textarea") {
      cursorPosition.current = event.target.selectionStart;
    }
  };

  const handleEmojiClick = ({ emoji }) => {
    setValue((prev) => {
      const valueArr = prev.split("");
      valueArr.splice(cursorPosition.current, 0, emoji);
      return valueArr.join("");
    });

    cursorPosition.current += emoji.length;
  };

  return (
    <div className={fullClassName}>
      <textarea
        name={name}
        className={styles.textarea}
        {...register(name)}
        placeholder="Input text there..."
        spellCheck
        maxLength={2200}
        onChange={handleOnChange}
        onClick={handleOnClick}
        value={value}
      ></textarea>
      <p className={styles.length}>{value.length}/2200</p>
      <EmojiPicker reactionsDefaultOpen={true} onReactionClick={handleEmojiClick} allowExpandReactions={false} lazyLoadEmojis={true}/>
    </div>
  );
}
