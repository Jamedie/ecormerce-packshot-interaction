import { mount } from "svelte";
import Hello from "./components/Hello.svelte"; // Import du composant

mount(Hello, {
  target: document.getElementById("app"), // Cible de montage
  props: { message: "Welcome to Svelte 5!" }, // Propriétés passées au composant
});
