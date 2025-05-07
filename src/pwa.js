import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
        onNeedRefresh() {
          if (confirm("Une nouvelle version est disponible. Recharger ?")) {
            updateSW(true)
          }
        },
        onOfflineReady() {
          console.log("L'application est prête à être utilisée hors-ligne.")
        },
      })