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
import type { EditorState } from "lexical";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { $getSelection, $isRangeSelection, $getRoot } from "lexical";

import { TOGGLE_LINK_COMMAND } from "@lexical/link";

import {
  useImperativeHandle,
  forwardRef,
  type ForwardedRef,
  useState,
  useEffect,
} from "react";
import styles from "./editor.module.css";

// ✅ Type for parent methods
export interface LexicalEditorHandle {
  clearEditor: () => void;
}

const theme = {
  paragraph: styles.paragraph,
};

function InnerEditor({
  onChange,
  initialContent,
  forwardedRef,
}: {
  onChange: (html: string) => void;
  initialContent?: string;
  forwardedRef: ForwardedRef<LexicalEditorHandle>;
}) {
  const [editor] = useLexicalComposerContext();

  // Load initial HTML content on mount
  useEffect(() => {
    if (initialContent) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialContent, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot()
          .clear()
          .append(...nodes);
      });
    }
  }, [initialContent, editor]);

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
        onChange={(editorState: EditorState) => {
          editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(html);
          });
        }}
      />
    </div>
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
      <button type="button" onClick={insertLink} className={styles.linkButton}>
        Add Link
      </button>
    </div>
  );
}

const LexicalEditor = forwardRef(function LexicalEditor(
  {
    onChange,
    initialContent,
  }: { onChange: (value: string) => void; initialContent?: string },
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
      <InnerEditor
        onChange={onChange}
        initialContent={initialContent}
        forwardedRef={ref}
      />
    </LexicalComposer>
  );
});

export default LexicalEditor;
