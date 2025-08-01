"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ListNode, ListItemNode } from "@lexical/list";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LinkNode } from "@lexical/link";

import { useState } from "react";
import { $getSelection, $isRangeSelection } from "lexical";

import styles from "./editor.module.css";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";

const theme = {
  paragraph: styles.paragraph,
};

function OnChangeHandler({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor, null);
          onChange(html);
        });
      }}
    />
  );
}

function LinkEditor() {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState("");

  const insertLink = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url || null);
        setUrl("");
      }
    });
  };

  return (
    <div className={styles.linkEditorContainer}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste link"
        className={styles.linkInput}
      />
      <button onClick={insertLink} className={styles.linkButton}>
        Add Link
      </button>
    </div>
  );
}

export default function LexicalEditor({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical Error:", error);
    },
    editorState: null,
    nodes: [LinkNode, ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editorInput} />}
          placeholder={
            <div className={styles.editorPlaceholder}>
              Enter your blog content...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <LinkEditor />
        <OnChangeHandler onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}
