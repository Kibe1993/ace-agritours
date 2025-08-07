"use client";

import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { $getSelection, $isRangeSelection, $getRoot } from "lexical";

import { TOGGLE_LINK_COMMAND } from "@lexical/link";

import {
  useImperativeHandle,
  forwardRef,
  type ForwardedRef,
  useState,
} from "react";
import styles from "./editor.module.css";

// ✅ Define the type of methods the parent can call
export interface LexicalEditorHandle {
  clearEditor: () => void;
}

const theme = {
  paragraph: styles.paragraph,
};

// ✅ Subcomponent inside LexicalComposer
function InnerEditor({
  onChange,
  forwardedRef,
}: {
  onChange: (html: string) => void;
  forwardedRef: ForwardedRef<LexicalEditorHandle>;
}) {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(forwardedRef, () => ({
    clearEditor() {
      editor.update(() => {
        $getRoot().clear();
      });
    },
  }));

  return (
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
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(html);
          });
        }}
      />
    </div>
  );
}

// ✅ Link toolbar inside editor
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

// ✅ Parent Component with LexicalComposer at the top
const LexicalEditor = forwardRef(function LexicalEditor(
  { onChange }: { onChange: (value: string) => void },
  ref: ForwardedRef<LexicalEditorHandle>
) {
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
      <InnerEditor onChange={onChange} forwardedRef={ref} />
    </LexicalComposer>
  );
});

export default LexicalEditor;
