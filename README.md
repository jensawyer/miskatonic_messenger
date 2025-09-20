# 🏫 The Miskatonic Messenger

A React + Vite conduit for consulting the **Eldritch Oracle**. This is a whispering interface wrought in Strict TypeScript, woven 
with TailwindCSS, and bound by the iron chains of pinned dependencies.

> “Ph’nglui mglw’nafh code R’lyeh wgah’nagl Vite fhtagn.”

---

## 🔮 Prerequisites
Before invoking the Messenger, be certain:
- You have successfully completed the [Eldritch Oracle setup](https://github.com/jensawyer/eldritch-oracle) and the agent is currently running.
- You possess Node.js 18.18+ (the LTS path is less perilous).
- You wield npm 9+.
- Most importantly: you hold **no fear of the madness** which may seep through the interface.

---

## ☣️ Quickstart Ritual
1. Copy `.env.example` to `.env.development` and inscribe the proper values. The default location for the Eldritch Oracle is `http://localhost:8000`.
2. Summon dependencies:
   ```sh
   make install
3. Start the dev server:
   ```sh
   make dev
4. Visit [localhost:5173](http://localhost:5173/) in your browser.

## 🧐 Note
Since the Eldritch Oracle is typically running with Ollama using the OpenAPI compatible interface, I didn't bother to implement 
 sending context. The default artificial context limit on Ollama is too small (even much less than most models support) and since I'm
  using the OpenAI compatible interface, it isn't so easy to override the default. We'll just keep it small for now since this is
 just a fun portfolio project. If it asks you a question, know that it has no idea it did when you reply.