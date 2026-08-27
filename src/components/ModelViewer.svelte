<script>
	import { onMount } from "svelte";
	import WonderModelViewer from "wonder-model-viewer";
	import "wonder-model-viewer/styles.css";

	export let modelData;

	let container;
	let modelViewer;
	let loading = true;

	onMount(() => {
		if (!container || !modelData?.model?.src) {
			loading = false;
			return;
		}

		loading = true;

		const environmentPath = modelData.sceneConfig?.environment?.src;
		const environmentType = /\.exr(?:[?#]|$)/i.test(
			environmentPath ?? "",
		)
			? "exr"
			: "hdr";

		const sources = environmentPath
			? [
					{
						name: "environmentMapHDR",
						type: environmentType,
						path: environmentPath,
					},
				]
			: [];

		modelViewer = new WonderModelViewer(container, {
			sources,
			loadingScreen: false,
		});

		const unsubscribeLoaded = modelViewer.on(
			"model:loaded",
			({ id }) => {
				console.log(`Model "${id}" loaded`);
				loading = false;
			},
		);

		const unsubscribeError = modelViewer.on(
			"model:error",
			({ message }) => {
				console.error(message);
				loading = false;
			},
		);

		const unsubscribeReady = modelViewer.on("viewer:ready", () => {
			modelViewer
				.loadModel({
					id: modelData.model.id ?? "main",
					source: modelData.model.src,

					animations:
						modelData.model.animations ?? true,

					autoplayAnimation:
						modelData.model.autoplayAnimation ?? true,

					animationUI:
						modelData.model.animationUI ??
						modelData.sceneConfig?.modelAnimationsUI ??
						false,

					modelInformations:
						modelData.informations ??
						modelData.sceneConfig?.modelInformations ??
						false,

					annotations: modelData.annotations,

					annotationOptions: {
						occlusion: true,
						occlusionChecksPerFrame: 1,
					},
				})
				.catch(() => {
					loading = false;
				});
		});

		return () => {
			unsubscribeReady();
			unsubscribeLoaded();
			unsubscribeError();

			modelViewer.destroy();
			modelViewer = undefined;
		};
	});
</script>

<div class="model-viewer-wrapper">
	<div class="loading-overlay" class:hidden={!loading}>
		<p>Chargement du modèle...</p>
	</div>

	<div class="model-viewer" bind:this={container}></div>
</div>

<style>
  .model-viewer-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
    min-height: 500px;
  }
  .model-viewer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-light);
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-dark);
    z-index: 2;
  }

  .loading-overlay p {
    color: var(--color-dark);
  }

  .hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
</style>
